// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Proposal {
        string name;
        uint votes;
    }

    address public owner;
    Proposal[] public proposals;
    mapping(address => bool) public whitelist;
    mapping(address => bool) public hasVoted;

    event ProposalAdded(string name, uint proposalId);
    event Voted(address indexed voter, uint proposalId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this function");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "You are not whitelisted");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProposal(string memory _name) public onlyOwner {
        proposals.push(Proposal({
            name: _name,
            votes: 0
        }));
        emit ProposalAdded(_name, proposals.length - 1);
    }

    function vote(uint _proposalId) public onlyWhitelisted hasNotVoted {
        require(_proposalId < proposals.length, "Invalid proposal");
        proposals[_proposalId].votes++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, _proposalId);
    }

    function addToWhitelist(address _address) public onlyOwner {
        whitelist[_address] = true;
    }

    function removeFromWhitelist(address _address) public onlyOwner {
        whitelist[_address] = false;
    }

    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }
}
