const { dir,pattern } = require("../../config.json").logs;

const fs = require("fs");
const path = require('path');


class Logger {

    logsDIR = "__DIR__/logs";
    logPattern = "[%%date%%] %%type%% -> %%message%%";

    constructor() {
        this.logsDIR = dir.replace("__DIR__",path.dirname(require.main.filename));
    }

    logInfo = (message) => {
        let fileDir = this.checkLogDir();
        message = this.patternMessage("INFO",message);
        fs.appendFileSync(fileDir, `${message}\n`);
        console.log(`${message}`);
    }

    logWarn = (message) => {
        let fileDir = this.checkLogDir();
        message = this.patternMessage("WARN",message);
        fs.appendFileSync(fileDir, `${message}\n`);
        console.log(`${message}`);
    }

    logError = (message) => {
        let fileDir = this.checkLogDir();
        message = this.patternMessage("ERR",message);
        fs.appendFileSync(fileDir, `${message}\n`);
        console.log(`${message}`);
    }

    checkLogDir = () => {
        let dateObj = new Date();

        let year = dateObj.getFullYear();
        let month = ("0"+(dateObj.getMonth()+1)).slice(-2);
        let day = ("0"+dateObj.getDate()).slice(-2);

        let dir = path.join(this.logsDIR,`${year}-${month}`);

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        return path.join(dir,`${day}.txt`);

    }

    patternMessage = (type,message) => {

        let dateObj = new Date();

        let hour = ("0"+dateObj.getHours()).slice(-2);
        let minute = ("0"+dateObj.getMinutes()).slice(-2);
        let seconds = ("0"+dateObj.getSeconds()).slice(-2);

        let msg = this.logPattern.replace("%%date%%",`${hour}:${minute}:${seconds}`);
        msg = msg.replace("%%type%%",type);
        msg = msg.replace("%%message%%",message);

        return msg;

    }




}

module.exports = Logger;
