// This service handles all business logic related to shipping calculations.

import { getCountryMultiplier } from "../utils/constants";
import { config, getCurrencySymbol } from '../utils/config';

// Calculate shipping cost for a box
export const calculateShippingCost = (weight, country) => {
    if (!weight || weight <= 0 || !country) {
        return 0;
    }
    const multiplier = getCountryMultiplier(country);

    const cost = weight * multiplier;

    return Math.round(cost * 100) / 100;
}


// Convert hex color to RGB format string
export const convertHexToRGB = (hexColor) => {
    const hex = hexColor.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}

// Format currency value for display
export const formatCurrency = (amount) => {
    const symbol = getCurrencySymbol(config.currency);
    return `${symbol}${amount.toFixed(2)}`;
};