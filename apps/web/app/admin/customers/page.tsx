import type { Metadata } from "next";
import { AdminPanel, AdminSearch, AdminSectionHeader, AdminShell, AdminTable, StatusPill } from "@/components/admin/admin-ui";
import { CustomerStatusActions } from "@/components/admin/customer-status-actions";
import { requireAdminPage } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";
import { getCustomers, type AdminSearchParams } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Management | Garden Live Admin",
  robots: { index: false, follow: false }
};

export default async function AdminCustomersPage({ searchParams }: { searchParams?: AdminSearchParams }) {
  const [admin, data] = await Promise.all([requireAdminPage(), getCustomers(searchParams)]);

  return (
    <AdminShell active="/admin/customers" title="Customer Management" description="Search, review, and operate customer profiles, memberships, gardens, and visit history from live PostgreSQL records." userLabel={admin.name}>
      <AdminPanel>
        <AdminSectionHeader eyebrow={`${data.total.toLocaleString("en-IN")} customers`} title="Customer records" description="Every row is loaded from the Customer, User, Garden, Membership, and ServiceRequest tables." />
        <AdminSearch placeholder="Search customer name, email, or phone" defaultValue={searchParams?.q} />
        <AdminTable
          columns={["Customer", "Email", "Phone", "Status", "Gardens", "Current Plan", "Last Request", "Created", "Actions"]}
          rows={data.rows.map((customer) => ({
            Customer: customer.user.name,
            Email: customer.user.email ?? "Not set",
            Phone: customer.user.phone,
            Status: <StatusPill>{customer.user.status}</StatusPill>,
            Gardens: customer.gardens.length,
            "Current Plan": customer.activeMemberships[0]?.plan.name ?? "No active plan",
            "Last Request": customer.serviceRequests[0]?.status ?? "No requests",
            Created: formatDate(customer.createdAt),
            Actions: <CustomerStatusActions customerId={customer.id} status={customer.user.status} />
          }))}
        />
      </AdminPanel>
    </AdminShell>
  );
}
