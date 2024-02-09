import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo de los datos relacionados con la MCDU
type MCDUSettings = {
    V1: number;
    VR: number;
    V2: number;
    flaps: number;
    trim: number;
    thrRed: number;
    thrAcc: number;
    engOut: number;
    transitionAltitude: number | undefined;
    flpretr: number;
    slrretr: number;
    clean: number;
    flexTemp: number;
    runway?: string;
};

// Definir el tipo para el contexto de la MCDU
type MCDUContextType = {
    mcduSettings: MCDUSettings;
    updateMCDUSettings: (settings: MCDUSettings) => void;
};

// Crear el contexto de la MCDU
const MCDUContext = createContext<MCDUContextType | undefined>(undefined);

// Proveedor del contexto de la MCDU
type MCDUContextProviderProps = {
    children: ReactNode;
};

export const MCDUContextProvider = ({ children }: MCDUContextProviderProps) => {
    const [mcduSettings, setMCDUSettings] = useState<MCDUSettings>({
        V1: 0,
        VR: 0,
        V2: 0,
        flaps: 0,
        trim: 0,
        thrRed: 0,
        thrAcc: 0,
        engOut: 0,
        transitionAltitude: 0,
        flpretr: 0,
        slrretr: 0,
        clean: 0,
        flexTemp: 0,
        runway: '20R',
    });

    const updateMCDUSettings = (settings: MCDUSettings) => {
        setMCDUSettings(settings);
    };

    return (
        <MCDUContext.Provider value={{ mcduSettings, updateMCDUSettings }}>
            {children}
        </MCDUContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de la MCDU
export const useMCDU = () => {
    const context = useContext(MCDUContext);
    if (!context) {
        throw new Error('useMCDU debe ser utilizado dentro de un MCDUContextProvider');
    }
    return context;
};
