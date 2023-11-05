import { ethers } from "hardhat";

async function main() {
  const TechExpo = await ethers.getContractFactory("MyToken");
  const techExpo = await TechExpo.deploy("Beeple", "Beep");

  console.log(`Deployed to ${await techExpo.getAddress()}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
