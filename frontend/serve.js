const { createServer, request: httpRequest } = require("node:http");
const { readFile } = require("node:fs/promises");
const { extname, join, normalize } = require("node:path");

const PORT = Number(process.env.FRONTEND_PORT || 5173);
const ROOT = __dirname;
const BACKEND_URL = new URL(process.env.BACKEND_URL || "http://localhost:3000");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function proxyApi(request, response) {
  const proxyRequest = httpRequest(
    {
      hostname: BACKEND_URL.hostname,
      port: BACKEND_URL.port || 80,
      path: request.url,
      method: request.method,
      headers: {
        ...request.headers,
        host: BACKEND_URL.host,
      },
    },
    (proxyResponse) => {
      response.writeHead(proxyResponse.statusCode || 502, proxyResponse.headers);
      proxyResponse.pipe(response);
    },
  );

  proxyRequest.on("error", () => {
    if (response.headersSent) return;

    response.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({
      error: "Backend is not running. Start it from the backend folder with npm.cmd start.",
    }));
  });

  request.pipe(proxyRequest);
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname.startsWith("/api/")) {
    proxyApi(request, response);
    return;
  }

  const requestedPath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
  const filePath = normalize(join(ROOT, requestedPath));

  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
  console.log(`API requests are proxied to ${BACKEND_URL.origin}`);
});
