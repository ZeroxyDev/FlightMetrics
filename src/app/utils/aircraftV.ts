//@ts-nocheck
// Tablas de datos para calcular la velocidad V2
export const to = [
    [
        // Config 1 + F
        (m: number) => {
            return 125 + (m - 40) * (155 - 125) / (80 - 40);
        },
        (m: number) => {
            return 125 + (m - 40) * (155 - 125) / (80 - 40);
        },
        (m: number) => {
            return 125 + (m - 40) * (155 - 125) / (80 - 40);
        },
        (m: number) => {
            return 130 + (m - 40) * (160 - 130) / (80 - 40);
        },
        (m: number) => {
            return 135 + (m - 40) * (165 - 135) / (80 - 40);
        },
        (m: number) => {
            return 140 + (m - 40) * (170 - 140) / (80 - 40);
        },
        (m: number) => {
            return 145 + (m - 40) * (175 - 145) / (80 - 40);
        },
        (m: number) => {
            return 150 + (m - 40) * (180 - 150) / (80 - 40);
        },
        (m: number) => {
            return 155 + (m - 40) * (185 - 155) / (80 - 40);
        },
        (m: number) => {
            return 160 + (m - 40) * (190 - 160) / (80 - 40);
        },
    ],
    [
        // Config 2
        (m: number) => {
            return 135 + (m - 40) * (165 - 135) / (80 - 40);
        },
        (m: number) => {
            return 140 + (m - 40) * (170 - 140) / (80 - 40);
        },
        (m: number) => {
            return 145 + (m - 40) * (175 - 145) / (80 - 40);
        },
        (m: number) => {
            return 150 + (m - 40) * (180 - 150) / (80 - 40);
        },
        (m: number) => {
            return 155 + (m - 40) * (185 - 155) / (80 - 40);
        },
        (m: number) => {
            return 160 + (m - 40) * (190 - 160) / (80 - 40);
        },
        (m: number) => {
            return 165 + (m - 40) * (195 - 165) / (80 - 40);
        },
        (m: number) => {
            return 170 + (m - 40) * (200 - 170) / (80 - 40);
        },
        (m: number) => {
            return 175 + (m - 40) * (205 - 175) / (80 - 40);
        },
        (m: number) => {
            return 180 + (m - 40) * (210 - 180) / (80 - 40);
        },
    ],
    [
        // Config 3
        (m: number) => {
            return 150 + (m - 40) * (180 - 150) / (80 - 40);
        },
        (m: number) => {
            return 155 + (m - 40) * (185 - 155) / (80 - 40);
        },
        (m: number) => {
            return 160 + (m - 40) * (190 - 160) / (80 - 40);
        },
        (m: number) => {
            return 165 + (m - 40) * (195 - 165) / (80 - 40);
        },
        (m: number) => {
            return 170 + (m - 40) * (200 - 170) / (80 - 40);
        },
        (m: number) => {
            return 175 + (m - 40) * (205 - 175) / (80 - 40);
        },
        (m: number) => {
            return 180 + (m - 40) * (210 - 180) / (80 - 40);
        },
        (m: number) => {
            return 185 + (m - 40) * (215 - 185) / (80 - 40);
        },
        (m: number) => {
            return 190 + (m - 40) * (220 - 190) / (80 - 40);
        },
        (m: number) => {
            return 195 + (m - 40) * (225 - 195) / (80 - 40);
        },
    ],
];

function correctCg(m: any, f: any, cg = 24) {
    return f(m, isNaN(cg) ? 24 : cg);
}


/**
 * Stall speed table
 * calls function(gross weight (t), landing gear) which returns CAS.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 9 represent gross weight (t) in 5t steps from 40 to 80.
 */
