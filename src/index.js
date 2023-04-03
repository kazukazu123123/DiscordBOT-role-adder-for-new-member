require("dotenv").config();

const {
  Client,
  GatewayIntentBits: { GuildMembers },
  Partials,
} = require("discord.js");

const targetRoleId = process.env.TARGET_ROLE_ID;

const client = new Client({
  intents: [GuildMembers],
  partials: [Partials.GuildMember],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (oldMember.pending && !newMember.pending) {
    console.log(
      `${oldMember.user.username}#${oldMember.user.discriminator} approved rule screen.`
    );
    newMember.guild.roles
      .fetch(targetRoleId)
      .then((role) => {
        newMember.roles
          .add(role)
          .then(() => {
            console.log("Role add success!");
          })
          .catch((e) => console.log("Faile to add role:", e));
      })
      .catch((e) => console.log("Faile to fetch role:", e));
  }
});

process.on("SIGTERM", client.destroy.bind(client));
process.on("SIGINT", client.destroy.bind(client));

client.login();
