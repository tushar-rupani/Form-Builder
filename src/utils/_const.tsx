import TerminalIcon from "@mui/icons-material/Terminal";
import NumbersIcon from "@mui/icons-material/Numbers";
import PasswordIcon from "@mui/icons-material/Password";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoneIcon from "@mui/icons-material/Done";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TextFieldsIcon from "@mui/icons-material/TextFields";
export const dataForElements = [
  { icon: "terminal", text: "Input Box" },
  { icon: "textarea", text: "Text Area" },
  { icon: "number", text: "Number" },
  { icon: "password", text: "Password" },
  { icon: "checkbox", text: "CheckBox" },
  { icon: "select", text: "Select" },
  { icon: "radio", text: "Radio" },
  { icon: "button", text: "Button" },
  { icon: "date", text: "Date Picker" },
  { icon: "file", text: "File" },
];

export const indexForElement = {
  0: "Input Box",
  1: "Text Area",
  2: "Number",
  3: "Password",
  4: "Checkbox",
  5: "Select",
  6: "Radio",
  7: "Button",
  8: "Date Picker",
  9: "File"
}

export const iconObjectInitial: { [key: string]: JSX.Element } = {
  terminal: <TerminalIcon />,
  textarea: <TextFieldsIcon />,
  number: <NumbersIcon />,
  password: <PasswordIcon />,
  checkbox: <CheckBoxIcon />,
  select: <DoneIcon />,
  radio: <RadioButtonCheckedIcon />,
  button: <KeyboardCommandKeyIcon />,
  date: <DateRangeIcon />,
  file: <AttachFileIcon />,
};

export const InitialObjectForInput : {[key:string] : string} = {
  label: "",
  placeholder: "",
  type: "",
  description: "",
  key: "",
  element: ""
}
