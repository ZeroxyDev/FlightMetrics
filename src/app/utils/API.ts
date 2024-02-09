// Importa path
import path from 'path';
import generalSettings from "@/config/general";

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



