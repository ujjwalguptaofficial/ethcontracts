import './App.css';
import { useEffect, useState } from "react";
import { ERC20, EthersClient, } from "@opweb3/ethcontracts";
import { ethers } from 'ethers';

// DAI token
const token = new ERC20("0x8f3cf7ad23cd3cadbd9735aff958023239c6a063");

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    // initiate token
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
    token.init(new EthersClient(provider)).then(_ => {
      setIsLoaded(true);
    });
  }, []);

  async function alertTokenName() {
    const name = await token.getName();
    alert(`token name is ${name}`);
  }

  async function alertTokenSymbol() {
    const symbol = await token.getSymbol();
    alert(`token symbol is ${symbol}`);
  }

  return (
    <div className="App">
      {(() => {
        if (isLoaded) {
          return (
            <div>
              <h1>EthContract.js Demo</h1>
              <button onClick={alertTokenName}>Get token Name</button>
              <div>
                <button className='mt-20' onClick={alertTokenSymbol}>Get token symbol</button>
              </div>
            </div>
          )
        }
        else {
          return (
            <div>
              Loading...
            </div>
          )
        }
      })()
      }
    </div>
  );
}

export default App;
