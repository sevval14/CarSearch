// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarContract {

    struct Car {
        string carName;
        uint256 carYear;
        string damageStatus;
    }

    Car[] cars;

    function addCar(string memory _carName, uint256 _carYear, string memory _damageStatus) public {
    
        Car memory newCar = Car({
        
            carName: _carName,
            carYear: _carYear,
            damageStatus: _damageStatus

        });
    
        cars.push(newCar);
    }

    function getCar(uint256 carIndex) public view returns (string memory, uint256, string memory) {
        require(carIndex < cars.length, "Car index out of bounds");

        Car storage car = cars[carIndex];
        return (car.carName, car.carYear, car.damageStatus);
    }

    function getCarCount() public view returns (uint256) {
        return cars.length;
    }

}
