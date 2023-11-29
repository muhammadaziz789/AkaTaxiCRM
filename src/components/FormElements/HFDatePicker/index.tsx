import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import CDatePicker from "../CDatePicker";
import CLabel from "../../CElements/CLabel";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  input: {
    "&::placeholder": {
      color: "#fff",
    },
  },
}));

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

const HFDatePicker = ({
  control,
  isBlackBg = false,
  className,
  name,
  label = "",
  placeholder = "",
  isFormEdit = false,
  defaultValue = "",
  required = false,
  setValue = () => {},
}: Props) => {
  const classes = useStyles();

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <>
      {label ? <CLabel required={required} title={label} /> : ""}
      <Controller
        control={control}
        name={name}
        disabled
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className={className}>
            <CDatePicker
              isFormEdit={isFormEdit}
              placeholder={placeholder}
              isBlackBg={isBlackBg}
              value={value}
              onChange={onChange}
              classes={classes}
              error={error}
            />
          </div>
        )}
      ></Controller>
    </>
  );
};

export default HFDatePicker;
