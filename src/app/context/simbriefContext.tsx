import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la interfaz para el contexto de Simbrief
interface SimbriefContextType {
    simbriefSettings: any;
    updateSimbriefSettings: (settings: any) => void;
}

// Crear el contexto de la simbrief
const SimbriefContext = createContext<SimbriefContextType | undefined>(undefined);

export const SimbriefContextProvider = ({ children }: { children: ReactNode }) => {
    const [simbriefSettings, setSimbriefSettings] = useState<any>({});

    const updateSimbriefSettings = (settings: any) => {
        setSimbriefSettings(settings);
    };

    return (
        <SimbriefContext.Provider value={{ simbriefSettings, updateSimbriefSettings }}>
            {children}
        </SimbriefContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de Simbrief
export const useSimbrief = () => {
    const context = useContext(SimbriefContext);
    if (!context) {
        throw new Error('useSimbrief debe ser utilizado dentro de un SimbriefContextProvider');
    }
    return context;
};
