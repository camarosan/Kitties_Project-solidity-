//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./IERC721.sol";
import "./Ownable.sol";
//import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract KittyContract is IERC721,Ownable {
    using SafeMath for uint256;

    event Birth(
        address owner, 
        uint256 kittenId, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 genes
    );
    mapping (uint256 => uint256[]) private catFullGenes;
    mapping (address => uint256) private ownershipTokenCount;
    mapping (uint256 => address) private ownershipTokenID;

    string  constant  private tName = 'Carlos Kitty Token';
    string  constant private tSymbol = 'CKT';

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    Kitty[] kitties;

    function close() public onlyOwner { 
        selfdestruct(owner);  
    }

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
        require(_owns(msg.sender, tokenId));    // tokenId` token must be owned by `msg.sender`
        _transfer(msg.sender, to, tokenId);
        emit Transfer(msg.sender, to, tokenId); // Emits a {Transfer} event.
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;
        ownershipTokenID[_tokenId] = _to;       
        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
        }
        emit Transfer(_from, _to, _tokenId);
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
      return ownershipTokenID[_tokenId] == _claimant;
    }

    function _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });
        kitties.push(_kitty);
        uint256 newKittenId = kitties.length - 1;
        emit Birth(_owner, newKittenId, _mumId, _dadId, _genes);
        _transfer(address(0), _owner, newKittenId);
        return newKittenId;
    }

    function createKittyGen0(uint256 genes) onlyOwner  public payable returns (uint256) { 
        return _createKitty(0, 0, 0, genes, msg.sender);
    }

    function getKitty(uint256 kittyId) public view returns(uint256, uint64, uint32, uint32, uint16){
             return (kitties[kittyId].genes, kitties[kittyId].birthTime, kitties[kittyId].mumId,
             kitties[kittyId].dadId, kitties[kittyId].generation); 
    }
}
