const { SendMessage } = require("../models/Slack")

module.exports = {
    async SlackEvent(req, res){
        try{
            const {body} = req
            if(body['challenge']){return res.send(body['challenge'])}
            else{
                const send_message = await SendMessage(body['event']['channel'], 'I received your message')
                return res.send(send_message)
            }
        }
        catch(error){
            return res.send(error)
        }
    }
}