const { formatLogMsg } = require("../services/service-logger/log-format");

function validEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

function pwdByteLen(pwd) {
    return new TextEncoder().encode(pwd).length
}

function controlErrorCatch(res, error, msg, status, level, service, fn) {
    if (error) {

        formatLogMsg({
            level: level,
            serviceName: service,
            fnName: fn,
            text: msg,
        });

        result.status = status;
        result.msg = msg;
        return res.status(status).json({ message: msg });
    }
}

function testErrorCatch(res, error, msg, status, level, service, fn) {
    let result = {
        status: null,
        msg: null,
    }

    formatLogMsg({
        level: level,
        serviceName: service,
        fnName: fn,
        text: msg,
    });

    return result;
}

// if (error) {
//     let result = testErrorCatch(msg, status, level, service, fn);
//     return res.status(result.status).json({ message: result.msg });
// }

// might mess up the order of some error checking
function serviceErrorCatch(res, error, msg, status, level, service, fn) {
    if (error) {
        res.status = status;
        res.message = msg;

        formatLogMsg({
            level: level,
            serviceName: service,
            fnName: fn,
            text: msg,
        });

        return res;
    }
}

module.exports = {
    validEmail,
    controlErrorCatch,
    serviceErrorCatch,
    pwdByteLen,
    testErrorCatch,
}
