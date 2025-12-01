export const COUNTRY_MULTIPLIERS = {
    Sweden: 7.35,
    China: 11.53,
    Brazil: 15.63,
    Australia: 50.09
};

export const RECEIVER_NAME_MAX_LENGTH = 50;

export const getCountries = () => {
    return Object.keys(COUNTRY_MULTIPLIERS).sort();
}

export const getCountryMultiplier = (country) => {
    return COUNTRY_MULTIPLIERS[country] || 0;
}