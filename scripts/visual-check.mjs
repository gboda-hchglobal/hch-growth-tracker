import { spawn } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";

const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-debugging-port=9224",
    "--user-data-dir=/tmp/hch-growth-visual-profile",
    "--window-size=1440,1100",
    "http://127.0.0.1:3000",
  ],
  { stdio: "ignore" },
);

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getPage() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9224/json/list");
      const pages = await response.json();
      const page = pages.find((entry) => entry.type === "page");
      if (page) return page;
    } catch {
      // Chrome is still starting.
    }
    await pause(200);
  }
  throw new Error("Chrome DevTools endpoint did not become ready.");
}

const page = await getPage();
const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let commandId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const callback = pending.get(message.id);
  if (callback) {
    pending.delete(message.id);
    callback(message);
  }
});

await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));

function command(method, params = {}) {
  commandId += 1;
  const id = commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out: ${method}`));
    }, 10000);
    pending.set(id, (message) => {
      clearTimeout(timeout);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    });
  });
}

async function evaluate(expression) {
  return command("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
}

async function screenshot(path) {
  const result = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(path, Buffer.from(result.data, "base64"));
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await pause(1800);
  await evaluate(`localStorage.setItem("hch-demo-auth", "true"); location.reload();`);
  await pause(2200);

  const dashboardCheck = await evaluate(`({
    title: document.querySelector("h1")?.textContent,
    cards: document.querySelectorAll(".metric-card").length,
    chart: Boolean(document.querySelector(".growth-svg"))
  })`);
  console.log("dashboard", dashboardCheck.result.value);
  await screenshot("/tmp/hch-dashboard.png");

  await evaluate(`Array.from(document.querySelectorAll("button")).find((button) => button.textContent.includes("Add measurement"))?.click()`);
  await pause(500);
  const modalCheck = await evaluate(`({
    visible: Boolean(document.querySelector(".measurement-modal")),
    fields: document.querySelectorAll(".measurement-modal input").length
  })`);
  console.log("measurement-modal", modalCheck.result.value);
  await screenshot("/tmp/hch-measurement-modal.png");

  await evaluate(`document.querySelector(".measurement-modal .modal-head button")?.click()`);
  await evaluate(`Array.from(document.querySelectorAll(".sidebar-nav button")).find((button) => button.textContent.includes("Growth charts"))?.click()`);
  await pause(500);
  const chartCheck = await evaluate(`({
    title: document.querySelector("h1")?.textContent,
    source: document.querySelector('a[href="/hch-growth-reference.pdf"]')?.getAttribute("href")
  })`);
  console.log("growth-chart", chartCheck.result.value);

  await mkdir("/tmp/hch-downloads", { recursive: true });
  await command("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "/tmp/hch-downloads",
  });
  await evaluate(`Array.from(document.querySelectorAll(".sidebar-nav button")).find((button) => button.textContent.includes("Reports"))?.click()`);
  await pause(500);
  await evaluate(`Array.from(document.querySelectorAll("button")).find((button) => button.textContent.includes("Export as PDF"))?.click()`);
  await pause(1800);
  const downloads = await readdir("/tmp/hch-downloads");
  console.log("pdf-export", downloads);

  await command("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await pause(500);
  await screenshot("/tmp/hch-mobile.png");
} finally {
  socket.close();
  chrome.kill("SIGTERM");
}