export const vs = [
    [
        () => 124,
        (m: number) => 124 + 1.4 * (m - 40),
        (m: number) => 131 + 1.4 * (m - 45),
        (m: number) => 138 + 1.4 * (m - 50),
        (m: number) => 145 + m - 55,
        (m: number) => 150 + 1.2 * (m - 60),
        (m: number) => 155 + 1.2 * (m - 65),
        (m: number) => 161 + m - 70,
        (m: number) => 166 + 1.2 * (m - 75),
        () => 172
    ], // Clean Conf
    [
        () => 93,
        (m: number) => 93 + m - 40,
        (m: number) => 98 + m - 45,
        (m: number) => 103 + m - 50,
        (m: number) => 108 + .8 * (m - 55),
        (m: number) => 112 + m - 60,
        (m: number) => 117 + .8 + (m - 65),
        (m: number) => 121 + .8 + (m - 70),
        (m: number) => 125 + m - 75,
        () => 130
    ], // Conf 1 + F
    [
        () => 91,
        (m: number) => 91 + m - 40,
        (m: number) => 96 + m - 45,
        (m: number) => 101 + .8 * (m - 50),
        (m: number) => 105 + m - 55,
        (m: number) => 110 + .8 * (m - 60),
        (m: number) => 114 + m - 65,
        (m: number) => 119 + .6 * (m - 70),
        (m: number) => 122 + .8 * (m - 75),
        () => 126
    ], // Conf 2
    [
        (_: any, ldg: number) => 91 - ldg * 2,
        (m: number, ldg: number) => 91 + m - 40 - ldg * 2,
        (m: number, ldg: number) => 96 + m - 45 - ldg * 2,
        (m: number, ldg: number) => 101 + .8 * (m - 50) - ldg * 2,
        (m: number, ldg: number) => 105 + m - 55 - ldg * 2,
        (m: number, ldg: number) => 110 + .8 * (m - 60) - ldg * 2,
        (m: number, ldg: number) => 114 + m - 65 - ldg * 2,
        (m: number, ldg: number) => 119 + .6 * (m - 70) - ldg * 2,
        (m: number, ldg: number) => 122 + .8 * (m - 75) - ldg * 2,
        (_: any, ldg: number) => 126 - ldg * 2
    ], // Conf 3
    [
        () => 84,
        (m: number) => 84 + .8 * (m - 40),
        (m: number) => 88 + m - 45,
        (m: number) => 93 + .8 * (m - 50),
        (m: number) => 97 + .8 * (m - 55),
        (m: number) => 101 + .8 * (m - 60),
        (m: number) => 105 + .8 * (m - 65),
        (m: number) => 109 + .8 * (m - 70),
        (m: number) => 113 + .6 * (m - 75),
        () => 116
    ], // Conf Full
    [
        () => 102,
        (m: number) => 102 + m - 40,
        (m: number) => 107 + m - 45,
        (m: number) => 112 + m - 50,
        (m: number) => 117 + 1.2 * (m - 55),
        (m: number) => 123 + .8 * (m - 60),
        (m: number) => 127 + m - 65,
        (m: number) => 132 + m - 70,
        (m: number) => 137 + .8 * (m - 75),
        () => 141
    ] // Conf 1
];

/**
 * Lowest selectable Speed Table
 * calls function(gross weigh (t), landing gear) which returns CAS, automatically compensates for cg.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 9 represent gross weight (t) in 5t steps from 40 to 80.
 */
export const vls = [
    [
        () => 159,
        (m: number) => 159 + 1.8 * (m - 40),
        (m: number) => 168 + 1.8 * (m - 45),
        (m: number) => 177 + 1.8 * (m - 50),
        (m: number) => 186 + 1.2 * (m - 55),
        (m: number) => 192 + 1.2 * (m - 60),
        (m: number) => 198 + 1.6 * (m - 65),
        (m: number) => 206 + 1.2 * (m - 70),
        (m: number) => 212 + 1.6 * (m - 75),
        () => 220
    ], // Clean Config
    [
        () => 114,
        (m: number) => 114 + 1.4 * (m - 40),
        (m: number) => 121 + 1.2 * (m - 45),
        (m: number) => 127 + 1.2 * (m - 50),
        (m: number) => 133 + m - 55,
        (m: number) => 138 + 1.2 * (m - 60),
        (m: number) => 144 + m - 65,
        (m: number) => 149 + m - 70,
        (m: number) => 154 + 1.2 * (m - 75),
        () => 160
    ], // Config 1 + F
    [
        () => 110,
        (m: number) => 110 + 1.8 * (m - 40),
        (m: number) => 119 + 1.2 * (m - 45),
        (m: number) => 125 + 1.2 * (m - 50),
        (m: number) => 131 + 1.2 * (m - 55),
        (m: number) => 137 + m - 60,
        (m: number) => 142 + .6 * (m - 65),
        (m: number) => 145 + .8 * (m - 70),
        (m: number) => 149 + m - 75,
        () => 154
    ], // Config 2
    [
        (_: any, ldg: number) => 117 - ldg,
        (m: any, ldg: number) => correctCg(m, (m: number, cg: number) => cg < 25 ? 117 + .4 * (m - 40) : 117) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: number, cg: number) => cg < 25 ? 119 + 1.2 * (m - 45) : 117 + 1.4 * (m - 45)) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: number, cg: number) => cg < 25 ? 125 + 1.2 * (m - 50) : 124 + 1.2 * (m - 50)) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: number, cg: number) => cg < 25 ? 131 + 1.2 * (m - 55) : 130 + m - 55) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: number, cg: number) => cg < 25 ? 137 + m - 60 : 135 + 1.2 * (m - 60)) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: string | number, cg: number) => (cg < 25 ? 142 : 141) + m - 65) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: string | number, cg: number) => (cg < 25 ? 147 : 146) + m - 70) - ldg,
        (m: any, ldg: number) => correctCg(m, (m: number, cg: number) => cg < 25 ? 152 + .8 * (m - 75) : 151 + m - 65) - ldg,
        (_: any, ldg: number) => 156 - ldg
    ], // Config 3
    [
        () => 116,
        () => 116,
        () => 116,
        (m: any) => 116 + correctCg(m, (m: number, cg: number) => (cg < 25 ? .8 : .6) * (m - 50)),
        (m: any) => correctCg(m, (m: string | number, cg: number) => (cg < 25 ? 120 : 119) + m - 55),
        (m: any) => correctCg(m, (m: string | number, cg: number) => (cg < 25 ? 125 : 124) + m - 60),
        (m: any) => correctCg(m, (m: string | number, cg: number) => (cg < 25 ? 130 : 129) + m - 65),
        (m: any) => correctCg(m, (m: number, cg: number) => cg < 25 ? 135 + .8 * (m - 70) : 134 + m - 70),
        (m: number) => 139 + .8 * (m - 75),
        () => 143
    ], // Config Full
    [
        () => 125,
        (m: number) => 125 + 1.4 * (m - 40),
        (m: number) => 132 + 1.2 * (m - 45),
        (m: number) => 138 + 1.2 * (m - 50),
        (m: number) => 144 + 1.4 * (m - 55),
        (m: number) => 151 + m - 60,
        (m: number) => 156 + 1.2 * (m - 65),
        (m: number) => 162 + 1.4 * (m - 70),
        (m: number) => 169 + .8 * (m - 75),
        () => 173
    ] // Config 1
];

