const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 1) {
            let title = "ERROR";
            let description = "1 argument required. Example: !removeDevice @name."
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        var device = args[0];

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);

            if (devices.hasOwnProperty(device)) {
                delete devices[device];

                /* Write to devices.json file. */
                fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                    if (err) throw err;

                    let title = "Successfully Removed";
                    let description = "'**" + device + "**' was removed from devices.";
                    console.log(title + ": " + description);
                    Tools.sendEmbed(message.channel, title, description);
                });
            }
            else {
                let title = "ERROR";
                let description = "'**" + device + "**' does not exist in devices.";
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
                return false;
            }
        });

        return true;
    },
};