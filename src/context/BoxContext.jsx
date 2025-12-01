import { createContext, useContext, useState, useEffect, useRef } from "react";
import { calculateShippingCost } from "../services/shippingService";

// Create Context
const BoxContext = createContext();


/* 
Custom hook to use BoxContext 
Throws error if used outside BoxProvider 
*/
export const useBoxContext = () => {
    const context = useContext(BoxContext);
    if (!context) {
        throw new Error('useBoxContext must be used within BoxProvider');
    }
    return context;
}

// BoxProvider Component
export const BoxProvider = ({ children }) => {

    // Helper function to load boxes from localStorage
    const loadBoxesFromStorage = () => {
        try {
            const savedBoxes = localStorage.getItem('shippingBoxes');
            if (savedBoxes) {
                return JSON.parse(savedBoxes);
            }
        } catch (error) {
            console.error('Error loading boxes from localStorage:', error);
        }
        return [];
    };

    // Initialize state from localStorage (runs only once on mount)
    const [boxes, setBoxes] = useState(() => loadBoxesFromStorage());
    const isInitialMount = useRef(true);

    // Mark that initial mount is complete after first render
    useEffect(() => {
        isInitialMount.current = false;
    }, []);


    // Save boxes to localStorage whenever boxes change
    useEffect(() => {
        if (isInitialMount.current) {
            return;
        }
        localStorage.setItem('shippingBoxes', JSON.stringify(boxes));
    }, [boxes]);

    /* 
    Add a new box
    @param {Object} boxData - Box data (receiverName, weight, color, country)
    @returns {Object} - Created box with calculated shipping cost
   */

    const addBox = (boxData) => {
        const shippingCost = calculateShippingCost(boxData.weight, boxData.country);

        // Create box object with unique ID
        const newBox = {
            id: Date.now().toString(), // Simple ID generation
            receiverName: boxData.receiverName,
            weight: boxData.weight,
            color: boxData.color,
            country: boxData.country,
            shippingCost: shippingCost,
            createdAt: new Date().toISOString(),
        };

        setBoxes((prevBoxes) => [...prevBoxes, newBox]);
        return newBox;
    }

    const getBoxes = () => {
        return boxes;
    }

    const value = {
        boxes,
        addBox,
        getBoxes
    };

    return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>;
}

