"use client";

import * as React from "react";
import {
  AlertCircle,
  ArrowDownUp,
  BarChart3,
  CheckCircle2,
  Database,
  Download,
  Filter,
  Loader2,
  Plus,
  RefreshCcw,
  Search,
  Upload,
  Trash2
} from "lucide-react";
import { Badge, Button, Input, Modal, Select, Textarea, ToastProvider, useToast } from "@/components";
import * as moduleApi from "@/lib/module-client/api";

export type ModuleResourceConfig = {
  label: string;
  resource: string;
  searchPlaceholder: string;
  filters?: string[];
  columns: string[];
  createTemplate: Record<string, unknown>;
};

export type GardenLiveModuleConfig = {
  title: string;
  eyebrow: string;
  description: string;
  primaryResource: string;
  resources: ModuleResourceConfig[];
  workflows: Array<{
    title: string;
    detail: string;
    status: string;
  }>;
};

function valueLabel(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") {
    if ("name" in value && typeof value.name === "string") return value.name;
    if ("title" in value && typeof value.title === "string") return value.title;
    return JSON.stringify(value).slice(0, 60);
  }
  return String(value);
}

function ModuleShell({ config }: { config: GardenLiveModuleConfig }) {
  const { showToast } = useToast();
  const [active, setActive] = React.useState(config.primaryResource);
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [items, setItems] = React.useState<Array<Record<string, unknown>>>([]);
  const [pagination, setPagination] = React.useState<moduleApi.ModuleResourceResult["pagination"] | null>(null);
  const [draft, setDraft] = React.useState("{}");
  const [formDraft, setFormDraft] = React.useState<Record<string, unknown>>({});
  const [deleteTarget, setDeleteTarget] = React.useState<Record<string, unknown> | null>(null);
  const [report, setReport] = React.useState<moduleApi.ModuleReport | null>(null);
  const [mediaFile, setMediaFile] = React.useState<File | null>(null);
  const [documentFile, setDocumentFile] = React.useState<File | null>(null);

  const resource = config.resources.find((item) => item.resource === active) ?? config.resources[0];

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "10");
      params.set("sortBy", sortBy);
      if (query.trim()) params.set("search", query.trim());
      const data = await moduleApi.listResource(resource.resource, params);
      setItems(data.items);
      setPagination(data.pagination);
      setDraft(JSON.stringify(resource.createTemplate, null, 2));
      setFormDraft(resource.createTemplate);
      const moduleReport = await moduleApi.getModuleReport(moduleReportKey(config.title));
      setReport(moduleReport);
    } catch (error) {
      setItems([]);
      setPagination(null);
      showToast({ tone: "error", title: "Module data failed to load", description: error instanceof Error ? error.message : "Check API permissions." });
    } finally {
      setLoading(false);
    }
  }, [config.title, page, query, resource.createTemplate, resource.resource, showToast, sortBy]);

  React.useEffect(() => {
    load();
  }, [load]);

  async function action(title: string, fn: () => Promise<unknown>) {
    setSaving(true);
    try {
      await fn();
      showToast({ tone: "success", title });
      await load();
    } catch (error) {
      showToast({ tone: "error", title: "Action failed", description: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setSaving(false);
    }
  }

  function updateFormField(field: string, value: string) {
    setFormDraft((current) => ({
      ...current,
      [field]: coerceFormValue(current[field], value)
    }));
  }

  async function uploadAttachment(kind: "media" | "document") {
    const file = kind === "media" ? mediaFile : documentFile;
    if (!file) {
      showToast({ tone: "error", title: "Choose a file first" });
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    if (kind === "document") {
      formData.set("name", file.name);
      formData.set("type", "OTHER");
    } else {
      formData.set("type", file.type.startsWith("video") ? "VIDEO" : "IMAGE");
      const targetId = items.find((item) => typeof item.id === "string")?.id;
      if (targetId && resource.resource === "products") formData.set("productId", String(targetId));
      if (targetId && resource.resource === "gardens") formData.set("gardenId", String(targetId));
      if (targetId && resource.resource === "plants") formData.set("plantId", String(targetId));
    }

    await action(kind === "media" ? "Media uploaded" : "Document uploaded", () =>
      kind === "media" ? moduleApi.uploadMedia(formData) : moduleApi.uploadDocument(formData)
    );
    if (kind === "media") setMediaFile(null);
    else setDocumentFile(null);
  }

  return (
    <main className="min-h-screen bg-neutral-cloud text-botanical-black">
      <section className="border-b border-[#E3E8E2] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <Badge tone="premium">{config.eyebrow}</Badge>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[0] sm:text-4xl">{config.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-slate">{config.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
              <Button leftIcon={<RefreshCcw className="h-4 w-4" />} isLoading={loading} onClick={load}>Refresh</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Records" value={String(pagination?.total ?? items.length)} detail={resource.label} />
          <Metric label="Active Resource" value={resource.label} detail={`/${resource.resource}`} />
          <Metric label="Page" value={String(pagination?.page ?? page)} detail={`${pagination?.totalPages ?? 1} total pages`} />
          <Metric label="Workflows" value={String(config.workflows.length)} detail="Operational lanes" />
        </div>

        <section className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {config.resources.map((item) => (
              <button
                key={item.resource}
                className={`shrink-0 rounded-gl px-3 py-2 text-sm font-semibold ${active === item.resource ? "bg-botanical-green text-white" : "bg-neutral-cloud text-neutral-slate hover:bg-neutral-mist"}`}
                onClick={() => {
                  setActive(item.resource);
                  setPage(1);
                  setQuery("");
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_180px_auto_auto]">
            <Input value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} placeholder={resource.searchPlaceholder} leftIcon={<Search className="h-4 w-4" />} />
            <Select value={sortBy} onChange={(event) => setSortBy(event.target.value)} options={["createdAt", "updatedAt", "name", "title", "status"].map((item) => ({ label: item, value: item }))} />
            <Button variant="secondary" leftIcon={<Filter className="h-4 w-4" />} onClick={load}>Apply</Button>
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => action("Record created", () => moduleApi.createResource(resource.resource, formDraft))}>Create</Button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <section className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{resource.label}</h2>
              <Badge tone="info">{loading ? "Loading" : `${items.length} visible`}</Badge>
            </div>

            {loading ? <SkeletonTable /> : <ResourceTable resource={resource} items={items} onDelete={setDeleteTarget} />}

            {pagination ? (
              <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-slate sm:flex-row sm:items-center sm:justify-between">
                <p>Page {pagination.page} of {Math.max(pagination.totalPages, 1)}</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled={pagination.page <= 1} onClick={() => setPage(pagination.page - 1)}>Previous</Button>
                  <Button variant="secondary" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => setPage(pagination.page + 1)}>Next</Button>
                </div>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <section className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
              <h2 className="text-lg font-semibold">Create {resource.label}</h2>
              <div className="mt-4 space-y-3">
                {Object.entries(formDraft).map(([field, value]) => (
                  <label key={field} className="block">
                    <span className="text-xs font-semibold uppercase text-neutral-slate">{field}</span>
                    {typeof value === "object" && value !== null ? (
                      <Textarea
                        className="mt-1 min-h-20 font-mono text-xs"
                        value={JSON.stringify(value, null, 2)}
                        onChange={(event) => updateFormField(field, event.target.value)}
                      />
                    ) : (
                      <Input className="mt-1" value={valueLabel(value) === "-" ? "" : valueLabel(value)} onChange={(event) => updateFormField(field, event.target.value)} />
                    )}
                  </label>
                ))}
              </div>
              <Button className="mt-4 w-full" isLoading={saving} leftIcon={<Database className="h-4 w-4" />} onClick={() => action("Record created", () => moduleApi.createResource(resource.resource, formDraft))}>Create Record</Button>
              <details className="mt-4 rounded-gl border border-[#E3E8E2] bg-neutral-cloud p-3">
                <summary className="cursor-pointer text-sm font-semibold">Advanced JSON</summary>
                <Textarea className="mt-3 min-h-44 font-mono text-xs" value={draft} onChange={(event) => setDraft(event.target.value)} />
                <Button className="mt-3 w-full" variant="secondary" isLoading={saving} onClick={() => action("Record created", () => moduleApi.createResource(resource.resource, JSON.parse(draft)))}>Create from JSON</Button>
              </details>
            </section>

            <section className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
              <h2 className="text-lg font-semibold">Uploads</h2>
              <div className="mt-4 space-y-4">
                <UploadBox label="Image / Video" file={mediaFile} accept="image/*,video/*" onChange={setMediaFile} onUpload={() => uploadAttachment("media")} saving={saving} />
                <UploadBox label="Document / Report" file={documentFile} accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*" onChange={setDocumentFile} onUpload={() => uploadAttachment("document")} saving={saving} />
              </div>
            </section>

            <section className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
              <h2 className="text-lg font-semibold">Reports</h2>
              {report ? (
                <div className="mt-4 space-y-3">
                  <div className="rounded-gl bg-botanical-mint p-3">
                    <p className="text-sm text-neutral-slate">Module records</p>
                    <p className="mt-1 text-2xl font-semibold">{report.summary.totalRecords}</p>
                  </div>
                  {report.resources.map((item) => (
                    <div key={item.resource} className="flex items-center justify-between rounded-gl border border-[#E3E8E2] p-3 text-sm">
                      <span>{item.resource}</span>
                      <Badge tone="info">{item.total}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-2 text-sm text-neutral-slate">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Preparing report
                </div>
              )}
            </section>

            <section className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
              <h2 className="text-lg font-semibold">Workflows</h2>
              <div className="mt-4 space-y-3">
                {config.workflows.map((workflow) => (
                  <div key={workflow.title} className="rounded-gl border border-[#E3E8E2] bg-neutral-cloud p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{workflow.title}</p>
                      <Badge tone={workflow.status === "Live" ? "success" : "warning"}>{workflow.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-neutral-slate">{workflow.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Modal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Record"
        description="This calls the existing API soft-delete flow."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button
              variant="destructive"
              isLoading={saving}
              onClick={() => {
                const id = typeof deleteTarget?.id === "string" ? deleteTarget.id : "";
                if (!id) return;
                action("Record deleted", () => moduleApi.deleteResource(resource.resource, id)).then(() => setDeleteTarget(null));
              }}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-sm text-neutral-slate">Delete this {resource.label} record?</p>
      </Modal>
    </main>
  );
}

function moduleReportKey(title: string) {
  const value = title.toLowerCase();
  if (value.includes("membership")) return "membership";
  if (value.includes("nursery")) return "nursery";
  if (value.includes("landscaping") || value.includes("corporate")) return "landscaping";
  if (value.includes("maintenance") || value.includes("dedicated")) return "maintenance";
  if (value.includes("gardener")) return "gardener";
  if (value.includes("supervisor")) return "supervisor";
  if (value.includes("ai") || value.includes("scanner")) return "ai";
  if (value.includes("passport") || value.includes("qr")) return "passport";
  if (value.includes("tender")) return "tender";
  return "customer";
}

function coerceFormValue(previous: unknown, next: string) {
  if (typeof previous === "number") return Number(next);
  if (typeof previous === "boolean") return next === "true";
  if (typeof previous === "object" && previous !== null) {
    try {
      return JSON.parse(next);
    } catch {
      return previous;
    }
  }
  return next;
}

function UploadBox({
  label,
  file,
  accept,
  onChange,
  onUpload,
  saving
}: {
  label: string;
  file: File | null;
  accept: string;
  onChange: (file: File | null) => void;
  onUpload: () => void;
  saving: boolean;
}) {
  return (
    <div className="rounded-gl border border-dashed border-[#C9D4C8] bg-neutral-cloud p-3">
      <p className="text-sm font-semibold">{label}</p>
      <input
        className="mt-3 w-full rounded-gl border border-[#E3E8E2] bg-white px-3 py-2 text-sm"
        type="file"
        accept={accept}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="truncate text-xs text-neutral-slate">{file?.name ?? "No file selected"}</p>
        <Button size="sm" variant="secondary" isLoading={saving} leftIcon={<Upload className="h-4 w-4" />} onClick={onUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-slate">{label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[0]">{value}</p>
          <p className="mt-2 text-sm text-neutral-slate">{detail}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-gl bg-botanical-mint text-botanical-green">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-gl bg-neutral-cloud" />
      ))}
    </div>
  );
}

function ResourceTable({ resource, items, onDelete }: { resource: ModuleResourceConfig; items: Array<Record<string, unknown>>; onDelete: (item: Record<string, unknown>) => void }) {
  if (!items.length) {
    return (
      <div className="grid min-h-48 place-items-center rounded-xl border border-dashed border-[#C9D4C8] bg-neutral-cloud p-8 text-center">
        <div>
          <AlertCircle className="mx-auto h-8 w-8 text-neutral-stone" />
          <p className="mt-3 font-semibold">No records found</p>
          <p className="mt-1 text-sm text-neutral-slate">Create a record or adjust your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E3E8E2]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-neutral-cloud">
            <tr>
              {resource.columns.map((column) => (
                <th key={column} className="px-4 py-3 text-xs font-semibold uppercase text-neutral-slate">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-neutral-slate">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E8E2] bg-white">
            {items.map((item, index) => (
              <tr key={String(item.id ?? index)}>
                {resource.columns.map((column) => {
                  const value = item[column] ?? item[column.toLowerCase()] ?? item[column.replace(/\s+/g, "")];
                  return (
                    <td key={column} className="px-4 py-4 text-sm text-neutral-slate">
                      {column.toLowerCase().includes("status") ? <Badge tone="info">{valueLabel(value)}</Badge> : valueLabel(value)}
                    </td>
                  );
                })}
                <td className="px-4 py-4 text-right">
                  <Button variant="ghost" size="icon" aria-label="Delete record" onClick={() => onDelete(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ModuleWorkspace({ config }: { config: GardenLiveModuleConfig }) {
  return (
    <ToastProvider>
      <ModuleShell config={config} />
    </ToastProvider>
  );
}
