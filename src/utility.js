"use strict";

const yn = require("yn");

const getBinaryLocationPrefix = () => {
    return yn(process.env.DISABLE_BIN_PREFIX) ? "" : "/opt/bin/";
}

const prefixCommand = (command) => {
    return `${getBinaryLocationPrefix()}${command}`
}

module.exports = {
    getBinaryLocationPrefix,
    prefixCommand
}