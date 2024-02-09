

const maxVisibleOptions = 4;


export const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#151515', border: '1px solid #484848', outline: 'none', boxShadow: 'none', borderRadius: '9999px',
        ':hover': {
            ...styles[':hover'],
            border: '1px solid #484848'
        },
        ':focus': {
            ...styles[':focus'],
            border: '1px solid #484848'
        }
    }),
    option: (styles: { [x: string]: any; }, { isDisabled }: any) => ({
        ...styles,
        backgroundColor: isDisabled ? '#151515' : '#151515',
        color: '#D1D5DB',
        borderBottom: 'none',
        borderRadius: '20px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
            ...styles[':active'],
            backgroundColor: '#151515',
        },
    }),
    menu: (styles: any) => ({ ...styles, backgroundColor: '#151515', border: '1px solid #484848', outline: 'none', borderRadius: '20px' }),
    menuList: (provided: any) => ({
        ...provided,
        maxHeight: `${maxVisibleOptions * 50}px`, // 40px es la altura aproximada de una opción
        overflowY: 'hidden',
        borderRadius: '20px'
    }),
    singleValue: (styles: any) => ({ ...styles, color: '#D1D5DB', borderRadius: '20px' }),
    multiValue: (styles: any) => ({
        ...styles,
        color: '#FFFFFF', backgroundColor: '#232323', border: '1px solid #484848', outline: 'none', borderRadius: '20px'
    }),
    multiValueLabel: (styles: any) => ({
        ...styles,
        color: '#FFFFFF',backgroundColor: '#232323',  outline: 'none',  borderRadius: '20px 0px 0px 20px'
    }),
    multiValueRemove: (styles: any) => ({
        ...styles,
        color: '#FFFFFF',backgroundColor: '#232323',  outline: 'none', borderRadius: '0px 20px 20px 0px',borderLeft: 'none',
        ':hover': {
            backgroundColor: '#262626',
            color: '#FFFFFF',
        },
    }),
    input: (styles: any) => ({ ...styles, color: '#D1D5DB' }),
    placeholder: (styles: any) => ({ ...styles, color: '#9CA3AF' }),
};
