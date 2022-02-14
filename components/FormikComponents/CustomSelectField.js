import { useTheme } from 'next-themes';
import React from 'react';
import Select from 'react-select';

// Source :https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8

const CustomSelectField = ({ options, field, form, isMultiSelect }) => {
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

  const onChange = (option) => {
    form.setFieldValue(field.name, isMultiSelect ? option.map((item) => item.value) : option.value);
  };

  const getValue = () => {
    console.log(options);
    if (options) {
      return isMultiSelect
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMultiSelect ? [] : '';
    }
  };
  return (
    <>
      <Select
        options={options}
        name={field.name}
        // value={options ? options.find((option) => option.value === field.value) : ''}
        value={getValue()}
        onChange={onChange}
        onBlur={field.onBlur}
        isMulti={isMultiSelect}
        styles={customStyles}
        theme={customTheme}
      />
    </>
  );
};

export default CustomSelectField;
