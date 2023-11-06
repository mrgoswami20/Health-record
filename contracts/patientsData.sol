// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecord {
    address public owner;
    mapping(address => string) public patientDescriptions;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function addPatientData(address patientAddress, string memory description) public onlyOwner {
        patientDescriptions[patientAddress] = description;
    }

    function getPatientData(address patientAddress) public view returns (string memory) {
        return patientDescriptions[patientAddress];
    }
}