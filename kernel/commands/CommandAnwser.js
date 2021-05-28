let SlashCMDWrapper = require("../commands/utils/SlashCMDSWrapper");

class CommandAnwser {

    constructor(interaction,bot) {

        this.interaction = interaction;
        this.bot = bot;
        this.wrapper = new SlashCMDWrapper();

        this.responded = false;

        this.components = [];
        this.content = " ";
    }

    addComponent(component){
        this.components = [...this.components, component];
    }

    async respond(){
        await this.send_DO_NOT_USE_THIS(4);
    }

    async wait(){
        await this.send_DO_NOT_USE_THIS(5);
    }

    async send_DO_NOT_USE_THIS(typeID){

        let {id, token} = this.interaction;

        let respond = {
            data: {
                type: typeID,
                data: {}
            }
        };

        respond.data.data = typeID === 4 ? (
            {
                content:this.content,components:this.components
            }
        ) : {};

        // console.log(JSON.stringify(respond));return;

        if(this.responded){
            await this.wrapper.updateCallback(token,this);
        }else{
            this.responded = true;
            this.bot.api.interactions(id, token).callback.post(respond);
        }

    }



}

module.exports = CommandAnwser;
