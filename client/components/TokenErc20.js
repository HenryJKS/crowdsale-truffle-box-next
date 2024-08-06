import { web3 } from "./web3";
import TokenErc20 from "../src/contracts/TokenErc20.json";
import TokenErc20Address from "../src/contracts/TokenSaleAddress";

const tokenerc20 = () => {
  return new web3.eth.Contract(TokenErc20.abi, TokenErc20Address.addressToken);
};

export default tokenerc20;
