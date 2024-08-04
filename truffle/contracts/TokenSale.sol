// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Crowdsale.sol";
import "./KycContract.sol";

contract TokenSale is Crowdsale {
    KycContract kyc;

    constructor(
        uint256 _rate,
        address _wallet,
        ERC20 _token,
        KycContract _kyc
    ) Crowdsale(_rate, _wallet, _token) {
        kyc = KycContract(_kyc);
    }

    function _preValidatePurchase(
        address _beneficiary,
        uint256 _weiAmount
    ) internal view override {
        super._preValidatePurchase(_beneficiary, _weiAmount);
        require(
            kyc.kycCompleted(msg.sender),
            "KYC not completed, purchase not allowed"
        );
    }
}
