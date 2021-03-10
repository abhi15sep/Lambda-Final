const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN_BOT;
const web = new WebClient(token);

module.exports = {
    async SendMessage(channel, message){
        try{
            const post_message = await web.chat.postMessage({channel: channel, text: message});
            return post_message;
        }
        catch(err){
            return err;
        }
    }
}