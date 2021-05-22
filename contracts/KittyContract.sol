//SPDX-License-Identifier: MIT
//pragma solidity >=0.4.22 <0.9.0
pragma solidity ^0.8.4;
import "./IERC721.sol";
//import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract kittyContract is IERC721 {
    using SafeMath for uint256;

    constructor(){ // assign the first kitty to the person who deploy the contract 
        ownershipTokenCount[msg.sender] ++;
        ownershipTokenID[1] = msg.sender;
        uint256 firstDNA = 1111;
        Kitty memory _kitty = Kitty({
            DNA: firstDNA
            });
        kitties.push(_kitty);
    }

    mapping (address => uint256) private ownershipTokenCount;
    mapping (uint256 => address) private ownershipTokenID;

    string  constant  tName = 'Kitty Token';
    string  constant tSymbol = 'KTC';

    struct Kitty {
        uint256 DNA;// DNA frontend
    }
    Kitty[] kitties;

    function balanceOf(address owner) external view override returns (uint256 balance){
        return ownershipTokenCount[owner];
    }

    function totalSupply() external view override returns (uint256 total) {
        return kitties.length;
    }

    function name() external view override returns (string memory tokenName) {
        return tName;
    }

    function symbol() external view override returns (string memory tokenSymbol) {
        return tSymbol;
    }

    function ownerOf(uint256 tokenId) external view override returns (address owner) {
        return ownershipTokenID[tokenId];
    }

    function transfer(address to, uint256 tokenId) external override  payable {
        require(to != address(0)); //`to` cannot be the zero address.
        require(to != address(this)); // to` can not be the contract address.
        require(owns(msg.sender, tokenId));    // tokenId` token must be owned by `msg.sender`
        ownershipTokenCount[msg.sender] -= 1;
        ownershipTokenID[tokenId] = to;
        ownershipTokenCount[to] += 1;
        emit Transfer(msg.sender, to, tokenId); // Emits a {Transfer} event.
    }

    function owns(address claimant, uint256 tokenId) internal view returns (bool) {
      return ownershipTokenID[tokenId] == claimant;
    }

}