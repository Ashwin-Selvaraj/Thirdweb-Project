import React from 'react';
import { ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';

const WalletConnection = () => {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <div className="wallet-connection">
      <h2>Wallet Connection</h2>
      
      {!address ? (
        <div className="connect-section">
          <p>Connect your wallet to get started</p>
          <ConnectWallet 
            theme="dark"
            btnTitle="Connect Wallet"
            modalSize="wide"
            welcomeScreen={{
              title: "Welcome to Thirdweb dApp",
              subtitle: "Connect your wallet to start using the application"
            }}
            modalTitle="Connect Wallet"
            termsOfServiceUrl="https://your-terms.com"
            privacyPolicyUrl="https://your-privacy.com"
          />
        </div>
      ) : (
        <div className="connected-section">
          <h3>Connected Wallet</h3>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Short Address:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <button 
            onClick={disconnect}
            className="disconnect-btn"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection; 