const logger = require("./file-logger");

const Constants = require("../../constants/index");

// data from parent would be {
//     level: Constants.LEVEL_INFO,   or Constants.LEVEL_ERROR
//     serviceName: serviceName,
//     fnName: fnName,
//     text: result.message
// }
// 
// at head of parent file, const serviceName = fileNameFormat( __filename, __dirname );
// let fnName = fnNameFormat(new Error());

const formatLogMsg = function ( data ) {

    let logmessage = `<<<<<<<<<< ${data.serviceName}-[${data.fnName}]: ${data.text} >>>>>>>>>>`     
    
    logger[data.level](logmessage);
    // Answer by snnsnn Ref: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string

    
    // if ( data.level === Constants.LEVEL_INFO ) {
    //     logger.info(logmessage);
    //     return;
    // } else if (data.level === Constants.LEVEL_ERROR) {
    //     logger.error(logmessage);
    //     return;
    // };
    
    return;
};

// Ref: Answer by Red Walrus https://stackoverflow.com/questions/14201475/node-js-getting-current-filename
// extract filename without extension, a = __filename , b = __dirname
const fileNameFormat = function ( a, b ) {
    return a.slice(b.length + 1, -3); // -3 removed extension
};

// function name, Answer by VanagaS  Ref: https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
const fnNameFormat = function ( data ) {
    return data.stack.split("\n")[2].trim().split(" ")[1];
};

module.exports = {
    formatLogMsg,
    fileNameFormat,
    fnNameFormat
};

