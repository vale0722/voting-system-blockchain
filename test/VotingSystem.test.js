const { expect } = require("chai");

describe("VotingSystem", function() {
  let VotingSystem, votingSystem, owner, addr1, addr2;

  beforeEach(async function() {
    VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy();

    [owner, addr1, addr2, _] = await ethers.getSigners();
  });


  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      expect(await votingSystem.owner()).to.equal(owner.address);
    });

    it("Should have zero proposals initially", async function() {
      expect(await votingSystem.getProposalsCount()).to.equal(0);
    });
  });

  describe("Proposals", function() {
    it("Should allow owner to add a proposal", async function() {
      await votingSystem.addProposal("Proposal 1");
      expect(await votingSystem.getProposalsCount()).to.equal(1);
    });

    it("Should not allow non-owner to add a proposal", async function() {
      await expect(votingSystem.connect(addr1).addProposal("Proposal 2")).to.be.revertedWith("Only the owner can execute this function");
    });
  });

  describe("Whitelist", function() {
    it("Should allow owner to add an address to whitelist", async function() {
      await votingSystem.addToWhitelist(addr1.address);
      expect(await votingSystem.whitelist(addr1.address)).to.equal(true);
    });

    it("Should allow owner to remove an address from whitelist", async function() {
      await votingSystem.addToWhitelist(addr1.address);
      await votingSystem.removeFromWhitelist(addr1.address);
      expect(await votingSystem.whitelist(addr1.address)).to.equal(false);
    });

    it("Should not allow non-owner to modify whitelist", async function() {
      await expect(votingSystem.connect(addr1).addToWhitelist(addr2.address)).to.be.revertedWith("Only the owner can execute this function");
    });
  });

  describe("Voting", function() {
    beforeEach(async function() {
      await votingSystem.addProposal("Proposal 1");
      await votingSystem.addToWhitelist(addr1.address);
    });

    it("Should allow whitelisted address to vote", async function() {
      await votingSystem.connect(addr1).vote(0);
      const proposal = await votingSystem.proposals(0);
      expect(proposal.votes).to.equal(1);
    });

    it("Should not allow non-whitelisted address to vote", async function() {
      await expect(votingSystem.connect(addr2).vote(0)).to.be.revertedWith("You are not whitelisted");
    });

    it("Should not allow an address to vote twice", async function() {
      await votingSystem.connect(addr1).vote(0);
      await expect(votingSystem.connect(addr1).vote(0)).to.be.revertedWith("You have already voted");
    });
  });
});
