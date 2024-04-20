'use client'


import { useState, useEffect } from "react";

export const useLocalStorageState = (key: string, defaultValue: any) => {
    const isClient = typeof window === 'object';
    const savedValue = isClient ? localStorage.getItem(key) : null;
    let parsedValue;
  
    try {
      parsedValue = savedValue ? JSON.parse(savedValue) : defaultValue;
    } catch (error) {
      parsedValue = defaultValue;
    }
  
    const [value, setValue] = useState(parsedValue);
  
    useEffect(() => {
      if (isClient) {
        localStorage.setItem(key, JSON.stringify(value));
        return
      }
    }, [key, value, isClient]);
  
    return [value, setValue];
  };
// Función para manejar el cambio de los switches y guardar en localStorage
export const useSwitchState = (key: string, defaultValue: any) => {
const [state, setState] = useLocalStorageState(key, defaultValue);

const handleChange = (newState: any) => {
  setState(newState);
  localStorage.setItem(key, JSON.stringify(newState));
};

return [state, handleChange];
};

export const getSetting = (key: string) => {
    const isClient = typeof window === 'object';
    const savedValue = isClient ? localStorage.getItem(key) : null;
    if (isClient) return savedValue;
}

export const getSettings = () => {
    const isClient = typeof window === 'object';
    const settings = {} as any;

    if (isClient) {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            const value = localStorage.getItem(key);
            settings[key] = value;
        });
    }

    return settings;
};

