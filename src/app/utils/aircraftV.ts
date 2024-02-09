

/**
 * F-Speed Table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 to 9 represent gross weight (t) in 5t steps from 40 to 80.
 */
export const f = [
    (m: number, v: number) => v,
    (m: number, v: number) => v,
    (m: number, v: number) => v,
    (m: number, v: number) => v + 1.2 * (m - 50),
    (m: number, v: number) => v + 1.4 * (m - 55),
    (m: number, v: number) => v + m - 60,
    (m: number, v: number) => v + 1.2 * (m - 65),
    (m: number, v: number) => v + m - 70,
    (m: number, v: number) => v + 1.20 * (m - 75),
    (m: number, v: number) => v
];

/**
 * S-Speed Table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 to 9 represent gross weight (t) in 5t steps from 40 to 80.
 */
export const s = [
    (m: number, v: number) => v,
    (m: number, v: number) => v + 1.8 * (m - 40),
    (m: number, v: number) => v + 1.6 * (m - 45),
    (m: number, v: number) => v + 1.8 * (m - 50),
    (m: number, v: number) => v + 1.6 * (m - 55),
    (m: number, v: number) => v + 1.4 * (m - 60),
    (m: number, v: number) => v + 1.4 * (m - 65),
    (m: number, v: number) => v + 1.4 * (m - 70),
    (m: number, v: number) => v + 1.4 * (m - 75),
    () => 214
];
export function _getVfeNIdx(fi: any) {
    switch (fi) {
        case 0: return 4;
        case 5: return 1;
        default: return fi;
    }
}

export function _computeGD(m: number) {
    return m * 2 + 85;
}

export function _compensateForMachEffect(v: number, alt: number) {
    return Math.ceil(alt > 20000 ? v + (alt - 20000) / 1000 : v);
}

export function round5down(x: number) {
    return Math.floor(x / 5) * 5;
}
export function  round10down(x: number) {
    return Math.floor(x / 10) * 10;
}

export function f2corr(f: number, a: number) {
    return f === 2 ? Math.abs(a * 2e-4) : 0;
}

export function distfrom5(x: number) {
    return x - round5down(x);
}


/**
 * Calculates the trim value based on the given parameters and speed.
 *
 * @param {number} keyInicial - The initial key value
 * @param {number} keyMaximo - The maximum key value
 * @param {number} valorInicial - The initial value
 * @param {number} valorMaximo - The maximum value
 * @param {number} punto - The point value
 * @param {number} [speed=1] - The speed value (default is 1)
 * @return {string} The calculated trim value rounded to one decimal place
 */
export function calculateTrim(keyInicial: number, keyMaximo: number, valorInicial: number, valorMaximo: number, punto: number, speed = 1) {
    // Normalizamos la velocidad para asegurarnos de que esté entre 0 y 2
    const velocidadNormalizada = Math.max(0, Math.min(2, speed));

    // Calculamos la proporción en función de la velocidad
    const proporcion = velocidadNormalizada === 0 ? 0 : Math.pow((punto - keyInicial) / (keyMaximo - keyInicial), (1 / Math.pow(speed, speed)) / velocidadNormalizada);

    // Calculamos el valor correspondiente en esa proporción entre los valores inicial y máximo
    const valorCalculado = valorInicial + proporcion * (valorMaximo - valorInicial);

    const valorFinal = parseFloat(valorCalculado.toFixed(1));

    if (valorFinal >= 0) {
        return `UP${valorFinal.toFixed(1).replace("+", "")}`
    }else {
        return `DN${valorFinal.toFixed(1).replace("-", "")}`
    }
}

