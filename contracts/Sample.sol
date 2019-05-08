pragma solidity >0.4.0 <0.6.0;
import "./Owned.sol";

contract Sample is Owned {
    address public inspectorAddress;
    address[] public voterAddressArray;
    mapping(address => string) public votes;
    bool public end = false;

    uint public value;

    // set voter address
    function setVoterAddress(address _voterAddress) public {
        voterAddressArray.push(_voterAddress);
    }

    // set inspector address
    function setInspectorAddress(address _inspectorAddress) public onlyOwner {
        inspectorAddress = _inspectorAddress;
    }

    // create and send vote
    function setVote(string memory _vote) public {
        // voteAddressのなかにmsg.senderが含まれるかの判定
        for(uint i = 0; i < voterAddressArray.length; i++){
            if(msg.sender == voterAddressArray[i]){
                votes[msg.sender] = _vote;
            }
        }
    }

    // sign by organizer
    // sign by inspector
    // view result
    function viewResult() public returns(string memory){
        return "result";
    }

    // function setTimer(bool _end) public onlyOwner{
    //     end = _end;
    // }

}