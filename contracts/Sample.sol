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

    // struct BallotResult {
    //     address voterAddress;
    //     string v;
    // }

    // BallotResult[] public BallotResults;

    function concat(bytes memory a, bytes memory b) internal pure returns (bytes memory) {
        return abi.encodePacked(a, b);
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

    // 文字列連結
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

    // byteを文字列に変換
    function toString(address x) public returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

    function toBytes(address a) public returns (bytes memory ) {
        // assembly {
        //     let m := mload(0x40)
        //     a := and(a, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF)
        //     mstore(add(m, 20), xor(0x140000000000000000000000000000000000000000, a))
        //     mstore(0x40, add(m, 52))
        //     b := m
        // }
        return abi.encodePacked(a);
    }


    function bytes32ToString(bytes32 x) public returns (string memory) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint i = 0; i < charCount; i++) {
            bytesStringTrimmed[i] = bytesString[i];
        }
        return string(bytesStringTrimmed);
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
        // bytes memory addr_temp = toBytes(msg.sender);

        string memory addr = toString(msg.sender);
        string memory res = strConnect(_vote, addr);
        ballots.push(res);
        // ballots.push(_vote);
        // BallotResults.push(BallotResult(msg.sender, _vote));
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
        require(end == true, "Voting is not END.");
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
}
