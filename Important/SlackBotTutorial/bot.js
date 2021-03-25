'use strict'

const Slack = require('slack');


module.exports.run = async (data) => {
    const dataObject = JSON.parse (data.body);
    console.log(dataObject);

    let response = {
        statusCode: 200,
        body : {},
        headers : {'X-Slack-No-Retry' : 1}
    }

    try {
        if ( !('X-Slack-Retry-Num' in data.headers) )
        {
            switch (dataObject.type) {
                case 'url_verification':
                    response.body = verifyCall (dataObject);
                    break;
                case 'event_callback':
                    console.log("hello");
                    if (!dataObject.event.thread_ts){
                        console.log("hello");
                        const params = {
                            token: 'sert-32454656767-23232324354544-dsdsdssfwrweerwerwerew',
                            channel: dataObject.event.channel,
                            text: 'Hello, can you specify URL with error?',
                            thread_ts: dataObject.event.ts
                        }
                        console.log("params"+ params);
        
                        Slack.chat.postMessage( params );
                    }
    
                    response.body = {ok: true}
    
                    break;
                    
                }
        }
    }
    catch ( err ) {

    }
    finally {
        return response;
    }

}

function verifyCall (data){
    return data.challenge;
}