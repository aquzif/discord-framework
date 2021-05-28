let CommandsLoader = require("../loaders/CommandsLoader");
let Logger = require("../systems/Logger");

class CommandsListener {

    static start = async (bot) => {
        bot.ws.on('INTERACTION_CREATE', async inter => {await CommandsListener.handle(inter,bot)});
    }

    static handle = async (interaction,bot) => {

        let logger = new Logger();

        let { id, token, guild_id, data, member } = interaction;
        let { name } = data;

        let commandName = interaction.data.name;

        let configsList = CommandsLoader.getAllConfigs(CommandsLoader.CMD_FILES_PATH);

        for(let cfg of configsList) {
            let {command, disabled, handle} = require(cfg);

            if(disabled) continue;

            if(command === commandName){

                let guild = await bot.guilds.fetch(guild_id);
                logger.logInfo(`User ${member.user.username} used command ${name} on server ${guild.name}`);
                handle(interaction,bot);

                return;
            }

        }



        return;
    }

}

module.exports = CommandsListener;
