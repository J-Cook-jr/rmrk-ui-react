import { isValidAddressPolkadotAddress } from './validate-polkadot-address';

// Test isValidAddressPolkadotAddress
describe('utils: isValidAddressPolkadotAddress', () => {
  it('Should return false for invalid polkadot address', () => {
    expect(isValidAddressPolkadotAddress('12345')).toBeFalsy();
  });

  it('Should return true for valid polkadot address', () => {
    expect(
      isValidAddressPolkadotAddress('5GCUJaEokgHWhoJ5jW5XCBwbkrY87NRCsRE4Rq9f4JtMdr72'),
    ).toBeTruthy();
  });
});
