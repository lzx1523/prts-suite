// PRTS suite host half: serves the animated lockscreen asset from disk.
import fs from "node:fs";

const LOCK_FILE = "E:/1523/priestess_lockscreen.webp";
const DBG_FILE = "E:/1523/prts-ref/host-debug.txt";

export const name = "dsh-prts-suite";
export const inject = ["webServer"];

export function apply(ctx) {
  try {
    const ws = ctx && ctx.webServer !== undefined ? ctx.webServer : null;
    fs.appendFileSync(DBG_FILE, new Date().toISOString() + " apply; ctx.ws=" + !!ws + "\n");
    if (!ws) return;
    ws.register({
      kind: "exact",
      path: "/prts-assets/lockscreen.webp",
      handler: (req, res) => {
        if (!fs.existsSync(LOCK_FILE)) {
          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200, {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=3600"
        });
        fs.createReadStream(LOCK_FILE).pipe(res);
      }
    });
    fs.appendFileSync(DBG_FILE, new Date().toISOString() + " route registered\n");
  } catch (e) {
    try { fs.appendFileSync(DBG_FILE, new Date().toISOString() + " apply error: " + e.message + "\n"); } catch (e3) {}
  }
}
