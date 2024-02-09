"use client"
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchExternalAPI, fetchLocalAPI } from '../utils/API';
import { calculateFlexTemp, calculateV, calculateV1, calculateVR, calculatev2 } from '../core/calculation';
import { useMCDU } from '../context/mcduContext';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";
import Button from '../UI/buttons/button';
import InProgress from '../UI/progress/in-progress';
import { colourStyles } from '../UI/style/select-styles';
import { TransformedObject, transformAirportObject } from '../utils/convert';


interface SelectType {
    value: string;
    label: string;
}

interface AirportDetails {
    [key: string]: any;
}

interface AircraftDetails {
    [key: string]: any;
}

export default function Calculate() {
    const [selectedAirport, setSelectedAirport] = useState<SelectType | null>(null);
    const [selectedRunway, setSelectedRunway] = useState<SelectType | null>(null);
    const [aircraftType, setAircraftType] = useState<SelectType | null>(null);
    const [selectedGW, setSelectedGW] = useState<number>(0);
    const [selectedCG, setSelectedCG] = useState<number>(0);
    const [selectedFlapConfig, setSelectedFlapConfig] = useState<SelectType | null>(null);
    const [antiIce, setAntiIce] = useState<SelectType | null>(null);
    const [antiIceOptions, setAntiIceOptions] = useState<SelectType[]>([]);
    const [hasAirConditioning, setHasAirConditioning] =  useState<SelectType | null>(null);
    const [actualStep, setActualStep] = useState<number>(0);
    const [airportOptions, setAirportOptions] = useState<SelectType[]>([]);
    const [runwayOptions, setRunwayOptions] = useState<SelectType[]>([]);
    const [aircraftOptions, setAircraftOptions] = useState<SelectType[]>([]);
    const [airportDetails, setAirportDetails] = useState<AirportDetails | null>(null);
    const [aircraftDetails, setAircraftDetails] = useState<AircraftDetails | null>(null);
    const [flapConfigOptions, setFlapConfigOptions] = useState<SelectType[]>([]);
    const [airConditioningOptions, setAirConditioningOptions] = useState<SelectType[]>([]);
    const [isReadyToProceed, setIsReadyToProceed] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<string | null>(null);
    const [runwayCondition, setRunwayCondition] = useState<SelectType | null>(null); 
    const [selectedQNH, setSelectedQNH] = useState<number>(0);
    const [selectedTemperature, setSelectedTemperature] = useState<number>(0);
    const [selectedWindDeg, setSelectedWindDeg] = useState<number>(0);
    const [selectedWindKt, setSelectedWindKt] = useState<number>(0);
    const [selectedTransAlt, setSelectedTransAlt] = useState<number>(0);
    const [airportICAO, setAirportICAO] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [noise, setNoise] = useState<SelectType | null>(null); 
    const [noiseOptions, setNoiseOptions] = useState<SelectType[]>([
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
    ]);
    

    const [runwayConditionOptions, setRunwayConditionOptions] = useState<SelectType[]>([
        { value: 'dry', label: 'Dry' },
        { value: 'wet', label: 'Wet' }
    ]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [aircraftData] = await Promise.all([
                    fetchLocalAPI('aircrafts')
                ]);

                const aircraftOptions = aircraftData.map((aircraft: any) => ({
                    value: aircraft.type,
                    label: `${aircraft.label}`
                }));

                setAirportOptions(airportOptions);
                setAircraftOptions(aircraftOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchAircraftDetails() {
            if (aircraftType) {
                try {
                    const response = await fetchLocalAPI(`aircraft/${aircraftType.value}`);
                    setAircraftDetails(response);
                    setFlapConfigOptions(response.info.flapConfigurations[0].options.map((config: any, index: number) => ({
                        value: index.toString(),
                        label: config
                    })));
                    if (response.info.features) {
                        setAntiIceOptions(response.info.features.antiIce.map((antiIce: any) => ({ value: antiIce, label: antiIce })));
                        if (response.info.features.airConditioning) {
                            setAirConditioningOptions([{ value: 'on', label: 'On' }, { value: 'off', label: 'Off' }]);
                        }
                        setHasAirConditioning(response.info.features.airConditioning);
                    }
                } catch (error) {
                    console.error('Error fetching aircraft details:', error);
                }
            }
        }

        fetchAircraftDetails();
    }, [aircraftType]);

    async function checkandsetICAO() {
        if (actualStep === 0) {
            setLoading(true);
            setSelectedAirport({
                value: airportICAO.toUpperCase(),
                label: `${airportICAO}`
            });
            try {
                const responseExternal = await fetchExternalAPI(`https://raw.githubusercontent.com/zeroxydev/runways-db/main/icao/${(airportICAO.toUpperCase())}.json`);
                    // Transformar el objeto de ejemplo
                    let transformedAirportObject: TransformedObject = transformAirportObject({
                        ...responseExternal
                    });
                    setIsReadyToProceed(true);
                    setAirportDetails(transformedAirportObject);
                    setRunwayOptions(transformedAirportObject.runways.map((runway: any) => ({
                        value: runway.id,
                        label: runway.name
                    })));
                    setLoading(false);

                    console.log(responseExternal);
                    return true;
            } catch (error) {
                setShowAlert('Invalid ICAO code');   
                setLoading(false);
                return false
            }
        }
    }

    const handleNextStep = async () => {

        if(actualStep === 0 && ! await checkandsetICAO()) return


        setShowAlert(null);
        if (isReadyToProceed) {
            setActualStep(prevStep => prevStep + 1);
        } else {
            setShowAlert('Please select a valid answer.');
        }
    };

    const handlePrevStep = () => {
        setActualStep(prevStep => prevStep - 1);
    };

    const { mcduSettings, updateMCDUSettings } = useMCDU();

    const router = useRouter();


    const handleSubmit = async () => {

        if (!isReadyToProceed) {
            setShowAlert('Please select a valid answer to finish.');
        }

        const formData = {
            airport: {
                airport: selectedAirport?.value,
                runway: selectedRunway?.label,
                runwayCondition: runwayCondition?.value,
                ...airportDetails,
                temperature: selectedTemperature
            },
            aircraft: {
                type: aircraftType?.value,
                flapConfiguration: selectedFlapConfig?.label,
                //@ts-ignore
                antiIceType: antiIce?.map((antiIce: { value: any; }) => antiIce.value),
                airConditioning: hasAirConditioning?.value,
                ...aircraftDetails
            },
            flightDetails: {
                grossWeight: selectedGW,
                centerOfGravity: selectedCG,
                QNH: selectedQNH,
                temperature: selectedTemperature,
                windDirection: selectedWindDeg,
                windSpeed: selectedWindKt,
                transitionAlt: selectedTransAlt,
            },
            // Puedes incluir más secciones según sea necesario
        };

    
        const v2 = calculatev2(formData);
        const v1 = calculateV1(v2);
        const vr = calculateVR(v2);

        const calculateTrim = fetchLocalAPI('trim/' + aircraftDetails?.type).then((data) => {
            return data[selectedCG.toFixed(1)]
        });

        const trim = await calculateTrim
        const thrRed = airportDetails?.elevation + 1500
        const thrAcc = noise?.value === "no" ? airportDetails?.elevation + 1500 : airportDetails?.elevation + 2500
        const engOut = thrAcc // Calcular el valor de engOut, placeholder
        
        
        const vconf = calculateV(formData, false);

        const flexTemp = calculateFlexTemp(formData);

        const performance ={
            "V1": v1,
            "VR": vr,
            "V2": v2,
            //@ts-ignore
            "flaps": parseInt(selectedFlapConfig?.label[0]) ,
            "trim": trim,
            "thrRed": thrRed,
            "thrAcc": thrAcc,
            "engOut": engOut,
            "transitionAltitude": selectedTransAlt,
            "flpretr": vconf.flaps,
            "slrretr": vconf.slats,
            "clean": vconf.clean,
            "flexTemp": flexTemp,
            "runway": selectedRunway?.label
        }

        updateMCDUSettings(performance);

        router.push('/result');
        

        console.log(performance);

    };
    


// Función para verificar si todas las respuestas obligatorias han sido completadas
useEffect(() => {
    setIsReadyToProceed(checkRequiredAnswers());
}, [selectedAirport, selectedRunway, runwayCondition, aircraftType, selectedFlapConfig, antiIce, hasAirConditioning, selectedGW, selectedCG, actualStep, selectedQNH, selectedTemperature, selectedWindDeg, selectedWindKt, noise]);


    const createSelect = (label: string, value: SelectType | null, options: SelectType[], handleChange: (option: SelectType | null) => void, isMulti: boolean, required: boolean, desc?: string) => (
        <div className="col-span-2 flex justify-center items-center flex-col  w-full gap-2">
               <div className='flex justify-center items-center'>
                {actualStep !== 0 && <button className='transition h-fit mr-4 duration-300 border border-tertiary bg-button hover:bg-buttonHover text-white py-2 px-2 rounded-[20px] text-center' onClick={handlePrevStep}><IoIosArrowBack /></button>}
                <label className='text-[30px] w-full text-center'>{label}{/* {required && <span className="text-red-500">*</span>} */}</label>
                </div>
            <label className='text-[15px] text-[#888888] w-full text-center'>{desc}</label>
            <div className='mt-4 w-[70%] mb-4'>
                <Select
                    value={value}
                    onChange={(selectedOption) => handleChange(selectedOption as SelectType)}
                    options={options}
                    id={`${label.toLowerCase()}Select`}
                    instanceId={`${label.toLowerCase()}Select`}
                    styles={colourStyles}
                    isMulti={isMulti} // Enable multi-select
                />
                  {showAlert && <div className='text-[#888888] mt-4 text-center text-sm '>{showAlert}</div>}
            </div>
          
        </div>
    );

    const createInputOption = (label: string, value: number, handleChange: (newValue: number) => void, unit: string, required: boolean, desc?: string) => {


        const formatNumber = (value: string) => {
   
            if (unit === 'cg') {
                const formattedValue = value.replace(/\D/g, '');
                if (formattedValue.length <= 2) {
                    return formattedValue.slice(0, 4);
                } else {
                    const final = formattedValue.slice(0, 2) + '.' + formattedValue.slice(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    return final.slice(0, 4);
                }
            } else if (unit === 'gw') {
                return value.slice(0, 7);
            } else {
                return value;
            }
        };

        
        return (
            <div className="col-span-2 flex justify-center items-center flex-col w-full gap-2">
               
                <div className='flex justify-center items-center'>
                {actualStep !== 0 && <button className='transition h-fit mr-4 duration-300 border border-tertiary bg-button hover:bg-buttonHover text-white py-2 px-2 rounded-[20px] text-center' onClick={handlePrevStep}><IoIosArrowBack /></button>}
                <label className='text-[30px] w-full text-center'>{label}{/* {required && <span className="text-red-500">*</span>} */}</label>
                </div>

                <label className='text-[15px] text-[#888888] w-full text-center'>{desc}</label>
                <div className='mt-4 w-[70%] mb-4'>
                    <input
                        value={value ? formatNumber(value.toString()) : ''}
                        onChange={(e) => {
                            const unformattedValue = parseFloat(e.target.value);
                            handleChange(parseFloat(formatNumber(unformattedValue.toString())));
                        }}
                        id={`selected${label}`}
                        type='text'
                        placeholder='Enter value in range...'
                        className='border outline-none rounded-[20px] border-tertiary w-full bg-button hover:bg-buttonHover text-white py-2 px-4 text-center'
                    />
                     {showAlert && <div className='text-[#888888] mt-4 text-center text-sm '>{showAlert}</div>}
                </div>
            </div>
        );
    };


    const createInputOptionText = (label: string, value: string, handleChange: (newValue: string) => void, unit: string, required: boolean, desc?: string, placeholder?: string) => {
        
        return (
            <div className="col-span-2 flex justify-center items-center flex-col w-full gap-2">
               
                <div className='flex justify-center items-center'>
                {actualStep !== 0 && <button className='transition h-fit mr-4 duration-300 border border-tertiary bg-button hover:bg-buttonHover text-white py-2 px-2 rounded-[20px] text-center' onClick={handlePrevStep}><IoIosArrowBack /></button>}
                <label className='text-[30px] w-full text-center'>{label}{/* {required && <span className="text-red-500">*</span>} */}</label>
                </div>

                <label className='text-[15px] text-[#888888] w-full text-center'>{desc}</label>
                <div className='mt-4 w-[70%] mb-4'>
                    <input
                        value={value?.toString() ? value?.toString() : ''}
                        onChange={(e) => {
                            handleChange(e.target.value);
                        }}
                        id={`selected${label}`}
                        type='text'
                        placeholder={placeholder || 'Enter anything...'}
                        className='border outline-none rounded-[20px] border-tertiary w-full bg-button hover:bg-buttonHover text-white py-2 px-4 text-center'
                    />
                     {showAlert && <div className='text-[#888888] mt-4 text-center text-sm '>{showAlert}</div>}
                </div>
            </div>
        );
    };



    const checkRequiredAnswers = () => {
        switch (actualStep) {
            case 0:
                return airportICAO !== null;
            case 1:
                return selectedRunway !== null;
            case 2:
                return runwayCondition !== null;
            case 3:
                return selectedTransAlt >= 0 && selectedTransAlt <= 20000;
            case 4:
                return aircraftType !== null;
            case 5:
                return selectedFlapConfig !== null;
            case 6:
                return true;
            case 7:
                return hasAirConditioning?.value !== null;
            case 8:
                return noise !== null;
            case 9:
                return selectedGW >= parseInt(aircraftDetails?.info.weight.empty) * 1000 && selectedGW <= parseInt(aircraftDetails?.info.weight.maxTakeoff) * 1000;
            case 10:
                return selectedCG >= 8.0 && selectedCG <= 50.0;
            case 11:
                return selectedQNH >= 800 && selectedQNH <= 1100;
            case 12:
                return selectedTemperature >= -100 && selectedTemperature <= 100;
            case 13:
                return (selectedWindDeg >= 0 && selectedWindDeg <= 360)
            case 14:
                return (selectedWindKt >= 0 && selectedWindKt <= 250);
            default:
                return false;
        }
    };
    

    const renderStep = () => {
        switch (actualStep) {
            case 0:
                return createInputOptionText('Enter your airport ICAO', airportICAO.toUpperCase(), setAirportICAO, 'airport', true, "Enter your airport name.", "Enter your airport ICAO.");
 /*                return createSelect('Select your airport', selectedAirport, airportOptions, setSelectedAirport, false, true, "Choose an airport to take flight from."); */
            case 1:
                return createSelect('Select your runway', selectedRunway, runwayOptions, setSelectedRunway, false, true, "Choose your runway to take flight from.");
            case 2:
                return createSelect('Select runway condition', runwayCondition, runwayConditionOptions, setRunwayCondition, false, true, "Choose the condition of your runway.");
            case 3:
                return createInputOption('Enter your transition altitude', selectedTransAlt, setSelectedTransAlt, 'transalt', true, "Enter your transition altitude in feet.");
            case 4:
                return createSelect('Select your aircraft', aircraftType, aircraftOptions, setAircraftType, false, true, "Choose your aircraft.");
            case 5:
                return createSelect('Select your Flap Configuration', selectedFlapConfig, flapConfigOptions, setSelectedFlapConfig, false, true, "Choose your flap configuration.");
            case 6:
                return createSelect('Select your Anti-ice ON Type', antiIce, antiIceOptions, setAntiIce, true, false, "Choose your aircraft Anti-ice Type.");
            case 7:
                return createSelect('Select your Air Conditioning capability', hasAirConditioning, airConditioningOptions, setHasAirConditioning, false, true, "Choose your aircraft Air Conditioning capability.");
            case 8:
                return createSelect('Is noise reduction required?', noise, noiseOptions, setNoise, false, true, "Are you requiring noise reduction on your flight?");
            case 9:
                return createInputOption('Select your Gross Weight', selectedGW, setSelectedGW, 'gw', true, "Enter the Gross Weight of your aircraft in kg.");
            case 10:
                return createInputOption('Select your Center of Gravity', selectedCG, setSelectedCG, 'cg', true, "Enter the Center of Gravity of your aircraft.");
            case 11:
                return createInputOption('Enter QNH (hPa)', selectedQNH, setSelectedQNH, 'qnh', true, "Enter the QNH of your airport in hPa.");
            case 12:
                return createInputOption('Enter Temperature (°C)', selectedTemperature, setSelectedTemperature, 'temperature', true, "Enter the Temperature of your airport in °C.");
            case 13:
                return createInputOption('Enter wind deg', selectedWindDeg, setSelectedWindDeg, 'winddeg', true, "Enter the wind direction in degrees.");
            case 14:
                return createInputOption('Enter wind kt', selectedWindKt, setSelectedWindKt, 'windkt', true, "Enter the wind speed in knots.");
            default:
                return null;
        }
    };

    return (
        <div className="container flex justify-center items-center flex-col w-screen h-screen mx-auto p-8">
            <div className="flex-col flex justify-center items-center grid-cols-2 max-w-[500px] w-full gap-4">
                <InProgress actualStep={actualStep}></InProgress>
                <div className='z-[100] w-full '>
                {renderStep()}</div>
                <div className=' flex justify-center items-center w-full'>
                {actualStep <= 13 && <Button loading={loading} text="Next" handleFunction={handleNextStep}></Button>}
                {actualStep > 13 &&  <Button loading={loading} text="Submit" handleFunction={handleSubmit}></Button>}              
                </div>
            </div>
        </div>
    );
}
