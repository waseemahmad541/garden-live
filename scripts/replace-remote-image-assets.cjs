const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const webRoot = path.join(root, "apps", "web");
const host = "images." + "un" + "splash.com";
const remoteImagePattern = new RegExp(`https://${host}/(photo-[A-Za-z0-9-]+)\\?auto=format&fit=crop&w=\\d+&q=\\d+`, "g");

const imageByPhotoId = {
  "photo-1600566753190-17f0baa2a6c3": "/images/v4/hero-garden.svg",
  "photo-1600607687939-ce8a6c25118c": "/images/v4/luxury-villa.svg",
  "photo-1600585154526-990dced4db0d": "/images/v4/luxury-villa.svg",
  "photo-1500382017468-9049fed747ef": "/images/v4/garden-care.svg",
  "photo-1571896349842-33c89424de2d": "/images/v4/luxury-villa.svg",
  "photo-1584132967334-10e028bd69f7": "/images/v4/hero-garden.svg",
  "photo-1497366811353-6870744d04b2": "/images/v4/rooftop-garden.svg",
  "photo-1494526585095-c41746248156": "/images/v4/rooftop-garden.svg",
  "photo-1416879595882-3373a0480b5b": "/images/v4/premium-nursery.svg",
  "photo-1500530855697-b586d89ba3ee": "/images/v4/hero-garden.svg",
  "photo-1485955900006-10f4d324d411": "/images/v4/indoor-plants.svg",
  "photo-1591857177580-dc82b9ac4e1e": "/images/v4/garden-care.svg",
  "photo-1520412099551-62b6bafeb5bb": "/images/v4/ai-plant-doctor.svg",
  "photo-1497250681960-ef046c08a56e": "/images/v4/qr-passport.svg",
  "photo-1598902108854-10e335adac99": "/images/v4/hero-garden.svg",
  "photo-1558521958-0a228e77d984": "/images/v4/after-garden.svg",
  "photo-1521334884684-d80222895322": "/images/v4/garden-store.svg",
  "photo-1494790108377-be9c29b29330": "/images/v4/avatar-ananya.svg",
  "photo-1500648767791-00dcc994a43e": "/images/v4/avatar-rahul.svg",
  "photo-1534751516642-a1af1ef26a56": "/images/v4/avatar-meera.svg",
  "photo-1509423350716-97f9360b4e09": "/images/v4/premium-nursery.svg",
  "photo-1501004318641-b39e6451bec6": "/images/v4/after-garden.svg",
  "photo-1466692476868-aef1dfb1e735": "/images/v4/hero-garden.svg",
  "photo-1523348837708-15d4a09cfac2": "/images/v4/garden-care.svg",
  "photo-1459156212016-c812468e2115": "/images/v4/premium-nursery.svg"
};

const extensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
let fileCount = 0;
let replacementCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".next")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!extensions.has(path.extname(entry.name))) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    const nextContent = content.replace(remoteImagePattern, (_match, photoId) => {
      replacementCount += 1;
      return imageByPhotoId[photoId] || "/images/v4/hero-garden.svg";
    });

    if (nextContent !== content) {
      fs.writeFileSync(fullPath, nextContent);
      fileCount += 1;
    }
  }
}

walk(webRoot);

if (replacementCount > 0) {
  console.log(`[images] Replaced ${replacementCount} remote image references across ${fileCount} files.`);
} else {
  console.log("[images] No remote image references found.");
}
