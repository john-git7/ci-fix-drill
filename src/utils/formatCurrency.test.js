const { formatCurrency } = require('./formatCurrency');

test('formats currency correctly', () => {
  // Fixed assertion matcher from toBe to toEqual since we are comparing objects
  expect(formatCurrency(10.005, 'USD')).toEqual({ amount: 10.01, currency: 'USD' });
});
