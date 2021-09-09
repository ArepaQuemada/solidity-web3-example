const path = require("path")
const fs = require("fs")
/**
 * Solidity compiler
 */
const solc = require("solc")

const inboxPath = path.resolve(__dirname, "./src/contracts/", "Inbox.sol")
const source = fs.readFileSync(inboxPath, "utf8")

/**
 * We export the Inbox contract that contains the ABI and bytecode
 * ABI stands for Application Binary Interface
 */
module.exports = solc.compile(source, 1).contracts[':Inbox']
