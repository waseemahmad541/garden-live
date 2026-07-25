export type ModuleResourceResult = {
  items: Array<Record<string, unknown>>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ApiEnvelope<T> = {
  ok: boolean;
  data?: T;
  error?: {
    message: string;
  };
};

async function request<T>(path: string, init?: RequestInit) {
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(path, {
    ...init,
    headers: isFormData
      ? init?.headers
      : {
          "Content-Type": "application/json",
          ...(init?.headers ?? {})
        }
  });
  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error?.message ?? "Module request failed.");
  }

  return payload.data as T;
}

export function listResource(resource: string, params: URLSearchParams) {
  const query = params.toString();
  return request<ModuleResourceResult>(`/api/${resource}${query ? `?${query}` : ""}`);
}

export function createResource(resource: string, data: Record<string, unknown>) {
  return request<Record<string, unknown>>(`/api/${resource}`, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export function updateResource(resource: string, id: string, data: Record<string, unknown>) {
  return request<Record<string, unknown>>(`/api/${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

export function deleteResource(resource: string, id: string) {
  return request<Record<string, unknown>>(`/api/${resource}/${id}`, {
    method: "DELETE"
  });
}

export type ModuleReport = {
  module: string;
  summary: {
    resources: number;
    totalRecords: number;
    generatedAt: string;
  };
  resources: Array<{
    resource: string;
    model: string;
    total: number;
  }>;
  notifications: Array<{
    status: string;
    count: number;
  }>;
  recentActivity: Array<Record<string, unknown>>;
};

export function getModuleReport(moduleKey: string) {
  return request<ModuleReport>(`/api/reports?module=${encodeURIComponent(moduleKey)}`);
}

export function uploadMedia(formData: FormData) {
  return request<Record<string, unknown>>("/api/uploads/media", {
    method: "POST",
    body: formData,
    headers: {}
  });
}

export function uploadDocument(formData: FormData) {
  return request<Record<string, unknown>>("/api/uploads/documents", {
    method: "POST",
    body: formData,
    headers: {}
  });
}
