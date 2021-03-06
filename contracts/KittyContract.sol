//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/Pausable.sol";


contract KittyContract is IERC721,Ownable, Pausable {
    using SafeMath for uint256;
    
    event Birth(
        address owner, 
        uint256 kittenId, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 genes
    );
 
    mapping (address => uint256) private ownershipTokenCount;
    mapping (uint256 => address) private ownershipTokenID;
    mapping (uint256 => address) private kittyIndexToApproved;
    mapping (address => mapping(address => bool)) private _operatorApprovals; 

    
    string  constant  private tName = 'Carlos Kitty Token';
    string  constant private tSymbol = 'CKT';
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")); // from IERC721 interface

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    Kitty[] kitties;
    
    function close() onlyOwner public {
        address closeOwner = owner();
        selfdestruct(payable(closeOwner)); 
    }

    function pause() external  onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external   onlyOwner whenPaused {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId) external pure override  returns(bool){ // FOR ERC765
        return interfaceId == type(IERC165).interfaceId;
    }

    function breed(uint256 _dadId, uint256 _mumId) public whenNotPaused  {
        require(_dadId < kitties.length &&_mumId < kitties.length);
        require(ownershipTokenID[_dadId]==  msg.sender && ownershipTokenID[_mumId]== msg.sender); // check ownership 
        uint256 dadDna = kitties[_dadId].genes; // you got the DNA 
        uint256 mumDna = kitties[_mumId].genes;
        uint256 newGen;  // figure out the generation
        if(kitties[_dadId].generation >= kitties[_mumId].generation){
            newGen = kitties[_dadId].generation + 1;
        }
        else 
        {
            newGen = kitties[_mumId].generation + 1;
        }
        uint256 newDna= _mixDna(dadDna, mumDna);
        _createKitty(_mumId, _dadId, newGen,newDna, msg.sender); // create a new cat with te new properties, give it to the msg.sender   
    }

    function balanceOf(address owner) external view override whenNotPaused returns (uint256 balance){
        return ownershipTokenCount[owner];
    }

    function totalSupply() external view whenNotPaused returns (uint256 total) {
        return kitties.length;
    }

    function name() external pure  returns (string memory tokenName) {
        return tName;
    }

    function symbol() external pure  returns (string memory tokenSymbol) {
        return tSymbol;
    }

    function ownerOf(uint256 tokenId) external view override whenNotPaused returns (address owner) {
        return ownershipTokenID[tokenId];
    }

    function transfer(address to, uint256 tokenId) external  payable whenNotPaused {
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
            delete kittyIndexToApproved[_tokenId];
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

    function createKittyGen0(uint256 genes)  public payable whenNotPaused returns (uint256) { // anyone can create generation 0 kitty 
        return _createKitty(0, 0, 0, genes, msg.sender);
    }

    function getKitty(uint256 kittyId) public view whenNotPaused returns(uint256, uint64, uint32, uint32, uint16){
             return (kitties[kittyId].genes, kitties[kittyId].birthTime, kitties[kittyId].mumId,
             kitties[kittyId].dadId, kitties[kittyId].generation); 
    }

    function approve(address _approved, uint256 _tokenId) external override whenNotPaused{
        require(_owns(msg.sender, _tokenId),"msg.sender is not the owner");
        kittyIndexToApproved[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId, address from) external whenNotPaused {
        require(_owns(from, _tokenId),"msg.sender is not the owner");
        kittyIndexToApproved[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
    
    function getApproved(uint256 _tokenId) external view override whenNotPaused  returns (address) {
        require(ownershipTokenID[_tokenId]== msg.sender, "You are not the owner of the tokenId");
        require(_tokenId < kitties.length, "the tokenID does not exist");    
        return kittyIndexToApproved[_tokenId];
    }
    
    function setApprovalForAll(address _operator, bool _approved) external override whenNotPaused {
        require(_operator != msg.sender);
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator,_approved);
    }
    
    function isApprovedForAll(address _owner, address _operator) external view override whenNotPaused returns (bool) {
         return _operatorApprovals[_owner][_operator];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external override whenNotPaused {
        require(_to != address(0)); 
        //require(_to != address(this)); 
        require(_owns(msg.sender, _tokenId) || kittyIndexToApproved[_tokenId] == msg.sender || _operatorApprovals[_from][msg.sender] == true);
        //Throws unless `msg.sender` is the current owner or is the approved address for this NFT or  is an authorized operator
        require(_owns(_from, _tokenId)); //Throws if `_from` is not the current owner
        require(_tokenId < kitties.length, "the tokenID does not exist"); 
        _transfer(_from,  _to,  _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external override whenNotPaused{
        require(_owns(msg.sender, _tokenId) || kittyIndexToApproved[_tokenId] == msg.sender || _operatorApprovals[_from][msg.sender] == true);
        require(_owns(_from, _tokenId));
        require(_to != address(0));
        require(_tokenId < kitties.length, "the tokenID does not exist");
        _SafeTransferFrom(_from, _to, _tokenId, data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external override whenNotPaused{
        require(_owns(msg.sender, _tokenId) || kittyIndexToApproved[_tokenId] == msg.sender || _operatorApprovals[_from][msg.sender] == true);
        require(_owns(_from, _tokenId));
        require(_to != address(0));
        require(_tokenId < kitties.length, "the tokenID does not exist");
        _SafeTransferFrom(_from, _to, _tokenId, '0');
    }

    function _SafeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns(bool){
        if(!_isContract(_to)){ // if the address is not a contract is easy otherwise you need to know if this contract can manipulate ERC721 tokens
            return true;    
        }
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data); // call onERC721Received() function(in ERC721 you must include this function) on IERC721Receiver contract
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function _isContract(address _to) internal view returns (bool){
        uint32 size; 
        assembly { // only to talk directly.  machine code 
            size := extcodesize(_to) // gets the size 
        }
        return size > 0; // for a contract must be > 0 
    }

    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal pure returns (uint256){
        uint256 mod= 10000000000000000;
        uint256 div= 100000000000000;
        uint256 newDna= 0;
        uint i;

        for (i=1; i<=8; i++){
            if(i%2==0) {// _dadDna wins 
            newDna = (newDna*100)+((_dadDna%mod)/div);
            }
            else { // _mumDna wins
            newDna = (newDna*100)+((_mumDna%mod)/div);
            }
            mod = mod/100;
            div = div/100;
        }
        return newDna;
    }
        
}   
