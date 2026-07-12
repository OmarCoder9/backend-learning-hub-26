import * as http from "node:http";

const port = 3000;

const server = http.createServer((req, res) => {
    const requestUrl = req.url ?? "/";
    const pathname = new URL(requestUrl, "http://localhost").pathname;

    console.log(`${req.method} ${requestUrl}`);

    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Welcome to Cairo Metro Control — Line 3");
        return;
    }

    if (pathname === "/next-train") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(`Next train arrival: ${new Date().toLocaleString()}`);
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Platform not found");
});

server.listen(port, () => {
    console.log(`Metro control desk is running on port ${port}`);
});