import { fetchLocalAPI } from "./API";
import metarParser from "./metar/metar";


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

export function parseMETARResponse(apiResponse: string) {
    const metarData = metarParser(apiResponse) as MetarData;
    return metarData;
}

export async function convertAircraftModel(base: string): Promise<AircraftModel | null> {
    try {
        const aircraftModels: AircraftModel[] = await fetchLocalAPI("aircrafts");

        const matchedModel = aircraftModels.find(model => model.base === base);
        return matchedModel ? {
            type: matchedModel.type,
            label: matchedModel.label,
            base: matchedModel.base
        } : null;
    } catch (error) {
        console.error('Error fetching aircraft models:', error);
        return null;
    }
}

export function formatNumberToThousands(number: any) {
    // Convertir el número a una cadena y separar la parte entera de la decimal
    let [integerPart, decimalPart] = String(number).split('.');
    
    // Agregar comas cada tres dígitos en la parte entera
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Devolver el número formateado, incluyendo la parte decimal si existe
    if (decimalPart) {
        return `${integerPart},${decimalPart}`;
    } else {
        return integerPart;
    }
}

export const timestampToHourAndMinute = (timestamp: number): string => {
    // Crear un objeto de fecha a partir del timestamp
    const date = new Date(timestamp * 1000);

    // Obtener la hora y los minutos del objeto de fecha
    let hour = date.getHours();
    let minute = date.getMinutes();

    // Formatear la hora y los minutos para asegurarse de que tengan dos dígitos
    hour = hour < 10 ? 0 + hour : hour;
    minute = minute < 10 ? 0 + minute : minute;

    // Devolver la hora y los minutos formateados como una cadena
    return `${hour}:${minute}`;
};

export const timestampToDate = (timestamp: number): string => {
    // Crear un objeto de fecha a partir del timestamp
    const date = new Date(timestamp * 1000);

    // Obtener el día, el mes y el año del objeto de fecha
    const day = date.getDate();
    const month = date.getMonth() + 1; // Se agrega 1 ya que los meses van de 0 a 11 en JavaScript
    const year = date.getFullYear();

    // Formatear día y mes para asegurarse de que tengan dos dígitos
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Devolver la fecha formateada como una cadena en el formato dd/mm/yyyy
    return `${formattedDay}/${formattedMonth}/${year}`;
};


export const kgToLbs = (kilograms: number) => {
    const poundsPerKg = 2.20462;
    return kilograms * poundsPerKg;
};

export const lbsToKg = (pounds: number) => {
    const kgPerPound = 0.453592;
    return pounds * kgPerPound;
};

