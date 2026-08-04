import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";
import { normalizeEmail, normalizePhone } from "@/lib/auth/validators";
import { enforceCsrf } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";

const profileSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().min(8).max(20).optional(),
  preferredLanguage: z.string().trim().min(2).max(20).optional(),
  address: z
    .object({
      line1: z.string().trim().min(3).max(180),
      line2: z.string().trim().max(180).optional(),
      city: z.string().trim().min(2).max(80),
      state: z.string().trim().min(2).max(80),
      pincode: z.string().trim().min(4).max(12),
      country: z.string().trim().min(2).max(80).optional()
    })
    .optional()
});

async function loadCustomer(userId: string) {
  const customer = await prisma.customer.findUnique({
    where: { userId },
    include: {
      user: {
        include: {
          addresses: {
            where: { deletedAt: null },
            orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
            take: 5
          }
        }
      },
      activeMemberships: {
        where: { deletedAt: null },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
        take: 3
      },
      gardens: {
        where: { deletedAt: null },
        include: {
          address: true,
          plants: { where: { deletedAt: null }, take: 20 },
          visits: { where: { deletedAt: null }, orderBy: { scheduledAt: "desc" }, take: 10 },
          serviceRequests: { where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 10 }
        },
        orderBy: { updatedAt: "desc" }
      }
    }
  });

  if (!customer) throw new ApiError(404, "Customer profile was not found.", "CUSTOMER_NOT_FOUND");
  return customer;
}

export async function GET() {
  try {
    const session = await requireApiSession();
    requireRoles(session, ["CUSTOMER", "ADMIN"]);
    return apiResponse(await loadCustomer(session.userId));
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    enforceRateLimit(request, "customer-profile", 20, 60_000);
    enforceCsrf(request);

    const session = await requireApiSession();
    requireRoles(session, ["CUSTOMER", "ADMIN"]);

    const input = profileSchema.parse(await request.json().catch(() => ({})));
    const customer = await loadCustomer(session.userId);
    const email = input.email ? normalizeEmail(input.email) : undefined;
    const phone = input.phone ? normalizePhone(input.phone) : undefined;

    if (input.email && !email) throw new ApiError(422, "A valid email is required.", "INVALID_EMAIL");
    if (input.phone && !phone) throw new ApiError(422, "A valid phone number is required.", "INVALID_PHONE");

    const updated = await prisma.$transaction(async (tx) => {
      if (input.address) {
        await tx.address.upsert({
          where: { id: customer.user.addresses[0]?.id ?? "00000000-0000-0000-0000-000000000000" },
          update: {
            ...input.address,
            country: input.address.country ?? "India",
            isDefault: true
          },
          create: {
            userId: session.userId,
            type: "HOME",
            name: `${input.name ?? customer.user.name} Home`,
            phone: phone ?? customer.user.phone,
            ...input.address,
            country: input.address.country ?? "India",
            isDefault: true
          }
        });
      }

      await tx.customer.update({
        where: { id: customer.id },
        data: { preferredLanguage: input.preferredLanguage }
      });

      return tx.user.update({
        where: { id: session.userId },
        data: {
          ...(input.name ? { name: input.name } : {}),
          ...(email && email !== customer.user.email ? { email, emailVerifiedAt: null } : {}),
          ...(phone && phone !== customer.user.phone ? { phone, phoneVerifiedAt: null } : {})
        },
        include: {
          customer: true,
          addresses: {
            where: { deletedAt: null },
            orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
            take: 5
          }
        }
      });
    });

    return apiResponse(updated);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ ok: false, error: { code: "PROFILE_UPDATE_FAILED", message: "Could not update profile." } }, { status: 400 });
    }
    return apiError(error);
  }
}
