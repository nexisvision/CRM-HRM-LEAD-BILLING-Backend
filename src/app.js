import { seedDefaultCurrencies } from './controllers/currencyControllers/createCurrency.js';

// Add this after your database connection is established
await seedDefaultCurrencies(); 