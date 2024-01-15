import React, { useState ,useEffect,useMemo } from 'react';
import { ethers } from 'ethers';


function App() {
  const [carName ,setCarName] = useState("");
  const [carYear, setCarYear] = useState('');
  const [damageStatus, setDamageStatus] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [foundCars, setFoundCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [balance, setBalance] = useState('');
  
  const connectAddress ="0xdD2FD4581271e230360230F9337D5c0430Bf44C0";
  const ABI =[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_carName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_carYear",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_damageStatus",
          "type": "string"
        }
      ],
      "name": "addCar",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "carIndex",
          "type": "uint256"
        }
      ],
      "name": "getCar",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCarCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const provider = useMemo(() => new ethers.BrowserProvider(window.ethereum), []);//Web3Provider versiyon 5

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
          // Ethereum cüzdanına bağlan
    await provider.send("eth_requestAccounts", []);
    //ether kendi syafasında var metamaskla bağlantı yapmakiçin
    const signer = await provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(connectAddress, ABI, signer);
    

     const tx = await contract.addCar(carName, carYear, damageStatus);   
      await tx.wait(); // İşlemin blokzincirinde onaylanmasını bekle

    
    setFoundCars((prevCars) => [...prevCars, { carName, carYear, damageStatus }]);
    setCarName('');
    setCarYear('');
    setDamageStatus('');
    setShowTable(true);

    } catch (error) {
      console.error("An error occurred:", error);

    }

  };


  useEffect(() => {
    setCars(foundCars);

    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);

    }
  
    const getBalance = async () => {
      console.log(provider);

      const balance = await provider.getBalance(connectAddress);
      console.log(provider);
      const balancedFormatted = ethers.formatEther(balance);
      setBalance(balancedFormatted);
    };

  
    connectWallet().catch(console.error);
    getBalance().catch(console.error);
  
  }, [provider,foundCars]);




    return (
      <div>
        <img className="image_header" src={'./assets/CarHeader.jpg'} alt="" />
        <h1>Car Store</h1>
        <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className='addRow'>
            <label>
              Car Name:
              <input
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                required
              />
            </label>
            <label>
              Car Year:
              <input
                type="text"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                required
              />
            </label>
            <label>
              Damage Status:
              <input
                type="text"
                value={damageStatus}
                onChange={(e) => setDamageStatus(e.target.value)}
                required
              />
            </label>
            <button type="submit">Add Car</button>
  
            <label>
              <span className="totalAccount">Total Account : </span>
              <span className="account">{balance}</span>
            </label>
          </form>
        </div>
        {showTable && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Car Name</th>
                  <th>Car Year</th>
                  <th>Damage Status</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr key={index}>
                    <td>{car.carName}</td>
                    <td>{car.carYear}</td>
                    <td>{car.damageStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
         </div>
      </div>
    );
  }
  
  export default App;