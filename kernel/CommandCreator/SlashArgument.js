const Options = require("../enums/CommandOptionsTypes");

class SlashArgument {

    constructor() {
        this.name = "";
        this.description = " ";
        this.type = Options.STRING;
        this.required = false;
        this.choices = [];
    }

    addChoice(obj){
        this.choices = [...this.choices,obj];
    }

}

module.exports = SlashArgument;
