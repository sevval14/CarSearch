import React, { useState ,useEffect,useMemo } from 'react';
import { ethers } from 'ethers';


function App() {
  const [carName ,setCarName] = useState("");
  //const provider = new ethers.BrowserProvider(window.ethereum);
  const [showTable, setShowTable] = useState(false);
  const [carYear, setCarYear] = useState('');
  const [damageStatus, setDamageStatus] = useState('');
  const [foundCars, setFoundCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [balance, setBalance] = useState('');
  
  const connectAddress ="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";


  const provider = useMemo(() => new ethers.BrowserProvider(window.ethereum), []);
  //const signer = provider.getSigner();
  //const contract =  new ethers.Contract(connectAddress,ABI,signer);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCar = {
      carName: carName,
      carYear: carYear,
      damageStatus: damageStatus,
    };

    setFoundCars((prevCars) => [...prevCars, newCar]);

    // Form gönderildikten sonra alanları sıfırla
    setCarName('');
    setCarYear('');
    setDamageStatus('');

    setShowTable(true);
  };


  useEffect(() => {
    setCars(foundCars);

    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    };
  
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
        <div>
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
                  <th>Age</th>
                  <th>Documents</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr key={index}>
                    <td>{car.carName}</td>
                    <td>{car.carYear}</td>
                    <td>{car.damageStatus}</td>
                    <td>{/* Age calculation or other logic can be here */}</td>
                    <td>{/* Information related to documents can be here */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  export default App;