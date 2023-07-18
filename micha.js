module.exports = micha = async ({ x, m }) => {
  x.name = x.user.name;
  x.number = x.user.id.split(":")[0];
  x.sendText = async ({ p, t }) => await x.sendMessage(p, { text: t });
  x.reply = async ({ t }) =>
    await x.sendMessage(m.key.remoteJid, { text: t }, { quoted: m });
  x.group = async () => await x.groupMetadata(m.key.remoteJid);
  x.pushContact = async ({ p, t }) => {
    let loop = 0;
    const loopPushContact = setInterval(async () => {
      if (loop === p.length) {
        return clearInterval(loopPushContact);
      }
      await x.sendText({ p: p[loop], t });
      loop++;
    }, 5000);
  };
  require("./case")({ x, m });
};
