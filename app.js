const Discord = require("discord.js");
const Logger = require("./kernel/systems/Logger");
const { TOKEN } = require('./config.json');
const CommandsLoader = require('./kernel/loaders/CommandsLoader');
const EventsLoader = require("./kernel/loaders/EventsLoader");
const CommandsListener = require("./kernel/listeners/CommandsListener");

const bot = new Discord.Client();
const logger = new Logger();

const initBot = async () => {
    logger.logInfo("-=-=--=-=-=-=-=-=-( STARTING BOT )-=-=--=-=-=-=-=-=-");
    await bot.login(TOKEN);
}

initBot().then(async () => {

    await CommandsLoader.load(bot);
    await EventsLoader.load(bot);

    await CommandsListener.start(bot);

    logger.logInfo("Bot initialized Successfully");

}).catch(e => {
    logger.logError("-=-=--=-=-=-=-=-=-( CRITICAL ERROR )-=-=--=-=-=-=-=-=-")
    logger.logError(e.message);
    process.exit();
});
