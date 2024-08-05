import React, { Component } from "react";
import { web3 } from "./web3";
import tokensale from "./TokenSale";
import kyc from "./KycContract";
import { Form, FormInput, Button } from "semantic-ui-react";

class FormToken extends Component {
  state = {
    addressValidate: "",
    addressValidateLoading: false,
  };

  buyTokens = async (event) => {
    event.preventDefault();

    let accounts = await web3.eth.getAccounts();
    const KycInstance = kyc();

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

  render() {
    return (
      <div>
        <h1>Token Sale</h1>

        <Form onSubmit={this.buyTokens}>
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
      </div>
    );
  }
}

export default FormToken;
