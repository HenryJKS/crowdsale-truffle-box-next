import React, { Component } from "react";
import Layout from "../components/Layout";
import WalletButton from "../components/web3";
import FormToken from "../components/FormToken";

class Index extends Component {
  render() {
    return (
      <Layout>
        <WalletButton />
        <FormToken />
      </Layout>
    );
  }
}

export default Index;
