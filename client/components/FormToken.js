import React, { Component } from "react";
import { web3 } from "./web3";
import tokensale from "./TokenSale";
import kyc from "./KycContract";
import tokenerc20 from "./TokenErc20";
import {
  Form,
  FormInput,
  Button,
  Header,
  Image,
  Divider,
  Statistic,
  StatisticValue,
  StatisticLabel,
} from "semantic-ui-react";

class FormToken extends Component {
  state = {
    addressValidate: "",
    addressValidateLoading: false,
    owner: "",
    buyTokensLoading: false,
    addressPurchase: "",
    valueInWei: 0,
    validate: "",
    balanceOf: 0,
  };

  async componentDidMount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const KycInstance = kyc();
    const TokenErc20Instance = tokenerc20();

    let accounts = await web3.eth.getAccounts();

    try {
      let validate = await KycInstance.methods.kycCompleted(accounts[0]).call();

      if (validate === undefined || validate == "") {
        this.setState({ validate: "Address: Not Validated" });
      } else {
        this.setState({ validate: "Address: Validate" });
      }
    } catch (e) {
      console.log(e);
    }

    try {
      let owner = await KycInstance.methods.owner().call();
      this.setState({ owner });
    } catch (error) {
      console.log(error);
    }

    try {
      let balanceOf = await TokenErc20Instance.methods
        .balanceOf(accounts[0])
        .call();

      let decimals = await TokenErc20Instance.methods.decimals().call();

      balanceOf = new web3.utils.BN(balanceOf)
        .div(new web3.utils.BN(10).pow(new web3.utils.BN(decimals)))
        .toString();

      this.setState({ balanceOf });
    } catch (error) {
      console.log(error);
    }
  }

  validateKyc = async (event) => {
    event.preventDefault();

    const KycInstance = kyc();

    let accounts = await web3.eth.getAccounts();

    this.setState({ addressValidateLoading: true });

    try {
      await KycInstance.methods
        .setKycCompleted(this.state.addressValidate)
        .send({
          from: accounts[0],
        });
      this.setState({ addressValidateLoading: false });
    } catch (e) {
      console.log(e);
      this.setState({ addressValidateLoading: false });
    }
  };

  buyTokens = async (event) => {
    event.preventDefault();

    let accounts = await web3.eth.getAccounts();

    const TokenSale = tokensale();

    this.setState({ buyTokensLoading: true });

    try {
      await TokenSale.methods.buyTokens(this.state.addressPurchase).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.valueInWei, "wei"),
      });
      this.setState({ buyTokensLoading: false });
    } catch (e) {
      console.log(e);
      this.setState({ buyTokensLoading: false });
    }
  };

  render() {
    return (
      <div>
        <h1>Token Sale</h1>

        <Header as="h3">
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
          />
          Owner: {this.state.owner}
        </Header>

        <Form onSubmit={this.validateKyc}>
          <FormInput
            label="Address"
            type="string"
            value={this.state.addressValidate}
            required={true}
            onChange={(event) =>
              this.setState({ addressValidate: event.target.value })
            }
          />

          <Button
            type="submit"
            content="Validate"
            loading={this.state.addressValidateLoading}
            disabled={this.state.addressValidateLoading}
            primary
          />
        </Form>

        <Header as="h5">{this.state.validate}</Header>

        <Divider horizontal content="Buy Tokens" />

        <Form onSubmit={this.buyTokens}>
          <FormInput
            label="Address"
            type="string"
            value={this.state.addressPurchase}
            required={true}
            onChange={(event) =>
              this.setState({ addressPurchase: event.target.value })
            }
          />

          <FormInput
            label="Value in Wei"
            type="number"
            value={this.state.valueInWei}
            required={true}
            onChange={(event) =>
              this.setState({ valueInWei: event.target.value })
            }
          />

          <Button
            type="submit"
            content="Buy"
            loading={this.state.buyTokensLoading}
            disabled={this.state.buyTokensLoading}
            primary
          />
        </Form>

        <Statistic horizontal>
          <StatisticValue>{this.state.balanceOf}</StatisticValue>
          <StatisticLabel>TokenErc20</StatisticLabel>
        </Statistic>
      </div>
    );
  }
}

export default FormToken;
