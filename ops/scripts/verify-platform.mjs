import { spawn } from "node:child_process";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const pnpm = process.env.PNPM_BIN ?? "pnpm";

const pages = [
  "/",
  "/about",
  "/services",
  "/landscaping",
  "/plant-nursery",
  "/garden-maintenance",
  "/dedicated-gardener",
  "/membership-plans",
  "/ai-plant-doctor",
  "/plant-scanner",
  "/qr-plant-passport",
  "/garden-store",
  "/projects",
  "/projects-portfolio",
  "/gallery",
  "/testimonials",
  "/blog",
  "/contact",
  "/book-garden-visit",
  "/login",
  "/register",
  "/checkout"
];

const dashboardPages = {
  customer: ["/customer/dashboard"],
  admin: [
    "/admin/dashboard",
    "/admin/product-catalog",
    "/admin/product-catalog/products",
    "/admin/product-catalog/products/add",
    "/admin/product-catalog/categories",
    "/admin/product-catalog/inventory",
    "/admin/product-catalog/approvals",
    "/admin/product-catalog/low-stock",
    "/admin/product-catalog/bulk-import",
    "/admin/product-catalog/bulk-images",
    "/admin/product-catalog/search",
    "/admin/product-catalog/compare"
  ]
};

const results = [];
let serverProcess;

function record(name, passed, details = "") {
  results.push({ name, passed, details });
  const status = passed ? "PASS" : "FAIL";
  console.log(`${status} ${name}${details ? ` - ${details}` : ""}`);
}

function cookieHeader(jar) {
  return [...jar.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
}

function storeCookies(jar, response) {
  const cookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")]
        : [];

  for (const rawCookie of cookies) {
    for (const part of rawCookie.split(/,(?=[^;,]+=)/)) {
      const [pair] = part.split(";");
      const index = pair.indexOf("=");
      if (index > 0) {
        jar.set(pair.slice(0, index).trim(), pair.slice(index + 1).trim());
      }
    }
  }
}

async function request(path, options = {}, jar = new Map()) {
  const headers = new Headers(options.headers ?? {});
  if (jar.size) headers.set("cookie", cookieHeader(jar));
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: "manual",
    ...options,
    headers
  });
  storeCookies(jar, response);
  return response;
}

async function jsonRequest(path, body, jar = new Map(), method = "POST") {
  return request(path, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  }, jar);
}

async function serverIsUp() {
  try {
    const response = await fetch(baseUrl, { redirect: "manual" });
    return response.status >= 200 && response.status < 500;
  } catch {
    return false;
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await serverIsUp()) return true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
}

async function ensureServer() {
  if (await serverIsUp()) return false;

  const command = `"${pnpm}" --filter @garden-live/web exec next start -p 3000`;
  serverProcess = spawn(command, {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PATH: `C:\\Users\\wasee\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin;${process.env.PATH ?? ""}`
    },
    stdio: "pipe",
    shell: true
  });

  serverProcess.stdout.on("data", (chunk) => process.stdout.write(chunk));
  serverProcess.stderr.on("data", (chunk) => process.stderr.write(chunk));

  const ready = await waitForServer();
  if (!ready) throw new Error("Next.js server did not become ready on localhost:3000.");
  return true;
}

async function login(email, password) {
  const jar = new Map();
  const csrfResponse = await request("/api/auth/csrf", {}, jar);
  const csrf = await csrfResponse.json();
  const form = new URLSearchParams({
    csrfToken: csrf.csrfToken,
    email,
    password,
    json: "true"
  });

  const response = await request("/api/auth/callback/email-password", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form
  }, jar);

  const sessionResponse = await request("/api/auth/session", {}, jar);
  const session = await sessionResponse.json();
  const ok = Boolean(session?.user?.email);
  return { ok, status: response.status, jar, session };
}

async function expectStatus(name, response, expected = [200]) {
  const text = await response.text().catch(() => "");
  const passed = expected.includes(response.status);
  record(name, passed, `status ${response.status}${passed ? "" : ` body ${text.slice(0, 180)}`}`);
  return passed;
}

