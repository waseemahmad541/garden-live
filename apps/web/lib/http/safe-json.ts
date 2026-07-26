export async function readJsonResponse<T extends Record<string, unknown>>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text.trim()) return {} as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    return {
      error: response.ok ? "Unexpected server response." : "Server returned an invalid response."
    } as unknown as T;
  }
}
