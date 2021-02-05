"use strict";

const childProcess = require("child_process");

const spawnPromise = function (command, argsarray, envOptions) {
  return new Promise((resolve, reject) => {
    console.log("executing", command, argsarray.join(" "));

    const childProc = childProcess.spawn(
        command,
        argsarray,
        envOptions || { env: process.env, cwd: process.cwd() }
      ),
      resultBuffers = [];

    childProc.stdout.on("data", (buffer) => {
      resultBuffers.push(buffer);
    });

    childProc.stderr.on("data", (buffer) => console.error(buffer.toString()));
    childProc.on("exit", (code, signal) => {
      if (code || signal) {
        reject(`${command} failed with ${code || signal}`);
      } else {
        resolve({ result: Buffer.concat(resultBuffers).toString().trim() });
      }
    });
  });
};

module.exports = {
  spawn: spawnPromise,
};
