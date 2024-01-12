// CarContract.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarContract {
    struct Document {
        string name;
        string content;
    }

    struct Car {
        string carName;
        uint256 carYear;
        string damageStatus;
        Document[] documents;
    }

    Car[] public cars;


}
