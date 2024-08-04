const TokenSale = artifacts.require("TokenSale");
const TokenErc20 = artifacts.require("TokenErc20");
const KycContract = artifacts.require("KycContract");

require("dotenv").config({ path: "../.env" });

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", (accounts) => {
  let tokenSale;
  let token;
  let kyc;

  const [owner, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    token = await TokenErc20.new("TokenERC20", "HJK", process.env.INITIALTOKEN);
    kyc = await KycContract.new();
    tokenSale = await TokenSale.new(1, owner, token.address, kyc.address);

    await token.transfer(tokenSale.address, process.env.INITIALTOKEN);
  });

  it("balance of tokensale", async () => {
    expect(await token.balanceOf(token.address)).to.be.a.bignumber.equal(
      new BN(0)
    );
    expect(await token.balanceOf(tokenSale.address)).to.be.a.bignumber.equal(
      process.env.INITIALTOKEN
    );
  });

  it("should be possible to buy tokens", async () => {

    expect(await kyc.setKycCompleted(recipient, {from: owner}));

    expect(
      await tokenSale.buyTokens(recipient, {
        from: recipient,
        value: web3.utils.toWei("1", "wei"),
      })
    );


    expect(await token.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(1));
  });
});
