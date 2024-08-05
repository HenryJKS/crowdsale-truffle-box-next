import { web3 } from "./web3";
import TokenSale from "../src/contracts/TokenSale.json";
import TokenSaleAddress from "../src/contracts/TokenSaleAddress.json";

const tokensale = () => {
  return new web3.eth.Contract(TokenSale.abi, TokenSaleAddress.addressSale);
};

export default tokensale;
