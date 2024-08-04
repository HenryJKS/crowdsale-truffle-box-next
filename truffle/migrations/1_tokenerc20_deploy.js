const TokenErc20 = artifacts.require("TokenErc20");
const TokenSale = artifacts.require("TokenSale");
const KycContract = artifacts.require("KycContract");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer, _, accounts) {
  const name = "TokenHJK";
  const symbol = "HJK";

  // Deploy TokenErc20 contract
  await deployer.deploy(TokenErc20, name, symbol, process.env.INITIALTOKEN);
  
  // Deploy Kyc contract
  await deployer.deploy(KycContract)

  // Deploy TokenSale contract
  await deployer.deploy(TokenSale, 1, accounts[0], TokenErc20.address, KycContract.address);


  const instanceToken = await TokenErc20.deployed();

  await instanceToken.transfer(TokenSale.address, process.env.INITIALTOKEN);
};
