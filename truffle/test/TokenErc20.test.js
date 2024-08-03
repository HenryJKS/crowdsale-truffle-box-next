const TokenErc20 = artifacts.require("TokenErc20");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("ERC20", (accounts) => {
  let token;

  const [owner, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    token = await TokenErc20.new("TokenERC20", "HJK", process.env.INITIALTOKEN);
  });

  it("Symbol of token", async () => {
    const symbol = await token.symbol();

    assert.equal(symbol, "HJK", "The token name is HJK");
  });

  it("Balance of owner in big number", async () => {
    const balance = await token.balanceOf(owner);
    const totalSupply = await token.totalSupply();
    expect(balance).to.be.a.bignumber.equal(totalSupply);
  });

  it("Transfer amount to recipient", async () => {
    const amount = new BN(100);
    const totalSupply = await token.totalSupply();

    await expect(token.transfer(recipient, amount, { from: owner })).to
      .eventually.be.fulfilled;

    const recipientBalance = await token.balanceOf(recipient);
    expect(recipientBalance).to.be.a.bignumber.equal(amount);

    const ownerBalance = await token.balanceOf(owner);
    expect(ownerBalance).to.be.a.bignumber.equal(totalSupply.sub(amount));
  });

  it("Is not possible to send more token than avaiable in balance account", async () => {
    const balanceOfOwner = await token.balanceOf(owner);

    await expect(
      token.transfer(recipient, balanceOfOwner.add(new BN(1)), { from: owner })
    ).to.eventually.be.rejected;
  });
});
