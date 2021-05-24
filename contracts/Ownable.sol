//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Ownable {
    address payable owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    constructor() {
        owner = payable(msg.sender);
    }
}