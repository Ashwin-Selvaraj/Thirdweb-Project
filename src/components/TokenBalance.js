import React, { useState } from 'react';
import { useContract, useContractRead, useAddress, useBalance } from '@thirdweb-dev/react';

const TokenBalance = () => {
  const address = useAddress();
  const [contractAddress, setContractAddress] = useState('');
  
  const { data: nativeBalance } = useBalance();
  const { contract: tokenContract } = useContract(contractAddress);
  const { data: tokenName } = useContractRead(tokenContract, "name");
  const { data: tokenSymbol } = useContractRead(tokenContract, "symbol");
  const { data: tokenDecimals } = useContractRead(tokenContract, "decimals");
  const { data: tokenBalance } = useContractRead(tokenContract, "balanceOf", [address]);

  const formatBalance = (balance, decimals = 18) => {
    if (!balance) return '0';
    const formatted = balance / Math.pow(10, decimals);
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    });
  };

  return (
    <div className="token-balance">
      <h2>Token Balances</h2>
      
      {address ? (
        <>
          <div className="native-balance">
            <h3>Native Token Balance</h3>
            <div className="balance-card">
              <p><strong>Network:</strong> {nativeBalance?.chain?.name || 'Unknown'}</p>
              <p><strong>Symbol:</strong> {nativeBalance?.symbol || 'ETH'}</p>
              <p><strong>Balance:</strong> {formatBalance(nativeBalance?.value)} {nativeBalance?.symbol}</p>
              <p><strong>Formatted:</strong> {nativeBalance?.displayValue} {nativeBalance?.symbol}</p>
            </div>
          </div>

          <div className="token-balance-section">
            <h3>Custom Token Balance</h3>
            <div className="contract-input">
              <input
                type="text"
                placeholder="Enter token contract address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="contract-address-input"
              />
            </div>

            {contractAddress && (
              <div className="balance-card">
                <p><strong>Token Name:</strong> {tokenName || 'Loading...'}</p>
                <p><strong>Token Symbol:</strong> {tokenSymbol || 'Loading...'}</p>
                <p><strong>Decimals:</strong> {tokenDecimals ? tokenDecimals.toString() : 'Loading...'}</p>
                <p><strong>Balance:</strong> {tokenBalance ? formatBalance(tokenBalance, tokenDecimals) : 'Loading...'} {tokenSymbol}</p>
                <p><strong>Raw Balance:</strong> {tokenBalance ? tokenBalance.toString() : 'Loading...'}</p>
              </div>
            )}
          </div>

          <div className="balance-summary">
            <h3>Balance Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Native Token:</span>
                <span className="value">{formatBalance(nativeBalance?.value)} {nativeBalance?.symbol}</span>
              </div>
              {contractAddress && tokenBalance && (
                <div className="summary-item">
                  <span className="label">{tokenSymbol}:</span>
                  <span className="value">{formatBalance(tokenBalance, tokenDecimals)} {tokenSymbol}</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="connect-prompt">
          <p>Please connect your wallet to view token balances</p>
        </div>
      )}
    </div>
  );
};

export default TokenBalance; 