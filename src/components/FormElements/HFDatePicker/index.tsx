// import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import { useEffect } from "react";
// import FormDatePicker from "../FormDatePicker";

// const useStyles = makeStyles(() => ({
//   input: {
//     "&::placeholder": {
//       color: "#fff",
//     },
//   },
// }));

interface Props {
  control: any;
  isBlackBg?: any;
  className?: string;
  name: string;
  label?: string;
  inputProps?: any;
  disabledHelperText?: any;
  placeholder?: string;
  isFormEdit?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  setValue?: (val1?: any, val2?: any) => void;
}

const HFDatepicker = ({
  control,
  // isBlackBg = false,
  className,
  name,
  label = "",
  // placeholder = "",
  // isFormEdit = false,
  defaultValue = "",
  required = false,
  setValue = () => {},
}: Props) => {
  // const classes = useStyles();

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div className="flex flex-col">
      {label ? <CLabel required={required} title={label} /> : ""}
      <Controller
        control={control}
        name={name}
        disabled
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div className={className}>
            <input type="text" onChange={onChange} value={value} />
            {/* <FormDatePicker
              isFormEdit={isFormEdit}
              placeholder={placeholder}
              isBlackBg={isBlackBg}
              value={value}
              onChange={onChange}
              classes={classes}
              error={error}
            /> */}
          </div>
        )}
      ></Controller>
    </div>
  );
};

export default HFDatepicker;
