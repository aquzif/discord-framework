const path = require('path');
const fs = require('fs');
const Logger = require("../systems/Logger");

const CMD_FILES_PATH = "__DIR__/events";

class EventsLoader {

    static load = async (bot) => {

        let logger = new Logger();
        let eventsList = EventsLoader.getAllEvents(CMD_FILES_PATH);
        let loaded = 0;

        for(let cfg of eventsList){

            let { evtName, handle, disabled } = require(cfg);
            if(disabled) continue;

            if(!(evtName && handle)){
                logger.logWarn(`command ${name}.js is not prepared properly`);
                continue;
            }

            bot.on(evtName,(...e)=>{handle(bot,...e)});

            loaded++;
            logger.logInfo(`event ${evtName} loaded successfully`);

        }

        logger.logInfo(`Loaded ${loaded} event(s)`);

    }


    static getAllEvents = (src) => {
        let filesList = [];

        src = EventsLoader.getAbsPath(src);
        let files = fs.readdirSync(src);

        files.forEach(f => {

            let subSrc = path.join(src,f)

            let stats = fs.lstatSync(subSrc);
            if(stats.isDirectory()){

                if(f === "templates") return;

                filesList = [...filesList,...EventsLoader.getAllConfigs(subSrc)];
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

module.exports = EventsLoader;
