import { _compensateForMachEffect, _computeGD, _getVfeNIdx, distfrom5, f, f2corr, round10down, round5down, s, to, vfeFS, vls, vlsTo, vs } from "../utils/aircraftV";


function correctMass(m: number) {
    return Math.ceil(((m > 80 ? 80 : m) - 40) / 5);
}


/**
 * Función para calcular la velocidad V2
 * @param {array} data - Masa bruta en toneladas
 * @returns {number} Velocidad V2 calculada
 */
export function calculatev2(data: any) {

    console.log(data)

    const origm = data.flightDetails.grossWeight / 1000
    const aircmass = parseInt(data.aircraft.info.weight.empty.toString())

    var mass = Math.round(origm);
    mass = (mass === 0) ? 64.3 : mass;

    var fPos = parseInt(data.aircraft.flapConfiguration[0]);

    if (data.aircraft.flapConfiguration == "1") {
        fPos = 1
    }else if (data.aircraft.flapConfiguration == "1+F") {
        fPos = 1
    }
    else if (data.aircraft.flapConfiguration == "2") {     
        fPos = 2
    }
    else if (data.aircraft.flapConfiguration == "3") {     
        fPos = 3
    }

    const alt = data.airport.elevation;

    console.log(data.aircraft.info.speeds.VSpeeds)

    var staticV2 = Math.round((data.aircraft.info.speeds.VSpeeds[fPos][round5down(mass).toString()]))
    if (staticV2 === undefined) {
        staticV2 = Math.round((data.aircraft.info.speeds.VSpeeds[fPos][round10down(mass).toString()]));
    }

    if (aircmass < 60) {
        staticV2 += f2corr(fPos, alt);
        staticV2 = (staticV2 - 1) + (mass - 40) * (18) / (40)  
    }

    const V2Speed = Math.ceil(staticV2 + distfrom5(mass));

    return Math.ceil(staticV2);
}

export function calculateV1(v2: number) {
    return v2 - 5
}

export function calculateVR(v2: number) {
    return v2 - 4
}

export function calculateV(data: any, isConf3: boolean) {

    const origm = data.flightDetails.grossWeight / 1000
    const m = origm;
    const cm = correctMass(m)

    const round5 = round5down(m)
    const round10 = round10down(m)

    var v = Math.round((data.aircraft.info.speeds.flapsRetr[round5]))
    if (v === undefined) {
        v = Math.round((data.aircraft.info.speeds.flapsRetr[round10]))
    }

    var st = Math.round((data.aircraft.info.speeds.slatsRetr[round5]))
    if (st === undefined) {
       st = Math.round((data.aircraft.info.speeds.slatsRetr[round10]))
    }

    var fl = f[cm](m, v);
    var sl = s[cm](m, v);
    var clean = _compensateForMachEffect(_computeGD(m), data.airport.elevation);

    // Ajustar la masa de aviones muy grandes
    const aircmass = parseInt(data.aircraft.info.weight.empty.toString())
    if (aircmass > 60) {
        fl = v
        sl = st * 1.23
        clean = _compensateForMachEffect(fl * 1.27, data.airport.elevation);
    }

    // Ajustar la masa general
    fl = Math.round(fl  + 0.1 * Math.min(m - parseInt(m.toString().substring(0, 1))));
    sl = Math.round(sl);
    clean = Math.round((clean + 0.22 * Math.min(m - parseInt(m.toString().substring(0, 1)))));
    /*     const slt = vls[0][cm](m, 1); */

    const object = {
        flaps: Math.round(fl),
        slats: Math.round(sl),
        clean: Math.round(clean),
    }

    console.log(object)
    return object;

}


export function calculateFlexTemp(data: any): number {
    let flexTemp = data.airport.temperature; // Temperatura inicial
    let plusTemp = data.aircraft.info.temperatureFactor; // temperatura adicional por el avion
    
    // Regla 1: Con QNH alto, añadir 1º por cada 0.3 que supere 29.92 (no necesario a nivel del mar)
    const qnhDifference = data.flightDetails.QNH - 1013;
    if (qnhDifference >= 0) {
        flexTemp += (qnhDifference / 0.3); // Añadir 1º por cada 0.3 que supere 29.92
    }

    // Regla 2: Con QNH bajo, restar 1ºC por cada 0.1 pulgadas que haya por debajo de 29.92
    if (qnhDifference < 0) {
        flexTemp -= (Math.abs(qnhDifference) / 0.1); // Restar 1º por cada 0.1 que esté por debajo de 29.92
    }

    // Regla 3: Con el Engine Anti-ice on, restar 1ºC
    if (data.aircraft?.antiIceType?.includes("Engine")) {
        flexTemp -= 1;
    }

    // Regla 4: Con el Anti hielo completo, restar 1º
    if (data.aircraft?.antiIceType?.length === 3) {
        flexTemp -= 1;
    }

    // Regla 5: Con Engine Bleed on, restar 3º
    if (data.aircraft?.airConditioning === "on") {
        flexTemp -= 3;
    }

    flexTemp = Math.round(flexTemp) + plusTemp;

    return flexTemp;
}
