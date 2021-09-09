const assert = require("assert")
/**
 * Module to create a testing network that already has accounts
 * To interact with the deployed contract
 */
const ganache = require("ganache-cli")
const Web3 = require("web3")
const {interface, bytecode} = require('../../compile')
/**
 * Creates an instance of web3 and attempts to connect to
 * A local test network using ganache
 */
const web3 = new Web3(ganache.provider())

let accounts
let inbox
const initialMessage = 'Initial message for Inbox Contract'
/**
 * Get a list of accounts and deploys the smart contract to a testing network
 */
beforeEach(async () => {
    accounts = await web3.eth.getAccounts() 

    /**
     * Uses the first account to deploy a contract
     */
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox contract', () => {
    
    it('Deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        /**
         * Since we are only obtaining some data and not modifying de contract
         * we use call (Like when calling a function)
         */
        const message = await inbox.methods.message().call()
        assert.equal(message, initialMessage)
    })

    it('Can change the message', async () => {
        const newMessage = 'New Message'
        /**
         * Since we are modifying the contract we are essentialy making a transacion
         * (Making transactions cost money!)
         */
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, newMessage)
    })
})
