// pragma solidity ^0.4.4;
pragma solidity >0.4.99 <0.6.0;
pragma experimental ABIEncoderV2;

import "./Owned.sol";

contract Sample is Owned {
    address public inspectorAddress;
    address[] public voterAddressArray;
    string[] public ballots;
    mapping(address => string) public votes;
    mapping(address => uint) public voteCount;
    bool public end = false;

    // TEST
    uint public value;
    string public testWord;
    string[] public testArray=["test"];

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
        // uint flag = 0;
        //TODO:テスト用に変えているので注意
        // require(voteCount[msg.sender] == 0, "Double Voting.");
        // for(uint i = 0; i < voterAddressArray.length; i++){
        //     if(msg.sender == voterAddressArray[i]){
        //         flag = 1;
        //     }
        // }
        // require(flag == 1, "Your address isn't valid.");
        votes[msg.sender] = _vote;
        voteCount[msg.sender] += 1;
        string memory space = " : 0x";
        string memory vote = strConnect(_vote, space);

        string memory res = strConnect(vote,toAsciiString(msg.sender));
        ballots.push(res);
    }

    function endVoting()  onlyOwner isVotingEnd public {
        //TODO: onlyOwnerをつけること
        end = true;
    }

    function getEndSign() public returns(bool){
        return end;
    }

    function viewResult() public  returns(string[] memory){
        //TODO:テスト省略のためにrequireを外しているので注意
        // require(end == true, "Voting is not END.");
        //TODO:投票した人しか実行できないようにした
        //TODO:ここでエラーとなる
        // require(voteCount[msg.sender] == 1, "You should vote.");
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

    // function getBallotResults(uint _index) public returns(address, uint){
    //     return (BallotResults)
    // }
    function testSetWord(string memory _word) public {
        //TODO:
        string memory space = ":";
        string memory word = strConnect(_word, space);
        string memory res = strConnect(word, toAsciiString(msg.sender));
        testArray.push(res);
    }

    function testGetArray() public view returns(string[] memory)  {
        return testArray;
    }

    function toAsciiString(address  x) public returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(s);
    }

    function char(byte b) public returns (byte c) {
        if (uint8(b) < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }

    function strConnect(string memory _a, string memory _b) public  returns(string memory){

        string memory str1 = _a;
        string memory str2 = _b;
        bytes memory strbyte1 = bytes(str1);
        bytes memory strbyte2 = bytes(str2);

        bytes memory str = new bytes(strbyte1.length + strbyte2.length);

        uint8 point = 0;

        for(uint8 j = 0; j < strbyte1.length;j++){
            str[point] = strbyte1[j];
            point++;
        }
        for(uint8 k = 0; k < strbyte2.length;k++){
            str[point] = strbyte2[k];
            point++;
        }
        return string(str);
    }

}
