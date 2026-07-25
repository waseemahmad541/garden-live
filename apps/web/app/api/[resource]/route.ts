import type { NextRequest } from "next/server";
import { ApiError, apiError } from "@/lib/api/errors";
import { createCollectionHandlers } from "@/lib/api/crud";
import { getResourceConfig } from "@/lib/api/resources";

export const dynamic = "force-dynamic";

function handlersFor(resource: string) {
  const config = getResourceConfig(resource);
  if (!config) throw new ApiError(404, `Unknown API resource '${resource}'.`, "UNKNOWN_RESOURCE");
  return createCollectionHandlers(config);
}

export async function GET(request: NextRequest, context: { params: { resource: string } }) {
  try {
    return handlersFor(context.params.resource).GET(request);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest, context: { params: { resource: string } }) {
  try {
    return handlersFor(context.params.resource).POST(request);
  } catch (error) {
    return apiError(error);
  }
}
