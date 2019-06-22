
/**
 * @author Cyril Lapinte - <cyril.lapinte@mtpelerin.com>
 *
 * Copyright © 2016 - 2019 Mt Pelerin Group SA - All Rights Reserved
 * This content cannot be used, copied or reproduced in part or in whole
 * without the express and written permission of Mt Pelerin Group SA.
 * Written by *Mt Pelerin Group SA*, <info@mtpelerin.com>
 * All matters regarding the intellectual property of this code or software
 * are subjects to Swiss Law without reference to its conflicts of law rules.
 *
 */
const abi = require('ethjs-abi');

module.exports = {
  buildHash: async function (destination, value, data, validity) {
    if (!this.web3 && web3) {
      this.web3 = web3;
    }
    const replayProtection = await this.multiSig.replayProtection();
    return this.buildHashWithReplay(destination, value, data, validity, replayProtection);
  },
  buildHashWithReplay: async function (destination, value, data, validity, replayProtection) {
    let encodedParams = 0;
    if (this.web3.toHex(data) === '0x0') {
      encodedParams = abi.encodeParams(
        [ 'address', 'uint256', 'uint256', 'bytes32' ],
        [ destination,
          this.web3.toHex(value),
          this.web3.toHex(validity),
          replayProtection,
        ]
      );
    } else {
      encodedParams = abi.encodeParams(
        [ 'address', 'uint256', 'bytes', 'uint256', 'bytes32' ],
        [ destination,
          this.web3.toHex(value),
          data,
          this.web3.toHex(validity),
          replayProtection,
        ]
      );
    }
    const hash = this.web3.sha3(encodedParams, { encoding: 'hex' });
    return hash;
  },
  encodeParams: abi.encodeParams,
  sign: async function (destination, value, data, validity, address) {
    const hash = await this.buildHash(destination, value, data, validity);
    const signedHash = this.web3.eth.sign(address, hash);

    return {
      r: '0x' + signedHash.slice(2).slice(0, 64),
      s: '0x' + signedHash.slice(2).slice(64, 128),
      v: this.web3.toDecimal(signedHash.slice(2).slice(128, 130)),
    };
  },
};
