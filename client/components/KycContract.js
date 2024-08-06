import { web3 } from "./web3";
import Kyc from "../src/contracts/KycContract.json";
import KycAddress from "../src/contracts/TokenSaleAddress.json";

const kyc = () => {
  return new web3.eth.Contract(Kyc.abi, KycAddress.addressKyc);
};

export default kyc;
