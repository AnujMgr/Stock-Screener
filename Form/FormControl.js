import React from "react";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";

function FormControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <FormInput {...rest} />;
    case "select":
      return <FormSelect {...rest} />;
  }
}

export default FormControl;
