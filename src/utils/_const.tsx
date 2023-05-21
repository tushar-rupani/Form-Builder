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
  { icon: "terminal", text: "Input Box", type: "text" },
  { icon: "textarea", text: "Text Area", type: "textarea" },
  { icon: "number", text: "Number", type: "number" },
  { icon: "password", text: "Password", type: "password" },
  { icon: "checkbox", text: "CheckBox", type: "checkbox" },
  { icon: "select", text: "Select", type: "select" },
  { icon: "radio", text: "Radio", type: "radio" },
  { icon: "button", text: "Button", type: "button" },
  { icon: "date", text: "Date Picker", type: "date" },
  { icon: "file", text: "File", type: "file" },
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


export interface OptionType {
  id: number,
  key: string;
  value: string;
  selected: boolean | string
}

export const InitialObjectForInput: { [key: string]: string | OptionType[] | boolean | number } = {
  id: 0,
  label: "",
  placeholder: "",
  type: "",
  description: "",
  key: "",
  element: "",
  helperText: "",
  required: true,
  disable: false,
  readOnly: false,
  defaultValue: "",
  focus: false,
  options: [{ id: 1, key: "o1", value: "Option 1", selected: true }]
}
