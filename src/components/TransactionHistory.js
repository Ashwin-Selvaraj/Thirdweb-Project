import React, { useState, useEffect } from 'react';
import { useAddress, useContractEvents } from '@thirdweb-dev/react';

const TransactionHistory = () => {
  const address = useAddress();
  const [contractAddress, setContractAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: events } = useContractEvents(contractAddress, "Transfer");

  useEffect(() => {
    if (events && address) {
      const userTransactions = events.filter(event => 
        event.data.from === address || event.data.to === address
      );
      setTransactions(userTransactions);
    }
  }, [events, address]);

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getTransactionType = (from, to) => {
    if (from === address) return 'Sent';
    if (to === address) return 'Received';
    return 'Transfer';
  };

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      
      {address ? (
        <>
          <div className="contract-input">
            <h3>Contract Address (Optional)</h3>
            <input
              type="text"
              placeholder="Enter contract address to filter events"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="contract-address-input"
            />
            <p className="input-help">
              Leave empty to view all transactions, or enter a contract address to filter by specific token/NFT
            </p>
          </div>

          <div className="transaction-filters">
            <h3>Filters</h3>
            <div className="filter-options">
              <label>
                <input type="checkbox" defaultChecked /> Show Sent
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Show Received
              </label>
            </div>
          </div>

          <div className="transactions-list">
            <h3>Recent Transactions</h3>
            
            {loading ? (
              <p>Loading transactions...</p>
            ) : transactions.length > 0 ? (
              <div className="transactions-grid">
                {transactions.map((tx, index) => (
                  <div key={index} className="transaction-card">
                    <div className="transaction-header">
                      <span className={`transaction-type ${getTransactionType(tx.data.from, tx.data.to).toLowerCase()}`}>
                        {getTransactionType(tx.data.from, tx.data.to)}
                      </span>
                      <span className="transaction-time">
                        {formatTimestamp(tx.block.timestamp)}
                      </span>
                    </div>
                    
                    <div className="transaction-details">
                      <p><strong>From:</strong> {formatAddress(tx.data.from)}</p>
                      <p><strong>To:</strong> {formatAddress(tx.data.to)}</p>
                      <p><strong>Value:</strong> {tx.data.value || tx.data.tokenId || 'N/A'}</p>
                      <p><strong>Transaction Hash:</strong> {formatAddress(tx.transaction.transactionHash)}</p>
                      <p><strong>Block:</strong> {tx.block.number}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-transactions">
                <p>No transactions found</p>
                {contractAddress && (
                  <p>Try removing the contract address filter or check if the address is correct</p>
                )}
              </div>
            )}
          </div>

          <div className="transaction-stats">
            <h3>Transaction Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Transactions:</span>
                <span className="stat-value">{transactions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Sent:</span>
                <span className="stat-value">
                  {transactions.filter(tx => tx.data.from === address).length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Received:</span>
                <span className="stat-value">
                  {transactions.filter(tx => tx.data.to === address).length}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="connect-prompt">
          <p>Please connect your wallet to view transaction history</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory; 