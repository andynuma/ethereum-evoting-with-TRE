pragma solidity >0.4.99 <0.6.0;
pragma experimental ABIEncoderV2;

import "./Owned.sol";

contract Sample is Owned {
    address public inspectorAddress;
    address[] public voterAddressArray;
    string[] public ballots = ["test1","test2"];
    mapping(address => string) public votes;
    mapping(address => uint) public voteCount;
    bool public end = false;

    uint public value;

    //TODO:これを全ての関数にあとでつける
    modifier isVotingEnd(){
        require(end == false, "voting is end");
        _;
    }

    // set voter address
    function setVoterAddress(address _voterAddress) onlyOwner isVotingEnd public {
        //TODO:onlyOwner
        voterAddressArray.push(_voterAddress);
    }

    // set inspector address
    function setInspectorAddress(address _inspectorAddress) onlyOwner isVotingEnd public {
        //TODO:onlyOwner
        inspectorAddress = _inspectorAddress;
    }

    // create and send vote
    function setVote(string memory _vote) public isVotingEnd {
        // 二重投票防止とアドレス選定
        uint flag = 0;
        require(voteCount[msg.sender] == 0, "Double Voting.");
        for(uint i = 0; i < voterAddressArray.length; i++){
            if(msg.sender == voterAddressArray[i]){
                flag = 1;
            }
        }
        require(flag == 1, "Your address isn't valid.");
        votes[msg.sender] = _vote;
        voteCount[msg.sender] += 1;
        ballots.push(_vote);
    }

    function endVoting()  onlyOwner isVotingEnd public {
        //TODO: onlyOwnerをつけること
        end = true;
    }

    function getEndSign() public  returns(bool){
        return end;
    }

    function viewResult() public returns(string[] memory){
        //TODO:テスト省略のためにrequireを外しているので注意
        require(end == true, "Voting is not END.");
        uint array_length = ballots.length;
        string[] memory arrayMemory = new string[](array_length);
        arrayMemory = ballots;

        return arrayMemory;
    }

    function setValue(uint _value) public{
        value = _value;
    }

    function getValue() public returns(uint){
        return value;
    }
}
