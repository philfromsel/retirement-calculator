const numFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
const dateFormatter = Intl.DateTimeFormat('en-US');

export { numFormatter, dateFormatter };