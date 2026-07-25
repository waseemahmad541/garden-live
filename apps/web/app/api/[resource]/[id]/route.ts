import type { NextRequest } from "next/server";
import { ApiError, apiError } from "@/lib/api/errors";
import { createItemHandlers } from "@/lib/api/crud";
import { getResourceConfig } from "@/lib/api/resources";

export const dynamic = "force-dynamic";

function handlersFor(resource: string) {
  const config = getResourceConfig(resource);
  if (!config) throw new ApiError(404, `Unknown API resource '${resource}'.`, "UNKNOWN_RESOURCE");
  return createItemHandlers(config);
}

export async function GET(request: NextRequest, context: { params: { resource: string; id: string } }) {
  try {
    return handlersFor(context.params.resource).GET(request, context);
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest, context: { params: { resource: string; id: string } }) {
  try {
    return handlersFor(context.params.resource).PATCH(request, context);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: { params: { resource: string; id: string } }) {
  try {
    return handlersFor(context.params.resource).DELETE(request, context);
  } catch (error) {
    return apiError(error);
  }
}
