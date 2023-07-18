const {
  default: michaSocket,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const P = require("pino");

(async function connectMicha() {
  const creds = await useMultiFileAuthState("./creds");
  const micha = michaSocket({
    printQRInTerminal: true,
    logger: P({ level: "silent" }),
    browser: ["Micha", "Firefox", "1.0.0"],
    auth: creds.state,
  });
  micha.ev.on("connection.update", ({ connection }) => {
    if (connection === "connecting") console.log("Connecting");
    if (connection === "open") console.log(micha.user.name || "Micha");
    if (connection === "close") connectMicha();
  });
  micha.ev.on("creds.update", () => creds.saveCreds());
  micha.ev.on("messages.upsert", ({ messages }) =>
    require("./micha")({ x: micha, m: messages[0] })
  );
})();
