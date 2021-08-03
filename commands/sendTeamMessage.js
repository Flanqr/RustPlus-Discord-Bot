const Tools = require("./../tools/tools.js");

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length === 0) {
            Tools.print("ERROR", "Empty message.", channel);
            return false;
        }

        msg = message.replace("!sendTeamMessage ", "");

        let title = "Successfully Sent";
        let description = "[" + author + "] " + "sent the message '**" + msg + "**'.";
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        Tools.print(title, description, channel);
        return true;
    },
};
