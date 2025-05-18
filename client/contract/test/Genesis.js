const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Genesis Contract", function () {
  let genesis;
  let owner;
  let addr1;
  let addr2;
  let projectTax = 5; // Example tax rate

  beforeEach(async function () {
    // Deploy the Genesis contract before each test
    [owner, addr1, addr2] = await ethers.getSigners();

    const Genesis = await ethers.getContractFactory("Genesis");
    genesis = await Genesis.deploy(projectTax);
    await genesis.deployed();
  });

  // Test case for creating a project
  it("Should allow creating a project", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await expect(genesis.createProject(title, description, cost))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT CREATED", owner.address, anyValue);

    const project = await genesis.getProjects();
    expect(project[0].title).to.equal(title);
    expect(project[0].description).to.equal(description);
    expect(project[0].cost).to.equal(cost);
  });

  // Test case for updating a project
  it("Should allow updating a project", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await genesis.createProject(title, description, cost);

    const newTitle = "Updated Test Project";
    const newDescription = "This is the updated description";

    await expect(genesis.updateProject(0, newTitle, newDescription))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT UPDATED", owner.address, anyValue);

    const project = await genesis.getProjects();
    expect(project[0].title).to.equal(newTitle);
    expect(project[0].description).to.equal(newDescription);
  });

  // Test case for deleting a project
  it("Should allow deleting a project", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await genesis.createProject(title, description, cost);

    await expect(genesis.deleteProject(0))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT DELETED", owner.address, anyValue);

    const project = await genesis.getProjects();
    expect(project[0].status).to.equal(4); // DELETED
  });

  // Test case for backing a project
  it("Should allow backing a project", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await genesis.createProject(title, description, cost);

    await expect(genesis.connect(addr1).backProject(0, { value: cost }))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT BACKED", addr1.address, anyValue);

    const project = await genesis.getProjects();
    expect(project[0].raised).to.equal(cost);
    expect(project[0].backer).to.equal(1);
  });

  // Test case for requesting a refund
  it("Should refund backers if project is reverted", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await genesis.createProject(title, description, cost);

    await genesis.connect(addr1).backProject(0, { value: cost });

    // Revert the project
    await expect(genesis.requestRefund(0))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT REVERTED", addr1.address, anyValue);

    const backer = await genesis.getBackers(0);
    expect(backer[0].refunded).to.equal(true);
  });

  // Test case for performing a payout
  it("Should allow payout for an approved project", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await genesis.createProject(title, description, cost);

    // Back the project
    await genesis.connect(addr1).backProject(0, { value: cost });

    // Perform payout after project is approved
    await expect(genesis.payOutProject(0))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT PAID OUT", owner.address, anyValue);
  });

  // Test case for changing the tax rate (only owner can change it)
  it("Should allow owner to change the tax rate", async function () {
    const newTax = 10;

    await expect(genesis.changeTax(newTax))
      .to.emit(genesis, "Action")
      .withArgs(0, "PROJECT CREATED", owner.address, anyValue);

    const updatedTax = await genesis.projectTax();
    expect(updatedTax).to.equal(newTax);
  });

  // Test case for checking if an unauthorized entity can't delete or update projects
  it("Should not allow unauthorized users to delete or update a project", async function () {
    const title = "Test Project";
    const description = "This is a test project";
    const cost = ethers.parseEther("1");

    await genesis.createProject(title, description, cost);

    await expect(
      genesis.connect(addr1).updateProject(0, "New Title", "New Description")
    ).to.be.revertedWith("Unauthorized Entity");

    await expect(genesis.connect(addr1).deleteProject(0)).to.be.revertedWith(
      "Unauthorized Entity"
    );
  });
});
