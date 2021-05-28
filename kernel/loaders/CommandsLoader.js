const SlashCMDSWrapper = require("../commands/utils/SlashCMDSWrapper");
const fs = require('fs');
const path = require('path');
const Logger = require("../systems/Logger");
const { removeUnusedGlobalCommands,removeUnusedGuildCommands } = require('../../config.json').commands;

class CommandsLoader {

    static CMD_FILES_PATH = "__DIR__/commands";

    static load = async (bot)=> {
        let wrapper = new SlashCMDSWrapper();
        let logger = new Logger();
        let configsList = CommandsLoader.getAllConfigs(CommandsLoader.CMD_FILES_PATH);
        let loaded = 0;

        let usedGlobally = [];
        let usedGuildly = [];

        for(let cfg of configsList){
            let { name, command, disabled, generate, handle, guildID } = require(cfg);

            if(disabled) continue;
            if(!(generate && handle && command)){
                logger.logWarn(`command ${name}.js is not prepared properly`);
                continue;
            }

            let cmdJSON = generate();

            if(guildID){
                await wrapper.registerGuildCommand(cmdJSON, guildID);
                usedGuildly = [...usedGuildly,{command,guildID}];
            }else{
                await wrapper.registerGlobalCommand(cmdJSON);
                usedGlobally = [...usedGlobally,command];
            }
            loaded++;

            logger.logInfo(`command ${command} loaded successfully`);

        }

        logger.logInfo(`Loaded ${loaded} command(s)`);

        if(removeUnusedGlobalCommands) await CommandsLoader.removeGlobalCommands(usedGlobally);
        if(removeUnusedGuildCommands) await CommandsLoader.removeGuildCommands(bot,usedGuildly);




    }

    static removeGlobalCommands = async (usedGlobally) => {

        let wrapper = new SlashCMDSWrapper();
        let logger = new Logger();

        let commandsInCloud = await wrapper.getAllGlobalSlashCommands();

        for(let {name,id} of commandsInCloud){

            let exists = false;

            for(let cmdName of usedGlobally){
                if(name === cmdName) exists = true;
            }

            if(!exists) {
                logger.logInfo(`Global command ${name} is no longer used, removing`)
                await wrapper.unregisterGlobalCommand(id);
            }

        }
    }

    static removeGuildCommands = async (bot,usedGuildly) => {

        let wrapper = new SlashCMDSWrapper();
        let logger = new Logger();

        bot.guilds.cache.each(async g => {

            let guildID = g.id;
            let guildName = g.name;

            let commandsInCloud = await wrapper.getALlGuildSlashCommands(guildID);

            for(let {name,id} of commandsInCloud){ //iteracja po wszystkich komendach gildii

                let founded = false;

                for(let localCmd  of usedGuildly){

                    if(localCmd.guildID+"" === guildID+""){
                        if(localCmd.command === name){
                            founded = true;
                        }
                    }

                }

                if(!founded) {
                    logger.logInfo(`Command ${name} is no longer used on ${guildName} server, removing`);
                    await wrapper.unregisterGuildCommand(id,guildID);
                }

            }

        })
    }

    static getAllConfigs = (src)=> {

        let filesList = [];

        src = CommandsLoader.getAbsPath(src);
        let files = fs.readdirSync(src);



        files.forEach(f => {

            let subSrc = path.join(src,f)

            let stats = fs.lstatSync(subSrc);
            if(stats.isDirectory()){

                if(f === "templates") return;

                filesList = [...filesList,...CommandsLoader.getAllConfigs(subSrc)];
            }else{

                if(path.extname(f) !== ".js") return;

                filesList = [...filesList,subSrc];
            }
        });

        return filesList;

    }

    static getAbsPath = (src) => {
        return src.replace("__DIR__", path.dirname(require.main.filename));
    }

}

module.exports = CommandsLoader
