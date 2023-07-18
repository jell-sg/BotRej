module.exports = async ({ x, m }) => {
  if (!m.message) return;
  const fromMe = !m.key.fromMe;
  const msg = m.message;
  const group = await x.group();
  const text = msg.extendedTextMessage
    ? msg.extendedTextMessage.text
    : msg.conversation;
  if (!text.startsWith(".")) return;
  const command = text.split(" ")[0].toLowerCase().substring(1);
  if (!group) return;
  switch (command) {
    case "push":
      if (!group || fromMe) return;
      const p = group.participants.map((p) => p.id);
      const t = text.replace(/^\.push/i, "");
      try {
        await x.pushContact({ p, t });
      } catch (e) {
        console.log(e);
      }
      break;
    default:
      break;
  }
};
