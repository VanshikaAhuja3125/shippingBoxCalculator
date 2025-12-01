// This file contains all constant values used across the application.

//Country shipping cost multipliers
export const COUNTRY_MULTIPLIERS = {
    Sweden: 7.35,
    China: 11.53,
    Brazil: 15.63,
    Australia: 50.09
};

// Form validation constants
export const RECEIVER_NAME_MAX_LENGTH = 50;

// Get list of countries for dropdown
export const getCountries = () => {
    return Object.keys(COUNTRY_MULTIPLIERS).sort();
}

//Get shipping cost multiplier for a specific country
export const getCountryMultiplier = (country) => {
    return COUNTRY_MULTIPLIERS[country] || 0;
}