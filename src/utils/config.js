// Configuration file - Loads environment variables

export const config = {
    // Application name from environment
    appName: import.meta.env.VITE_APP_NAME || 'Shipping Box Calculator',

    // Currency from environment
    currency: import.meta.env.VITE_CURRENCY || 'INR'
};

export const getCurrencySymbol = (currencyCode) => {
    const symbols = {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£',
    };
    return symbols[currencyCode] || currencyCode;
};

