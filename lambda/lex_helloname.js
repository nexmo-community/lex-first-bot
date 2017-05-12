'use strict';
     
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log('request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.intentName}');
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const name = slots.name;

    
    callback(close(sessionAttributes, 'Fulfilled',
    {'contentType': 'PlainText', 'content': `Hello ${name}, its nice to meet you`}));
    
}
 
// --------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
