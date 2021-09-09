/**
 * Compiler version
 */
pragma solidity ^0.4.17;

/**
 * Contract, similar to a class
 */
contract Inbox {
    string public message;

    /**
     * Similar to a constructor
     */
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    /**
     * Everytime you manipulate a contract's data
     * Or call a function that does the same
     * Once deployed in a Ethereum network
     * It will cost money
     */
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}