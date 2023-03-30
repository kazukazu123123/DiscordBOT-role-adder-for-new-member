require("dotenv").config();

const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits: { GuildMembers, GuildModeration },
  Partials,
} = require("discord.js");

const targetRoleId = "1090900993677467728";

const client = new Client({
  intents: [GuildMembers, GuildModeration],
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
    newMember.roles.add(targetRoleId).then(() => {
      console.log("Role add success!");
    });
  }
});

process.on("SIGTERM", client.destroy);
process.on("SIGINT", client.destroy);

client.login();
