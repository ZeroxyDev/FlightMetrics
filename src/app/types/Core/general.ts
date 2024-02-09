interface Runway {
    le_ident: string;
    length_ft: number;
    le_heading_degT: number;
    he_ident: string;
    he_heading_degT: number;
}

interface TransformedObject {
    ICAO: string;
    elevation: number;
    runways: {
        name: string;
        length: number;
        heading: number;
    }[];
}