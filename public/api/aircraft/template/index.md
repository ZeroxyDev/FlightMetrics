{
"type": "", // Type of the aircraft (e.g., A318-111)
"info": {
"manufacturer": "", // Manufacturer of the aircraft (e.g., Airbus)
"model": "", // Model of the aircraft (e.g., A318)
"engines": [{
"type": "", // Type of engine (e.g., Jet engine)
"model": "", // Model of the engine (e.g., CFM International CFM56-5B8/P)
"thrust": "" // Thrust of the engine (e.g., 98 kN)
}],
"dimensions": {
"length": "", // Length of the aircraft (e.g., 31.44 m)
"wingspan": "", // Wingspan of the aircraft (e.g., 34.10 m)
"height": "", // Height of the aircraft (e.g., 12.56 m)
"cabinWidth": "", // Width of the cabin (e.g., 3.70 m)
"wingArea": "" // Area of the wings (e.g., 122.4 m²)
},
"weight": {
"empty": "", // Empty weight of the aircraft (e.g., 39,500 kg)
"maxTakeoff": "", // Maximum takeoff weight of the aircraft (e.g., 68,000 kg)
"maxLanding": "", // Maximum landing weight of the aircraft (e.g., 57,500 kg)
"maxMZFW": "" // Maximum zero fuel weight of the aircraft (e.g., 59,000 kg)
},
"fuelCapacity": {
"mainTanks": "", // Capacity of the main fuel tanks (e.g., 18,100 L)
"centerTank": "" // Capacity of the center fuel tank (e.g., 8,080 L)
},
"flapConfigurations": [{ // Configurations for different flap settings during takeoff, approach, and landing
"type": "", // Type of configuration (e.g., Takeoff)
"options": [] // Options available for the configuration (e.g., ["1", "1+F", "2"])
}],
"features": {
"antiIce": [], // Systems for anti-icing (e.g., ["Engine", "Wings", "Tail"])
"airConditioning": false // Indicates whether the aircraft has air conditioning (true/false)
},
"temperatureFactor": 0, // A factor related to temperature
"trim": {
"interpolation": 1, // Interpolation value for trim (number, default 1)
"maxCG": null, // Maximum center of gravity (CG) value for trim
"minCG": null, // Minimum center of gravity (CG) value for trim
"max": null, // Maximum trim value
"min": null // Minimum trim value
},
"speeds": {
"flapsRetr": {}, // Speeds with flaps retracted (Format: "TOW": SPEED (ex. "35": 126))
"slatsRetr": {}, // Speeds with slats retracted (Format: "TOW": SPEED (ex. "35": 152))
"VSpeeds": {
"v1factor": 0, // V1 factor (This number will be the difference between v1 and vr, subtracting this from v1.)
"vrfactor": 0, // VR factor (This number will be the difference between vr and v3, subtracting this from vr.)
"1": {}, // V-speeds for configuration 1 (flaps 1+F) (Format: "TOW": SPEED (ex. "35": 117), is v2 speed)
"2": {}, // V-speeds for configuration 2 (flaps 2) (Format: "TOW": SPEED (ex. "35": 117), is v2 speed)
"3": {} // V-speeds for configuration 3 (flaps 1) (Format: "TOW": SPEED (ex. "35": 116), is v2 speed)
}
}
}
}
