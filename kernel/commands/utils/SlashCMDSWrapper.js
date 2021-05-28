const axios = require('axios');
const Logger = require("../../systems/Logger");

const {TOKEN, APP_ID} = require("../../../config.json");
const AUTH = "Bot "+TOKEN;

class SlashCMDSWrapper {

    constructor() {
        this.logger = new Logger();
    }

    executeAxios(url,method,options = undefined){
        return axios({
            method: method,
            url: url,
            headers: {
                'Authorization': AUTH
            },
            data: options
        }).catch((e) => {
            this.logger.logError(e.response.data.message);
        });

    }


    async getAllGlobalSlashCommands(){
        let response = await this.executeAxios(`https://discord.com/api/v8/applications/${APP_ID}/commands`,"GET");
        return response.data;
    }

    async getALlGuildSlashCommands(guildID){
        let response = await this.executeAxios(`https://discord.com/api/v8/applications/${APP_ID}/guilds/${guildID}/commands`,"GET");
        return response.data;
    }

    async registerGlobalCommand(options){
        let response = await this.executeAxios(`https://discord.com/api/v8/applications/${APP_ID}/commands`,"POST",options);
        return response.data;
    }

    async registerGuildCommand(options,guildID){
        let response = await this.executeAxios(`https://discord.com/api/v8/applications/${APP_ID}/guilds/${guildID}/commands`,"POST",options);
        return response.data;
    }

    async unregisterGlobalCommand(id){
        let response = await this.executeAxios(`https://discord.com/api/v8/applications/${APP_ID}/commands/${id}`,"DELETE");
        return response.data;
    }

    async unregisterGuildCommand(id,guildID){
        let response = await this.executeAxios(`https://discord.com/api/v8/applications/${APP_ID}/guilds/${guildID}/commands/${id}`,"DELETE");
        return response.data;
    }

    async updateCallback(interactionTOKEN,answer){
        return await axios.patch(`https://discord.com/api/v8/webhooks/${APP_ID}/${interactionTOKEN}/messages/@original`,answer,
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AUTH
            }
        }).catch((e)=>{console.log(`updateCallbackError: ${e.response.status}`)})
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

module.exports = SlashCMDSWrapper;
