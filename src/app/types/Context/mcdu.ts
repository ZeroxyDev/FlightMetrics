

type MCDUSettings = {
    V1: number;
    VR: number;
    V2: number;
    flaps: number;
    trim: string;
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


// Proveedor del contexto de la MCDU
type MCDUContextProviderProps = {
    children: React.ReactNode;
};