const CrowdSale = artifacts.require("CrowdSale");
const TokenErc20 = artifacts.require("TokenErc20");

require("dotenv").config({ path: "../.env" });

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("CrowdSale", (accounts) => {
  let crowdSale;
  let token;

  const [owner, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    token = await TokenErc20.new("TokenERC20", "HJK", process.env.INITIALTOKEN);
    crowdSale = await CrowdSale.new(1, owner, token.address);

    await token.transfer(crowdSale.address, process.env.INITIALTOKEN);
  });

  it("balance of crowdsale", async () => {
    expect(await token.balanceOf(token.address)).to.be.a.bignumber.equal(
      new BN(0)
    );
    expect(await token.balanceOf(crowdSale.address)).to.be.a.bignumber.equal(
      process.env.INITIALTOKEN
    );
  });

  it("should be possible to buy tokens", async () => {
    expect(
      await crowdSale.buyTokens(recipient, {
        from: recipient,
        value: web3.utils.toWei("1", "wei"),
      })
    );

    expect(await token.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(1));
  });
});
