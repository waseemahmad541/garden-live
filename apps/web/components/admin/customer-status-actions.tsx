"use client";

import * as React from "react";
import type { UserStatus } from "@prisma/client";

const nextStatus: Record<UserStatus, UserStatus> = {
  ACTIVE: "INACTIVE",
  INACTIVE: "ACTIVE",
  SUSPENDED: "ACTIVE",
  DELETED: "ACTIVE"
};

export function CustomerStatusActions({ customerId, status }: { customerId: string; status: UserStatus }) {
  const [currentStatus, setCurrentStatus] = React.useState(status);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const target = nextStatus[currentStatus];

  async function updateStatus() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/customers/${customerId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: target })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error?.message ?? "Could not update customer.");
      }
      setCurrentStatus(target);
      setMessage(`Set to ${target}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update customer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={updateStatus}
        disabled={loading}
        className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50 transition hover:bg-lime-300 hover:text-[#06120C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Updating..." : target === "ACTIVE" ? "Activate" : "Deactivate"}
      </button>
      {message ? <span className="text-[11px] text-emerald-50/60">{message}</span> : null}
    </div>
  );
}
