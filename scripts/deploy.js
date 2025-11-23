async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from", deployer.address);

  const Token = await ethers.getContractFactory("DeaiToken");
  const token = await Token.deploy(ethers.parseEther("1000000"));
  await token.waitForDeployment();
  console.log("Token deployed:", await token.getAddress());

  const Market = await ethers.getContractFactory("ComputeMarket");
  const market = await Market.deploy(await token.getAddress());
  await market.waitForDeployment();
  console.log("Market deployed:", await market.getAddress());

  const SBT = await ethers.getContractFactory("ReputationSBT");
  const sbt = await SBT.deploy();
  await sbt.waitForDeployment();
  console.log("SBT deployed:", await sbt.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



