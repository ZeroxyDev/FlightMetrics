interface Runway {
    le_ident: string;
    length_ft: number;
    le_heading_degT: number;
    he_ident: string;
    he_heading_degT: number;
}

export interface TransformedObject {
    ICAO: string;
    elevation: number;
    runways: {
        name: string;
        length: number;
        heading: number;
    }[];
}

export function transformAirportObject(airportObject: any): TransformedObject {
    // Crear un nuevo objeto con la estructura deseada
    let transformedObject: TransformedObject = {
        ICAO: airportObject.ident,
        elevation: parseInt(airportObject.elevation_ft),
        runways: []
    };

    // Iterar sobre las pistas del aeropuerto original y transformarlas
    airportObject.runways.forEach((runway: Runway) => {
        // Agregar las pistas transformada al nuevo objeto
        transformedObject.runways.push({
            name: runway.le_ident,
            length: Math.round(runway.length_ft),
            heading: Math.round(runway.le_heading_degT)
        });

        transformedObject.runways.push({
            name: runway.he_ident,
            length: Math.round(runway.length_ft),
            heading: Math.round(runway.he_heading_degT)
        });
    });

    return transformedObject;
}
