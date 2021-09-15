//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./IKittyMarketplace.sol";

contract Marketplace is IKittyMarketPlace {
    
    
    struct Offer {
        address payable seller; 
        uint256 price; 
        uint256 index; 
        uint256 tokenId;
        bool active;
    }
    
    uint indexCount;
    uint256[] tokensOnSale;
    Offer[] Offers;
    mapping (uint256 => Offer) public  tokenIdToOffer;
        
    KittyContract addr;
    function setKittyContract(address _kittyContractAddress) override external{
         addr =  KittyContract(_kittyContractAddress);
    }

    constructor() {
        //addr = KittyContract(0x8D8754102Bc936c2B5B17A6d176cd51563E1949D);
    }
    
    function balanceFromMarket() public view returns(uint256) {
        return addr.balanceOf(msg.sender);
    }
    
    function totalSupplyFromMarket() public view returns(uint256){
        return addr.totalSupply();
    }
    
    function setOffer(uint256 _price, uint256 _tokenId) override external {
         require(addr.ownerOf(_tokenId)== msg.sender,'Only the owner of _tokenId can create an offer' );
         require(tokenIdToOffer[_tokenId].active ==false, 'There can only be one active offer for a token at a time');
        Offer memory _Offer = Offer ({ // Creates a new offer for _tokenId for the price _price
            seller: payable(msg.sender),
            price: _price,
            index: indexCount++,
            tokenId: _tokenId,
            active: true
        });
        tokenIdToOffer[_tokenId] = _Offer;
        Offers.push(_Offer);
        tokensOnSale.push(_Offer.tokenId);
        addr.approve(address(this), _tokenId, msg.sender); //Marketplace contract (this) needs to be an approved operator when the offer is created
        emit MarketTransaction("Create offer", msg.sender, _tokenId); //Emits the MarketTransaction event with txType "Create offer"
    }
    
    function removeOffer(uint256 _tokenId) external override {
        require(addr.ownerOf(_tokenId)== msg.sender, "Only the seller of _tokenId can remove an offer");//  Only the seller of _tokenId can remove an offer.
        _removeOffer(_tokenId); // Removes an existing offer on the arrays
        _removeOffer2(_tokenId);// Removes an existing offer on the map 
        emit MarketTransaction("Remove offer", msg.sender, _tokenId); //Emits the MarketTransaction event with txType "Remove offer"
    }

    function _removeOffer(uint256 _tokenId) internal  returns(uint n) {
        uint i;
        uint j;
        if (tokensOnSale.length-1 == 0){ // if only has one value on tokensOnSale
            tokensOnSale.pop();
            Offers.pop();
            return 0;
        }
        while (i<= tokensOnSale.length){
            if (tokensOnSale[i] == _tokenId){
                if (i== tokensOnSale.length-1){// if you have two elements and you  want to remove the second
                     tokensOnSale.pop();
                     Offers.pop();
                    return 0;
                    }
                tokensOnSale[i] = tokensOnSale[i+1];
                Offers[i]= Offers[i+1];
                j= 1;
            }
            else{
                if (i== tokensOnSale.length-1){
                     tokensOnSale.pop();
                     Offers.pop();
                    return 0;
                }
                tokensOnSale[i] = tokensOnSale[i+j]; 
                Offers[i]= Offers[i+j];
            }
            i++;
        }
    }
    
    function _removeOffer2(uint256 _tokenId) internal {
      Offer memory _Offer = Offer ({ 
            seller: payable(0x0000000000000000000000000000000000000000),
            price: 0,
            index: 0,
            tokenId: 0,
            active: false
         });
         tokenIdToOffer[_tokenId] = _Offer;  
    }

    function getOffer(uint256 _tokenId) external override view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        //Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
        require (tokenIdToOffer[_tokenId].active == true, "there is no active offer for _tokenId");
        return (tokenIdToOffer[_tokenId].seller, tokenIdToOffer[_tokenId].price, tokenIdToOffer[_tokenId].index,
                tokenIdToOffer[_tokenId].tokenId, tokenIdToOffer[_tokenId].active);
    }
    
    function getAllTokenOnSale() external override  view  returns(uint256[] memory listOfOffers){
        // Get all tokenId's that are currently for sale. Returns an empty arror if none exist.
            return tokensOnSale;
    }
    
    function buyKitty(uint256 _tokenId) external override payable {
        require(tokenIdToOffer[_tokenId].active ==true, "There must be an active offer for _tokenId");  
        require (tokenIdToOffer[_tokenId].price <= msg.value, "The msg.value needs to equal the price of _tokenId"); 
        require(addr.ownerOf(_tokenId)!= msg.sender,"The Owner can't buy their kitties");
        uint transferValue = msg.value;
        tokenIdToOffer[_tokenId].seller.transfer(transferValue);//Sends the funds to the seller
        addr.transferFrom(tokenIdToOffer[_tokenId].seller, msg.sender, _tokenId); //transfers the token using transferFrom in Kittycontract.
        _removeOffer(_tokenId); // Removes offer on the arrays
        _removeOffer2(_tokenId);// Removes  offer on the map
        emit MarketTransaction("Buy", msg.sender, _tokenId); //Emits the MarketTransaction event with txType "Buy".
    }
    
}    

