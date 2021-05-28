const SlashArgument = require("../kernel/commands/SlashArgument");
const OptionsTypes = require("../kernel/commands/SlashOptionsTypes");
const SlashCommand = require("../kernel/commands/SlashCommand");

const CommandAnwser = require("../kernel/commands/CommandAnwser");
const ComponentContainer = require("../kernel/commands/components/ComponentContainer");


const Wrapper = require("../kernel/commands/utils/SlashCMDSWrapper");
const Button = require("../kernel/commands/components/button/Button");

class ExampleCommand {

    static disabled = false;
    static command = "test";
    static guildID = "772553807912632359";

    static generate = () => {
        let command = new SlashCommand();

        command.name = ExampleCommand.command;
        command.description = "Send a random adorable animal photo";


        return command;
    }

    static handle = async (interaction,bot) => {

        let answer = new CommandAnwser(interaction,bot);
        answer.content = "asdasd";


        let testsdas = new Wrapper();
        // await answer.wait();
        // await testsdas.sleep(2000);

        let buttonContainer = new ComponentContainer();

        let button = new Button();
        button.custom_id = "test";
        button.label = "test";

        buttonContainer.addComponent(button);

        answer.addComponent(buttonContainer);


        await answer.respond();

    }


}

module.exports = ExampleCommand
