const { inspect } = require("util");
client.on("message", async message => {
  const args = message.content.split(" ").slice(1); // slow 

  if (message.content.startsWith("!coderun")) {
    
    if (message.author.id !== "AdminUserID")
      return message.channel.send("You can't this command!");
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(inspect(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send({
        embed: {
          title: "Run Error",
          description: "About Error:\n\`\`\`xl\n" + inspect(err) + "\`\`\`",
          color: 961818,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "CodeRunCommand"
          }
        }
      });
    }
  }
});
