const SlashArgument = require("../../kernel/CommandCreator/SlashArgument");
const OptionsTypes = require("../../kernel/enums/CommandOptionsTypes");
const SlashCommand = require("../../kernel/CommandCreator/SlashCommand");

class ExampleCommand {

    static disabled = false;
    static command = "blep"
    // static guildID = "749527 698200006716";

    static generate = () => {
        let command = new SlashCommand();

        command.name = ExampleCommand.command;
        command.description = "Send a random adorable animal photo";

        let animal = new SlashArgument();

        animal.type = OptionsTypes.STRING;
        animal.name = "animal";
        animal.description = "The type of animal";
        animal.required = true;

        animal.addChoice({name: "Dog",value: "animal_dog"});
        animal.addChoice({name: "Cat",value: "animal_cat"});
        animal.addChoice({name: "Penguin",value: "animal_penguin"});

        command.addArgument(animal);

        let only_smol = new SlashArgument();

        only_smol.name = "only_smol";
        only_smol.description = "Whether to show only baby animals";
        only_smol.required = false;
        only_smol.type = OptionsTypes.BOOLEAN;

        command.addArgument(only_smol);

        return command;
    }

    static handle = (interaction) => {

    }


}

module.exports = ExampleCommand
