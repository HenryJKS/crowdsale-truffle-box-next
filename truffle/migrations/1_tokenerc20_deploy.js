const TokenErc20 = artifacts.require("TokenErc20");
const CrowdSale = artifacts.require("CrowdSale");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer, _, accounts) {
  const name = "TokenHJK";
  const symbol = "HJK";

  // Deploy TokenErc20 contract
  await deployer.deploy(TokenErc20, name, symbol, process.env.INITIALTOKEN);

  // Deploy CrowdSale contract
  await deployer.deploy(CrowdSale, 1, accounts[0], TokenErc20.address);

  const instanceToken = await TokenErc20.deployed();

  await instanceToken.transfer(CrowdSale.address, process.env.INITIALTOKEN);
};
