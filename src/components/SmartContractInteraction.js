import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite, useAddress } from '@thirdweb-dev/react';

const SmartContractInteraction = () => {
  const address = useAddress();
  const [contractAddress, setContractAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const { contract: tokenContract } = useContract(contractAddress);
  const { data: tokenName } = useContractRead(tokenContract, "name");
  const { data: tokenBalance } = useContractRead(tokenContract, "balanceOf", [address]);
  const { mutateAsync: transferToken } = useContractWrite(tokenContract, "transfer");

  const handleTransferToken = async () => {
    if (!recipient || !amount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await transferToken({
        args: [recipient, amount],
      });
      alert('Token transfer initiated!');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed: ' + error.message);
    }
  };

  return (
    <div className="smart-contract-interaction">
      <h2>Smart Contract Interaction</h2>
      
      <div className="contract-input">
        <h3>Contract Address</h3>
        <input
          type="text"
          placeholder="Enter contract address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="contract-address-input"
        />
      </div>

      {contractAddress && (
        <div className="contract-section">
          <h3>Token Contract</h3>
          <div className="contract-info">
            <p><strong>Name:</strong> {tokenName || 'Loading...'}</p>
            <p><strong>Your Balance:</strong> {tokenBalance ? tokenBalance.toString() : 'Loading...'}</p>
          </div>

          <div className="token-operations">
            <h4>Token Operations</h4>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransferToken} className="transfer-btn">
              Transfer Tokens
            </button>
          </div>
        </div>
      )}

      {!address && (
        <div className="connect-prompt">
          <p>Please connect your wallet to interact with smart contracts</p>
        </div>
      )}
    </div>
  );
};

export default SmartContractInteraction; 