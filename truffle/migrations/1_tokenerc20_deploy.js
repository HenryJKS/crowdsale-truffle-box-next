const TokenErc20 = artifacts.require("TokenErc20");
const TokenSale = artifacts.require("TokenSale");
const KycContract = artifacts.require("KycContract");
require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const path = require("path");

module.exports = async function (deployer, network, accounts) {
  const name = "TokenHJK";
  const symbol = "HJK";

  // Deploy TokenErc20 contract
  console.log("Deploying TokenErc20...");
  await deployer.deploy(TokenErc20, name, symbol, process.env.INITIALTOKEN);
  const tokenErc20Instance = await TokenErc20.deployed();
  console.log(`TokenErc20 deployed at ${tokenErc20Instance.address}`);

  // Deploy Kyc contract
  console.log("Deploying KycContract...");
  await deployer.deploy(KycContract);
  const kycContractInstance = await KycContract.deployed();
  console.log(`KycContract deployed at ${kycContractInstance.address}`);

  // Deploy TokenSale contract
  console.log("Deploying TokenSale...");
  await deployer.deploy(
    TokenSale,
    1,
    accounts[0],
    tokenErc20Instance.address,
    kycContractInstance.address
  );
  const tokenSaleInstance = await TokenSale.deployed();
  console.log(`TokenSale deployed at ${tokenSaleInstance.address}`);

  // Transfer initial tokens to TokenSale contract
  console.log("Transferring initial tokens to TokenSale contract...");
  await tokenErc20Instance.transfer(
    tokenSaleInstance.address,
    process.env.INITIALTOKEN
  );
  console.log("Initial tokens transferred.");

  // Save the TokenSale contract address to a JSON file
  const data = {
    addressKyc: kycContractInstance.address,
    addressSale: tokenSaleInstance.address,
    addressToken: TokenErc20.address,
    network: network,
  };

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "client",
    "src",
    "contracts",
    "TokenSaleAddress.json"
  );
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`TokenSale contract address saved to ${filePath}`);
};
