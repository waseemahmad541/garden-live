import type { DefaultSession } from "next-auth";
import type { RoleName } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    roles?: RoleName[];
  }

  interface Session {
    user: {
      id: string;
      roles: RoleName[];
      primaryRole: RoleName;
      homePath: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: RoleName[];
    primaryRole?: RoleName;
    homePath?: string;
  }
}