/**
 * Lowest selectable Speed Table for TakeOff ONLY
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 9 represent gross weight (t) in 5t steps from 40 to 80.
 */
export const vlsTo = [
    vls[0], // Clean Config
    [
        () => 105,
        (m: number) => 105 + 1.2 * (m - 40),
        (m: number) => 111 + m - 45,
        (m: number) => 116 + 1.2 * (m - 50),
        (m: number) => 122 + m - 55,
        (m: number) => 127 + m - 60,
        (m: number) => 132 + m - 65,
        (m: number) => 137 + .8 * (m - 70),
        (m: number) => 141 + 1.2 * (m - 75),
        () => 147
    ], // Config 1 + F
    [
        (_: any) => 101,
        (m: number) => 101 + 1.4 * (m - 40),
        (m: number) => 108 + 1.2 * (m - 45),
        (m: number) => 114 + m - 50,
        (m: number) => 119 + 1.2 * (m - 55),
        (m: number) => 125 + m - 60,
        (m: number) => 130 + .4 * (m - 65),
        (m: number) => 132 + .8 * (m - 70),
        (m: number) => 136 + .8 * (m - 75),
        () => 140
    ], // Config 2
    [
        () => 101,
        (m: number) => 101 + m - 40,
        (m: number) => 106 + 1.2 * (m - 45),
        (m: number) => 112 + .8 * (m - 50),
        (m: number) => 116 + 1.2 * (m - 55),
        (m: number) => 122 + m - 60,
        (m: number) => 127 + m - 65,
        (m: number) => 132 + .8 * (m - 70),
        (m: number) => 136 + .8 * (m - 75),
        () => 140
    ], // Config 3
    vls[4], // Config Full
    vls[5] // Config 1
];

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
    (m: number, v: number) => 152,
    (m: number, v: number) => 152 + 1.8 * (m - 40),
    (m: number, v: number) => 161 + 1.6 * (m - 45),
    (m: number, v: number) => 169 + 1.8 * (m - 50),
    (m: number, v: number) => 178 + 1.6 * (m - 55),
    (m: number, v: number) => 186 + 1.4 * (m - 60),
    (m: number, v: number) => 193 + 1.4 * (m - 65),
    (m: number, v: number) => 200 + 1.4 * (m - 70),
    (m: number, v: number) => 207 + 1.4 * (m - 75),
    () => 214
];

const vmca = [
    [-2000, 115],
    [0, 114],
    [2000, 114],
    [4000, 113],
    [6000, 112],
    [8000, 109],
    [10000, 106],
    [12000, 103],
    [14100, 99],
    [15100, 97],
];

const vmcg = [ // 1+F, 2, 3 all the same
    [-2000, 117],
    [0, 116],
    [2000, 116],
    [4000, 115],
    [6000, 114],
    [8000, 112],
    [10000, 109],
    [12000, 106],
    [14100, 102],
    [15100, 101],
];

/**
 * Vfe for Flaps/Slats
 * @type {number[]}
 */
export const vfeFS = [
    215, // Config 1 + F
    200, // Config 2
    185, // Config 3
    177, // Config Full
    230 // Config 1
];

export function _getVfeNIdx(fi) {
    switch (fi) {
        case 0: return 4;
        case 5: return 1;
        default: return fi;
    }
}

const Vmo = 350;
const Mmo = 0.82;


export function _computeGD(m) {
    return m * 2 + 85;
}

export function _compensateForMachEffect(v, alt) {
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