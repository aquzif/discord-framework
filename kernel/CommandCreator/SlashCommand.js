class SlashCommand {

    constructor() {
        this.name = "";
        this.description = "";
        this.options = [];
    }

    addArgument(argument){
        this.options = [...this.options, argument];
    }

    countCharacters() {
        let counter = 0;
        counter += this.name.length;
        counter += this.description.length;

        for(let option of this.options){
            counter += option.name.length;
            counter += option.description.length;

            for(let choice of option.choices){
                counter += choice.name.length;
                counter += choice.value.length;
            }

        }

        return counter;
    }

}

module.exports = SlashCommand;