async function run() {
  const startedServer = await ensureServer();
  record("Local production server", true, startedServer ? "started by verifier" : "already running");

  for (const page of pages) {
    await expectStatus(`Page ${page}`, await request(page), [200]);
  }

  const customerLogin = await login("customer@gardenlive.in", "GardenLive@123");
  record("Customer login", customerLogin.ok, customerLogin.session?.user?.email ?? `status ${customerLogin.status}`);

  const adminLogin = await login("admin@gardenlive.in", "GardenLive@123");
  record("Admin login", adminLogin.ok, adminLogin.session?.user?.email ?? `status ${adminLogin.status}`);

  for (const page of dashboardPages.customer) {
    await expectStatus(`Customer dashboard page ${page}`, await request(page, {}, customerLogin.jar), [200]);
  }

  for (const page of dashboardPages.admin) {
    await expectStatus(`Admin dashboard page ${page}`, await request(page, {}, adminLogin.jar), [200]);
  }

  await expectStatus("Customer dashboard API", await request("/api/customer/dashboard", {}, customerLogin.jar), [200]);
  await expectStatus("Admin dashboard API", await request("/api/admin/dashboard/live", {}, adminLogin.jar), [200]);

  const categoryResponse = await request("/api/product-catalog/categories", {}, adminLogin.jar);
  const categoryPayload = await categoryResponse.json();
  const category = categoryPayload?.data?.items?.[0] ?? categoryPayload?.data?.[0] ?? categoryPayload?.items?.[0];
  record("Product categories API", categoryResponse.status === 200 && Boolean(category?.id), `status ${categoryResponse.status}`);

  const sku = `GL-VERIFY-${Date.now()}`;
  const createResponse = await jsonRequest("/api/product-catalog/products", {
    productName: "Garden Live Verification Areca Palm",
    sku,
    categoryId: category?.id,
    brand: "Garden Live",
    description: "Production verification plant product for CRUD testing.",
    price: 1299,
    discountPrice: 999,
    gst: 18,
    stockQuantity: 18,
    plantHeight: "3 ft",
    potSize: "10 inch",
    plantAge: "18 months",
    sunlightRequirement: "Bright indirect sunlight",
    waterRequirement: "Water twice weekly",
    soilRequirement: "Well-drained garden soil",
    fertilizerSchedule: "Monthly organic fertilizer",
    maintenanceLevel: "LOW",
    indoorOutdoor: "INDOOR",
    airPurifying: true,
    tags: ["verification", "indoor"],
    status: "ACTIVE",
    featuredProduct: true,
    bestseller: false,
    newArrival: true
  }, adminLogin.jar);
  const createdProduct = await createResponse.json();
  const productId = createdProduct?.data?.id;
  record("Product create", createResponse.status === 201 && Boolean(productId), `status ${createResponse.status}`);

  if (productId) {
    await expectStatus("Product detail", await request(`/api/product-catalog/products/${productId}`, {}, adminLogin.jar), [200]);
    await expectStatus("Product update", await jsonRequest(`/api/product-catalog/products/${productId}`, {
      discountPrice: 899,
      stockQuantity: 12,
      featuredProduct: false
    }, adminLogin.jar, "PATCH"), [200]);
    await expectStatus("Product compare", await jsonRequest("/api/product-catalog/compare", {
      productIds: [productId, productId]
    }, adminLogin.jar), [200, 400]);
    await expectStatus("Product share link", await jsonRequest("/api/product-catalog/share", {
      productId
    }, adminLogin.jar), [200, 201]);
    await expectStatus("Product delete", await request(`/api/product-catalog/products/${productId}`, {
      method: "DELETE"
    }, adminLogin.jar), [200]);
  }

  const plansResponse = await request("/api/membership-plans?limit=1", {}, customerLogin.jar);
  const plansPayload = await plansResponse.json();
  const plan = plansPayload?.data?.items?.[0] ?? plansPayload?.data?.[0] ?? plansPayload?.items?.[0];
  record("Membership plans API", plansResponse.status === 200 && Boolean(plan?.id), `status ${plansResponse.status}`);

  if (plan?.id) {
    await expectStatus("Membership purchase flow", await jsonRequest("/api/memberships/subscribe", {
      planId: plan.id,
      provider: "RAZORPAY",
      autoRenew: true,
      action: "SUBSCRIBE"
    }, customerLogin.jar), [201]);
  }

  await expectStatus("Contact form", await jsonRequest("/api/enquiries", {
    name: "Garden Live Verification",
    phone: "9000000097",
    city: "Mumbai",
    service: "Garden Maintenance",
    message: "Production verification contact form submission."
  }), [201]);

  await expectStatus("Book Garden Visit", await jsonRequest("/api/bookings", {
    name: "Garden Live Visit Verification",
    phone: "9000000096",
    city: "Mumbai",
    service: "Book Garden Visit",
    message: "Production verification booking submission."
  }), [201]);

  await expectStatus("Checkout flow", await jsonRequest("/api/checkout", {
    customer: {
      name: "Garden Live Checkout Verification",
      email: "checkout.verify@gardenlive.in",
      phone: "9000000095"
    },
    shippingAddress: {
      line1: "Garden Live Test Address",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    items: [
      {
        sku: "GL-ARECA-PALM-001",
        name: "Areca Palm",
        quantity: 1,
        unitPrice: 999
      }
    ],
    provider: "RAZORPAY"
  }, customerLogin.jar), [201]);

  const failures = results.filter((result) => !result.passed);
  console.log(JSON.stringify({ total: results.length, passed: results.length - failures.length, failed: failures.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill();
    }
    serverProcess?.stdout?.destroy();
    serverProcess?.stderr?.destroy();
    setTimeout(() => process.exit(process.exitCode ?? 0), 500);
  });
