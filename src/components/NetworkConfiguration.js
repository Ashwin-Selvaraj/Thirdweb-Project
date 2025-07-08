import React from 'react';
import { useNetwork, useSwitchNetwork, useChainId } from '@thirdweb-dev/react';

const NetworkConfiguration = () => {
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork();
  const chainId = useChainId();

  const supportedNetworks = [
    { chainId: 1, name: 'Ethereum Mainnet', rpc: 'https://ethereum.rpc.thirdweb.com' },
    { chainId: 5, name: 'Goerli Testnet', rpc: 'https://goerli.rpc.thirdweb.com' },
    { chainId: 137, name: 'Polygon', rpc: 'https://polygon.rpc.thirdweb.com' },
    { chainId: 80001, name: 'Mumbai Testnet', rpc: 'https://mumbai.rpc.thirdweb.com' },
    { chainId: 42161, name: 'Arbitrum One', rpc: 'https://arbitrum.rpc.thirdweb.com' },
    { chainId: 10, name: 'Optimism', rpc: 'https://optimism.rpc.thirdweb.com' },
    { chainId: 8453, name: 'Base', rpc: 'https://base.rpc.thirdweb.com' },
  ];

  const getNetworkName = (chainId) => {
    const network = supportedNetworks.find(net => net.chainId === chainId);
    return network ? network.name : `Unknown Network (${chainId})`;
  };

  const handleNetworkSwitch = async (targetChainId) => {
    try {
      await switchNetwork(targetChainId);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return (
    <div className="network-configuration">
      <h2>Network Configuration</h2>
      
      <div className="current-network">
        <h3>Current Network</h3>
        <p><strong>Network:</strong> {getNetworkName(chainId)}</p>
        <p><strong>Chain ID:</strong> {chainId}</p>
        {network && (
          <p><strong>Status:</strong> {network.isLoading ? 'Loading...' : network.isConnected ? 'Connected' : 'Disconnected'}</p>
        )}
      </div>

      <div className="network-switcher">
        <h3>Switch Network</h3>
        <div className="network-buttons">
          {supportedNetworks.map((net) => (
            <button
              key={net.chainId}
              onClick={() => handleNetworkSwitch(net.chainId)}
              className={`network-btn ${chainId === net.chainId ? 'active' : ''}`}
              disabled={chainId === net.chainId}
            >
              {net.name}
            </button>
          ))}
        </div>
      </div>

      <div className="network-info">
        <h3>Supported Networks</h3>
        <ul>
          {supportedNetworks.map((net) => (
            <li key={net.chainId}>
              <strong>{net.name}</strong> (Chain ID: {net.chainId})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NetworkConfiguration; 