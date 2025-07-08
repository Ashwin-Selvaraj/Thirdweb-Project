import React, { useState, useEffect } from 'react';
import { useContract, useContractRead, useContractWrite, useAddress, useNFTs } from '@thirdweb-dev/react';

const NFTGallery = () => {
  const address = useAddress();
  const [contractAddress, setContractAddress] = useState('');
  const [mintTo, setMintTo] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const { contract: nftContract } = useContract(contractAddress);
  const { data: nfts, isLoading: nftsLoading } = useNFTs(nftContract);
  const { data: nftName } = useContractRead(nftContract, "name");
  const { data: nftSymbol } = useContractRead(nftContract, "symbol");
  const { data: totalSupply } = useContractRead(nftContract, "totalSupply");
  
  const { mutateAsync: mintNFT } = useContractWrite(nftContract, "mintTo");

  const handleMintNFT = async () => {
    if (!mintTo || !tokenURI) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await mintNFT({
        args: [mintTo, tokenURI],
      });
      alert('NFT minting initiated!');
      setMintTo('');
      setTokenURI('');
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed: ' + error.message);
    }
  };

  return (
    <div className="nft-gallery">
      <h2>NFT Gallery</h2>
      
      <div className="contract-input">
        <h3>NFT Contract Address</h3>
        <input
          type="text"
          placeholder="Enter NFT contract address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="contract-address-input"
        />
      </div>

      {contractAddress && (
        <>
          <div className="contract-info">
            <h3>Contract Information</h3>
            <p><strong>Name:</strong> {nftName || 'Loading...'}</p>
            <p><strong>Symbol:</strong> {nftSymbol || 'Loading...'}</p>
            <p><strong>Total Supply:</strong> {totalSupply ? totalSupply.toString() : 'Loading...'}</p>
          </div>

          <div className="mint-section">
            <h3>Mint New NFT</h3>
            <input
              type="text"
              placeholder="Recipient Address"
              value={mintTo}
              onChange={(e) => setMintTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Token URI (metadata URL)"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <button onClick={handleMintNFT} className="mint-btn">
              Mint NFT
            </button>
          </div>

          <div className="nft-collection">
            <h3>NFT Collection</h3>
            {nftsLoading ? (
              <p>Loading NFTs...</p>
            ) : nfts && nfts.length > 0 ? (
              <div className="nft-grid">
                {nfts.map((nft) => (
                  <div key={nft.metadata.id} className="nft-card">
                    <img 
                      src={nft.metadata.image} 
                      alt={nft.metadata.name}
                      className="nft-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                    <div className="nft-info">
                      <h4>{nft.metadata.name}</h4>
                      <p><strong>Token ID:</strong> {nft.metadata.id}</p>
                      <p><strong>Owner:</strong> {nft.owner}</p>
                      {nft.metadata.description && (
                        <p><strong>Description:</strong> {nft.metadata.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No NFTs found in this collection</p>
            )}
          </div>
        </>
      )}

      {!address && (
        <div className="connect-prompt">
          <p>Please connect your wallet to view and mint NFTs</p>
        </div>
      )}
    </div>
  );
};

export default NFTGallery; 