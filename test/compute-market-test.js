const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ComputeMarket basic flow", function () {
  it("creates task and escrow works", async function () {
    const [owner, alice, provider] = await ethers.getSigners();

    // Deploy ERC20
    const Token = await ethers.getContractFactory("DeaiToken");
    const token = await Token.deploy(ethers.parseEther("1000000"));
    await token.waitForDeployment();
    const tokenAddr = await token.getAddress();

    // Deploy Market with token address
    const Market = await ethers.getContractFactory("ComputeMarket");
    const market = await Market.deploy(tokenAddr);
    await market.waitForDeployment();
    const marketAddr = await market.getAddress();

    // Fund Alice and approve escrow
    await token.transfer(alice.address, ethers.parseEther("100"));
    await token.connect(alice).approve(marketAddr, ethers.parseEther("10"));

    // Create task (escrow pull)
    const tx = await market.connect(alice).createTask(
      ethers.parseEther("10"),
      "ipfs://dataset",
      0
    );
    await tx.wait();

    const nextId = await market.nextTaskId();
    expect(ethers.toNumber(nextId)).to.equal(1);

    // Provider flow
    await market.connect(provider).acceptTask(1);
    const tAfterAccept = await market.tasks(1);
    expect(tAfterAccept.provider).to.equal(provider.address);

    await market.connect(provider).startTask(1);
    await market.connect(provider).submitResult(1, "ipfs://result");
    const tAfterSubmit = await market.tasks(1);
    expect(tAfterSubmit.resultCID).to.equal("ipfs://result");

    // Consumer verifies & releases escrow
    await market.connect(alice).verifyAndRelease(1, true);
    const tAfterVerify = await market.tasks(1);
    expect(ethers.toNumber(tAfterVerify.status)).to.equal(4); // Verified
  });
});
