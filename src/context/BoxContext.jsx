import { createContext, useContext, useState, useEffect, useRef } from "react";
import { calculateShippingCost } from "../services/shippingService";

const BoxContext = createContext();

export const useBoxContext = () => {
    const context = useContext(BoxContext);
    if (!context) {
        throw new Error('useBoxContext must be used within BoxProvider');
    }
    return context;
}

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

    const addBox = (boxData) => {
        const shippingCost = calculateShippingCost(boxData.weight, boxData.country);

        const newBox = {
            id: Date.now().toString(),
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

