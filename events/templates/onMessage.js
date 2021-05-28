const Logger = require("../../kernel/systems/Logger");

class OnMessage {

    static evtName = "message";
    static disabled = false;

    static handle = (bot,...events) => {

        let [evt] = events;

        let userName = evt.author.username;
        let chanName = evt.channel.name;
        let {content} = evt;

        let logger = new Logger();

        logger.logInfo(`User ${userName} writted "${content}" on channel #${chanName}`);

    }

}

module.exports = OnMessage;
