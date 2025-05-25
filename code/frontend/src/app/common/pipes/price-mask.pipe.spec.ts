import { PriceMaskPipe } from './price-mask.pipe';

describe('PriceMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
