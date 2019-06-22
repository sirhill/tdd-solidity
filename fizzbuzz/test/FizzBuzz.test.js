const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

const FizzBuzz = artifacts.require("FizzBuzz");

contract("FizzBuzz", function ([_, authorized, otherAuthorized, other]) {
  let fizzbuzz;

  beforeEach(async function () {
    fizzbuzz = await FizzBuzz.new();
  });

  it("should evaluate 0 to 0", async function() {
    (await fizzbuzz.eval(0)).should.be.bignumber.equal('0');
  });
});
