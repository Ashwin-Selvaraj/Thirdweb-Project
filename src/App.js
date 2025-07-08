import React, { useState } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import './App.css';

// Import all components
import WalletConnection from './components/WalletConnection';
import NetworkConfiguration from './components/NetworkConfiguration';
import SmartContractInteraction from './components/SmartContractInteraction';
import NFTGallery from './components/NFTGallery';
import TokenBalance from './components/TokenBalance';
import TransactionHistory from './components/TransactionHistory';
import ContractDeployment from './components/ContractDeployment';
import Utilities from './components/Utilities';

const App = () => {
  const [activeTab, setActiveTab] = useState('wallet');

  const tabs = [
    { id: 'wallet', name: 'Wallet Connection', component: WalletConnection },
    { id: 'network', name: 'Network Config', component: NetworkConfiguration },
    { id: 'contract', name: 'Smart Contracts', component: SmartContractInteraction },
    { id: 'nft', name: 'NFT Gallery', component: NFTGallery },
    { id: 'balance', name: 'Token Balance', component: TokenBalance },
    { id: 'history', name: 'Transaction History', component: TransactionHistory },
    { id: 'deploy', name: 'Contract Deployment', component: ContractDeployment },
    { id: 'utilities', name: 'Utilities', component: Utilities },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <ThirdwebProvider 
      activeChain="ethereum"
      clientId="your-client-id-here"
    >
      <div className="App">
        <header className="App-header">
          <h1>Thirdweb dApp Integration</h1>
          <p>Complete setup and working examples for integrating Thirdweb into your dApp</p>
        </header>

        <nav className="App-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        <main className="App-main">
          {ActiveComponent && <ActiveComponent />}
        </main>

        <footer className="App-footer">
          <p>Built with Thirdweb React SDK</p>
          <p>Complete dApp integration examples</p>
        </footer>
      </div>
    </ThirdwebProvider>
  );
};

export default App;
