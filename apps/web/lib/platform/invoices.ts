export type InvoiceLine = {
  name: string;
  sku?: string | null;
  quantity: number;
  unitPrice: number;
  gstRate?: number | null;
  totalPrice: number;
};

export function invoiceNumber(prefix = "GL-GST") {
  return `${prefix}-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Date.now().toString(36).toUpperCase()}`;
}

export function createInvoiceHtml(input: {
  invoiceNo: string;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  billingAddress: string;
  orderNumber: string;
  subtotal: number;
  gstAmount: number;
  deliveryFee: number;
  totalAmount: number;
  lines: InvoiceLine[];
}) {
  const rows = input.lines
    .map(
      (line) => `
        <tr>
          <td>${line.name}${line.sku ? `<br/><small>${line.sku}</small>` : ""}</td>
          <td>${line.quantity}</td>
          <td>Rs. ${line.unitPrice.toFixed(2)}</td>
          <td>${Number(line.gstRate ?? 18).toFixed(2)}%</td>
          <td>Rs. ${line.totalPrice.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${input.invoiceNo}</title>
      <style>
        body { font-family: Inter, Arial, sans-serif; color: #111713; margin: 40px; }
        header { display: flex; justify-content: space-between; gap: 24px; border-bottom: 1px solid #dfe7dc; padding-bottom: 24px; }
        h1 { margin: 0; font-size: 28px; }
        table { width: 100%; border-collapse: collapse; margin-top: 32px; }
        th, td { border-bottom: 1px solid #dfe7dc; padding: 12px; text-align: left; vertical-align: top; }
        th { background: #f7f8f6; font-size: 12px; text-transform: uppercase; }
        .total { margin-top: 24px; margin-left: auto; width: 320px; }
        .line { display: flex; justify-content: space-between; padding: 8px 0; }
        .grand { font-weight: 700; font-size: 18px; border-top: 1px solid #dfe7dc; margin-top: 8px; padding-top: 12px; }
      </style>
    </head>
    <body>
      <header>
        <div>
          <h1>Garden Live GST Invoice</h1>
          <p>India's First AI Powered Digital Garden Membership Platform</p>
        </div>
        <div>
          <strong>${input.invoiceNo}</strong><br/>
          Order: ${input.orderNumber}<br/>
          Date: ${new Date().toLocaleDateString("en-IN")}
        </div>
      </header>
      <section>
        <h2>Bill To</h2>
        <p><strong>${input.customerName}</strong><br/>${input.customerEmail ?? ""}<br/>${input.customerPhone ?? ""}<br/>${input.billingAddress}</p>
      </section>
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>GST</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="total">
        <div class="line"><span>Subtotal</span><span>Rs. ${input.subtotal.toFixed(2)}</span></div>
        <div class="line"><span>GST</span><span>Rs. ${input.gstAmount.toFixed(2)}</span></div>
        <div class="line"><span>Delivery</span><span>Rs. ${input.deliveryFee.toFixed(2)}</span></div>
        <div class="line grand"><span>Total</span><span>Rs. ${input.totalAmount.toFixed(2)}</span></div>
      </div>
    </body>
  </html>`;
}
