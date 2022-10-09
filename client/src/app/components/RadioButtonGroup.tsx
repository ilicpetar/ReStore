import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React from "react";

interface Props {
    options: any[];
    onChange:(event:any) => void;
    selectedValue:string;
}

const RadioButtonGroup = ({options,onChange,selectedValue}:Props) => {
  return (
    <RadioGroup onChange={onChange} value={selectedValue}>
      {options.map(({ value, label }) => (
        <FormControlLabel
          value={value}
          control={<Radio />}
          label={label}
          key={value}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
