// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "contracts/Counters.sol";

contract Voting {
    using Counters for Counters.Counter;
    Counters.Counter private totalPolls;
    Counters.Counter private totalContestants;

    struct PollStruct {
        uint id;
        string image;
        string title;
        string description;
        uint votes;
        uint contestants;
        bool deleted;
        address director;
        string startsAt;
        string endsAt;
        address[] voters;
        string[] avatars;
    }

    struct ContestantStruct {
        uint id;
        string image;
        string name;
        address voter;
        uint votes;
        address[] voters;
    }

    mapping(uint => bool) pollExist;
    mapping(uint => PollStruct) polls;
    mapping(uint => mapping(address => bool)) voted;
    mapping(uint => mapping(address => bool)) contested;
    mapping(uint => mapping(uint => ContestantStruct)) contestants;

    event Voted(address indexed voter);

    function createPoll(
        string memory image,
        string memory title,
        string memory description,
        string memory startsAt,
        string memory endsAt
    ) public {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(image).length > 0, "Image URL cannot be empty");
        require(bytes(startsAt).length > 0, "Start date cannot be empty");
        require(bytes(endsAt).length > 0, "End date cannot be empty");

        totalPolls.increment();

        PollStruct memory poll;
        poll.id = totalPolls.current();
        poll.title = title;
        poll.description = description;
        poll.image = image;
        poll.startsAt = startsAt;
        poll.endsAt = endsAt;
        poll.director = msg.sender;

        polls[poll.id] = poll;
        pollExist[poll.id] = true;
    }

    function updatePoll(
        uint id,
        string memory image,
        string memory title,
        string memory description,
        string memory startsAt,
        string memory endsAt
    ) public {
        require(pollExist[id], "Poll not found");
        require(polls[id].director == msg.sender, "Unauthorized entity");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(image).length > 0, "Image URL cannot be empty");
        require(!polls[id].deleted, "Polling already deleted");
        require(polls[id].votes < 1, "Poll has votes already");

        polls[id].title = title;
        polls[id].description = description;
        polls[id].startsAt = startsAt;
        polls[id].endsAt = endsAt;
        polls[id].image = image;
    }

    function deletePoll(uint id) public {
        require(pollExist[id], "Poll not found");
        require(polls[id].director == msg.sender, "Unauthorized entity");
        require(polls[id].votes < 1, "Poll has votes already");
        polls[id].deleted = true;
    }

    function getPoll(uint id) public view returns (PollStruct memory) {
        return polls[id];
    }

    function getPolls() public view returns (PollStruct[] memory Polls) {
        uint available;
        for (uint i = 1; i <= totalPolls.current(); i++) {
            if (!polls[i].deleted) available++;
        }

        Polls = new PollStruct[](available);
        uint index;

        for (uint i = 1; i <= totalPolls.current(); i++) {
            if (!polls[i].deleted) {
                Polls[index++] = polls[i];
            }
        }
    }

    function contest(uint id, string memory name, string memory image) public {
        require(pollExist[id], "Poll not found");
        require(bytes(name).length > 0, "name cannot be empty");
        require(bytes(image).length > 0, "image cannot be empty");
        require(polls[id].votes < 1, "Poll has votes already");
        require(!contested[id][msg.sender], "Already contested");

        totalContestants.increment();

        ContestantStruct memory contestant;
        contestant.name = name;
        contestant.image = image;
        contestant.voter = msg.sender;
        contestant.id = totalContestants.current();

        contestants[id][contestant.id] = contestant;
        contested[id][msg.sender] = true;
        polls[id].avatars.push(image);
        polls[id].contestants++;
    }

    function getContestant(
        uint id,
        uint cid
    ) public view returns (ContestantStruct memory) {
        return contestants[id][cid];
    }

    function getContestants(
        uint id
    ) public view returns (ContestantStruct[] memory Contestants) {
        uint available;
        for (uint i = 1; i <= totalContestants.current(); i++) {
            if (contestants[id][i].id == i) available++;
        }

        Contestants = new ContestantStruct[](available);
        uint index;

        for (uint i = 1; i <= totalContestants.current(); i++) {
            if (contestants[id][i].id == i) {
                Contestants[index] = contestants[id][i];
                // Calculate and store the number of votes for the contestant
                uint votes = contestants[id][i].votes;
                Contestants[index].votes = votes;
                index++;
            }
        }
    }

    function vote(uint id, uint cid) public {
        require(pollExist[id], "Poll not found");
        require(!voted[id][msg.sender], "Already voted");
        require(!polls[id].deleted, "Polling not available");
        require(polls[id].contestants > 1, "Not enough contestants");

        polls[id].votes++;
        polls[id].voters.push(msg.sender);

        contestants[id][cid].votes++;
        contestants[id][cid].voters.push(msg.sender);
        voted[id][msg.sender] = true;

        emit Voted(msg.sender);
    }
}
