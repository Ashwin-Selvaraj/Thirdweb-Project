import React, { useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';

const Utilities = () => {
  const address = useAddress();
  const [inputAddress, setInputAddress] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [inputDecimals, setInputDecimals] = useState('18');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

  const formatAddress = (addr) => {
    if (!addr || addr.length < 10) return 'Invalid address';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const validateAddress = (addr) => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  const convertWeiToEth = (wei, decimals = 18) => {
    if (!wei || isNaN(wei)) return '0';
    const eth = wei / Math.pow(10, decimals);
    return eth.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    });
  };

  const convertEthToWei = (eth, decimals = 18) => {
    if (!eth || isNaN(eth)) return '0';
    const wei = eth * Math.pow(10, decimals);
    return wei.toString();
  };

  const handleAddressFormat = () => {
    if (inputAddress) {
      setFormattedAddress(formatAddress(inputAddress));
    }
  };

  const handleAmountConversion = () => {
    if (inputAmount && inputDecimals) {
      const converted = convertWeiToEth(inputAmount, parseInt(inputDecimals));
      setConvertedAmount(converted);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="utilities">
      <h2>Blockchain Utilities</h2>
      
      <div className="utility-section">
        <h3>Address Utilities</h3>
        
        <div className="address-validator">
          <h4>Address Validation & Formatting</h4>
          <input
            type="text"
            placeholder="Enter Ethereum address"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            className="address-input"
          />
          <button onClick={handleAddressFormat} className="format-btn">
            Format Address
          </button>
          
          {inputAddress && (
            <div className="address-results">
              <p><strong>Full Address:</strong> {inputAddress}</p>
              <p><strong>Formatted:</strong> {formattedAddress}</p>
              <p><strong>Valid:</strong> {validateAddress(inputAddress) ? '✅ Yes' : '❌ No'}</p>
              <button 
                onClick={() => copyToClipboard(inputAddress)}
                className="copy-btn"
              >
                Copy Address
              </button>
            </div>
          )}
        </div>

        {address && (
          <div className="user-address">
            <h4>Your Address</h4>
            <p><strong>Full:</strong> {address}</p>
            <p><strong>Formatted:</strong> {formatAddress(address)}</p>
            <button 
              onClick={() => copyToClipboard(address)}
              className="copy-btn"
            >
              Copy Your Address
            </button>
          </div>
        )}
      </div>

      <div className="utility-section">
        <h3>Amount Conversion</h3>
        
        <div className="amount-converter">
          <h4>Wei to ETH Conversion</h4>
          <input
            type="text"
            placeholder="Enter amount in Wei"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="amount-input"
          />
          <input
            type="number"
            placeholder="Decimals (default: 18)"
            value={inputDecimals}
            onChange={(e) => setInputDecimals(e.target.value)}
            className="decimals-input"
          />
          <button onClick={handleAmountConversion} className="convert-btn">
            Convert
          </button>
          
          {convertedAmount && (
            <div className="conversion-result">
              <p><strong>Wei:</strong> {inputAmount}</p>
              <p><strong>ETH:</strong> {convertedAmount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="utility-section">
        <h3>Common Conversions</h3>
        
        <div className="common-conversions">
          <div className="conversion-item">
            <h4>Gas Units</h4>
            <ul>
              <li><strong>1 ETH</strong> = 1,000,000,000,000,000,000 Wei</li>
              <li><strong>1 Gwei</strong> = 1,000,000,000 Wei</li>
              <li><strong>1 Ether</strong> = 1,000,000,000 Gwei</li>
            </ul>
          </div>
          
          <div className="conversion-item">
            <h4>Block Times</h4>
            <ul>
              <li><strong>Ethereum:</strong> ~12-15 seconds</li>
              <li><strong>Polygon:</strong> ~2 seconds</li>
              <li><strong>Arbitrum:</strong> ~1 second</li>
              <li><strong>Optimism:</strong> ~2 seconds</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="utility-section">
        <h3>Network Information</h3>
        
        <div className="network-info">
          <div className="network-item">
            <h4>Ethereum Mainnet</h4>
            <p><strong>Chain ID:</strong> 1</p>
            <p><strong>RPC URL:</strong> https://ethereum.rpc.thirdweb.com</p>
            <p><strong>Explorer:</strong> https://etherscan.io</p>
          </div>
          
          <div className="network-item">
            <h4>Polygon</h4>
            <p><strong>Chain ID:</strong> 137</p>
            <p><strong>RPC URL:</strong> https://polygon.rpc.thirdweb.com</p>
            <p><strong>Explorer:</strong> https://polygonscan.com</p>
          </div>
          
          <div className="network-item">
            <h4>Arbitrum One</h4>
            <p><strong>Chain ID:</strong> 42161</p>
            <p><strong>RPC URL:</strong> https://arbitrum.rpc.thirdweb.com</p>
            <p><strong>Explorer:</strong> https://arbiscan.io</p>
          </div>
        </div>
      </div>

      <div className="utility-section">
        <h3>Quick Actions</h3>
        
        <div className="quick-actions">
          <button 
            onClick={() => window.open('https://etherscan.io', '_blank')}
            className="action-btn"
          >
            Open Etherscan
          </button>
          <button 
            onClick={() => window.open('https://polygonscan.com', '_blank')}
            className="action-btn"
          >
            Open Polygonscan
          </button>
          <button 
            onClick={() => window.open('https://arbiscan.io', '_blank')}
            className="action-btn"
          >
            Open Arbiscan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Utilities; 