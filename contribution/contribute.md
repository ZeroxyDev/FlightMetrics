# Adding Aircraft to the Project

## Update the Aircraft Index

Navigate to the `public/api/aircrafts/index.json` file and add a new entry with the basic information of the aircraft. For example:

```json
{
  "base": "A20N",
  "type": "A320-251N",
  "label": "Airbus A320neo"
}
```

## Update the Aircraft Index

Next, go to the public/api/aircraft/[exact_model_name_folder]/index.json file and ensure it follows the provided format:

```json
{
  "type": "A320-251N",
  "info": {
    "manufacturer": "Airbus",
    "model": "A20N",
    "engines": [
      {
        "type": "Jet engine",
        "model": "CFM International LEAP-1A",
        "thrust": "140 kN"
      }
    ],
    "dimensions": {
      "length": "37.57 m",
      "wingspan": "35.80 m",
      "height": "11.76 m",
      "cabinWidth": "3.70 m",
      "wingArea": "122.4 m²"
    },
    "weight": {
      "empty": "42,600 kg",
      "maxTakeoff": "79,000 kg",
      "maxLanding": "68,000 kg",
      "maxMZFW": "64,300 kg"
    },
    "fuelCapacity": {
      "mainTanks": "24,210 L",
      "centerTank": "12,220 L"
    },
    "flapConfigurations": [
      {
        "type": "Takeoff",
        "options": ["1", "1+F", "2"]
      },
      {
        "type": "Approach",
        "options": ["1", "2", "3"]
      },
      {
        "type": "Landing",
        "options": ["Full", "3"]
      }
    ],
    "features": {
      "antiIce": ["Engine", "Wings", "Tail"],
      "airConditioning": true
    },
    "temperatureFactor": 41,
    "trim": {
      "interpolation": 1,
      "maxCG": 40,
      "minCG": 17,
      "max": 2.5,
      "min": -2.5
    },
    "speeds": {
      "flapsRetr": {
        "35": 131,
        "40": 131,
        "45": 131,
        "50": 133,
        "55": 138,
        "60": 144,
        "65": 150,
        "70": 155,
        "75": 160,
        "80": 166
      },
      "slatsRetr": {
        "35": 152,
        "40": 152,
        "45": 161,
        "50": 169,
        "55": 178,
        "60": 186,
        "65": 193,
        "70": 200,
        "75": 207,
        "80": 214
      },
      "VSpeeds": {
        "v1factor": 0,
        "vrfactor": 0,
        "1": {
          "35": 126,
          "40": 126,
          "45": 126,
          "50": 127,
          "55": 127,
          "60": 132,
          "65": 137,
          "70": 142,
          "75": 147,
          "80": 152
        },
        "2": {
          "35": 126,
          "40": 126,
          "45": 126,
          "50": 126,
          "55": 127,
          "60": 127,
          "65": 132,
          "70": 137,
          "75": 141,
          "80": 146
        },
        "3": {
          "35": 125,
          "40": 125,
          "45": 125,
          "50": 125,
          "55": 125,
          "60": 128,
          "65": 129,
          "70": 132,
          "75": 141,
          "80": 141
        }
      }
    }
  }
}
```

## Add Aircraft Image

Finally, place the image of the aircraft in the public/images/aircrafts/[model_name.png] directory. The image should follow the design of the existing images and have dimensions of 1719px/519px, you can use the .psd file.
