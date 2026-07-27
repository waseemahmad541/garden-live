import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/crypto";
import { assignRole, createCustomerProfileIfNeeded, getUserRoles, loadAuthUserById } from "@/lib/auth/users";
import { getPrimaryRole, roleHome } from "@/lib/auth/permissions";
import { normalizeEmail, normalizeOtp, normalizePhone } from "@/lib/auth/validators";
import { normalizeAuthEnvironment } from "@/lib/env/urls";

normalizeAuthEnvironment();

const authProviders: NextAuthConfig["providers"] = [
  Credentials({
    id: "email-password",
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const email = normalizeEmail(credentials?.email);
      const password = String(credentials?.password ?? "");

      if (!email || !password) return null;

      const user = await prisma.user.findFirst({
        where: {
          email,
          deletedAt: null,
          status: "ACTIVE"
        }
      });

      if (!user?.passwordHash) return null;

      const validPassword = await compare(password, user.passwordHash);
      if (!validPassword) return null;

      const roles = await getUserRoles(user.id);

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.avatarUrl,
        roles
      };
    }
  }),
  Credentials({
    id: "phone-otp",
    name: "Phone OTP",
    credentials: {
      phone: { label: "Phone", type: "text" },
      code: { label: "OTP", type: "text" }
    },
    async authorize(credentials) {
      const phone = normalizePhone(credentials?.phone);
      const code = normalizeOtp(credentials?.code);

      if (!phone || !code) return null;

      const otp = await prisma.authOtpCode.findFirst({
        where: {
          phone,
          purpose: "LOGIN",
          consumedAt: null,
          deletedAt: null,
          expiresAt: {
            gt: new Date()
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      if (!otp || otp.attempts >= otp.maxAttempts) return null;

      const isValid = otp.codeHash === hashToken(code);

      if (!isValid) {
        await prisma.authOtpCode.update({
          where: { id: otp.id },
          data: { attempts: { increment: 1 } }
        });
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { phone }
      });

      if (!user || user.status !== "ACTIVE" || user.deletedAt) return null;

      await prisma.$transaction([
        prisma.authOtpCode.update({
          where: { id: otp.id },
          data: { consumedAt: new Date() }
        }),
        prisma.user.update({
          where: { id: user.id },
          data: {
            phoneVerifiedAt: user.phoneVerifiedAt ?? new Date(),
            lastLoginAt: new Date()
          }
        })
      ]);

      const roles = await getUserRoles(user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.avatarUrl,
        roles
      };
    }
  })
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  authProviders.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false
    })
  );
}

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30
  },
  pages: {
    signIn: "/login"
  },
  providers: authProviders,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      const email = user.email?.toLowerCase() ?? profile?.email?.toString().toLowerCase();
      if (!email) return false;

      const dbUser = await prisma.user.upsert({
        where: { email },
        update: {
          name: user.name ?? profile?.name?.toString() ?? "Garden Live User",
          avatarUrl: user.image ?? null,
          emailVerifiedAt: new Date(),
          status: "ACTIVE",
          lastLoginAt: new Date()
        },
        create: {
          name: user.name ?? profile?.name?.toString() ?? "Garden Live User",
          email,
          phone: `google:${email}`,
          avatarUrl: user.image ?? null,
          emailVerifiedAt: new Date(),
          status: "ACTIVE",
          lastLoginAt: new Date()
        }
      });

      await assignRole(dbUser.id, "CUSTOMER");
      await createCustomerProfileIfNeeded(dbUser);
      user.id = dbUser.id;

      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      if (token.sub) {
        const dbUser = await loadAuthUserById(token.sub);
        if (dbUser) {
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.avatarUrl;
          token.roles = dbUser.roleNames;
          token.primaryRole = getPrimaryRole(dbUser.roleNames);
          token.homePath = roleHome[getPrimaryRole(dbUser.roleNames)];
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.roles = Array.isArray(token.roles) ? token.roles : [];
        session.user.primaryRole = typeof token.primaryRole === "string" ? token.primaryRole : "CUSTOMER";
        session.user.homePath = typeof token.homePath === "string" ? token.homePath : "/customer/dashboard";
      }

      return session;
    },
    authorized({ auth }) {
      return Boolean(auth?.user);
    }
  }
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
