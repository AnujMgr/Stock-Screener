import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SelectWithSearch = ({
  name,
  options,
  id,
  instanceId,
  handleChange,
  label,
  controlBackgroundColor,
  dropdownMenuBackgroundColor,
  menuFontColor,
  hoverMenuColor,
  isMulti,
  selectedValues,
  borderColor,
}) => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: controlBackgroundColor ? controlBackgroundColor : '#1F2937', // Search Control Background Color
      borderColor: borderColor ? borderColor : '#374151',
      color: '#000',
    }),
    input: (base) => ({
      ...base,
      color: '#111827', // User Search Input Color
    }),
    menu: (base) => ({
      ...base,
      background: dropdownMenuBackgroundColor ? dropdownMenuBackgroundColor : '#F3F4F6',
      marginTop: 0,
      color: menuFontColor ? menuFontColor : '#fff', // Drop Down Item Color
      zIndex: 999,
    }),
    singleValue: (base) => ({
      ...base,
      color: '#000',
    }),
  };

  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: hoverMenuColor ? hoverMenuColor : '#E5E7EB', // Dropdown Item hover Background Color
      primary: '#1D4ED8', // Select Option Background Color
      color: '#000',
    },
  });

  return (
    <>
      <Select
        value={selectedValues}
        options={options}
        styles={customStyles}
        theme={theme}
        id={id}
        instanceId={instanceId}
        onChange={handleChange}
        name={name}
        isMulti={isMulti}
        isOptionDisabled={(option) => selectedValues.length >= 2}
      />
      {label ? (
        <label className="text-xs text-white" htmlFor={id}>
          {label}
        </label>
      ) : null}
    </>
  );
};

export default SelectWithSearch;
