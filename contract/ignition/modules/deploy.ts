import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying through : ", deployer.address);
  const votingcontract = await ethers.deployContract("Voting");

  await votingcontract.waitForDeployment();

  const address = await votingcontract.getAddress();
  console.log("Contract deployed to: ", address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
