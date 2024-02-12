// Importa path
import path from 'path';
import generalSettings from "@/config/general";
import { parseMETARResponse } from './convert';

// Función para obtener la ruta del archivo JSON
function getJSONFilePath(route: string): string {
    const apiRoute = generalSettings.APIRoute;
    return path.join(process.cwd(), apiRoute, route, 'index.json');
}

// Función para leer el contenido del archivo JSON
export async function fetchLocalAPI(route: string): Promise<any> {
    const jsonFilePath = getJSONFilePath(route);
    const fileContent = await fetch(jsonFilePath);

    return await fileContent.json();
}

export async function fetchExternalAPI(url: string) {
    return fetch(url).then((response) => response.json());
}

// Función para verificar si la ruta existe
export async function isValidRoute(route: string): Promise<boolean> {
    const jsonFilePath = getJSONFilePath(route);
    try {
        await fetch(jsonFilePath);
        return true;
    } catch (error) {
        return false;
    }
}

export const fetchSimbrief = async (username: string) => {
    return fetch(
        `https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`)
        .then((res) => res.json())
        .then((json) => {
            return {
                icao: json.origin.icao_code,
                runway: json.origin.plan_rwy,
                tow: json.weights.est_tow,
                weightUnit: json.api_params.pounds === '1' ? 'LBS' : 'KGS',
                raw: json,
            };
        });
};

export const fetchMetar = async (icao: string) => {
    return fetch(
        `https://metar.vatsim.net/metar.php?id=${icao}`)
        .then((res) => res.text())
        .then((data) => {
            const converted = parseMETARResponse(data);
            return converted;
        });
};



