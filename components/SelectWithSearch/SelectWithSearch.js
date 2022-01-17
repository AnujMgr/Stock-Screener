import { useTheme } from 'next-themes';
import React from 'react';
import Select from 'react-select';

const SelectWithSearch = ({ name, options, id, handleChange, label, isMulti, selectedValue, placeholder }) => {
  const { theme } = useTheme();
  const isLight = theme == 'light';

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: isLight ? '#F3F4F6' : '#1F2937', // Search Control Background Color
      borderColor: isLight ? '#6B7280' : '#374151',
      color: '#00fff0',
    }),
    input: (base) => ({
      ...base,
      color: isLight ? '#000' : '#fff', // User Search Input Color
    }),
    menu: (base) => ({
      ...base,
      background: isLight ? '#F3F4F6' : '#1F2937',
      marginTop: 0,
      color: isLight ? '#000' : '#fff', // Drop Down Item Color
      zIndex: 999,
    }),
    singleValue: (base) => ({
      ...base,
      color: isLight ? '#000' : '#fff',
    }),
  };

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: isLight ? '#E5E7EB' : '#111827', // Dropdown Item hover Background Color
      primary: '#1D4ED8', // Select Option Background Color
      color: '#000',
    },
  });

  return (
    <>
      <Select
        value={selectedValue}
        options={options}
        styles={customStyles}
        theme={customTheme}
        id={id}
        onChange={handleChange}
        name={name}
        isMulti={isMulti}
        isOptionDisabled={(option) => (isMulti ? selectedValues.length >= 2 : false)}
        placeholder={placeholder}
      />
      {label ? (
        <label className="text-xs text-gray-900 dark:text-white" htmlFor={id}>
          {label}
        </label>
      ) : null}
    </>
  );
};

export default SelectWithSearch;
