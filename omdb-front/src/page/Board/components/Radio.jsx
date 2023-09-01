import RadioContext from "./RadioContext";
import { useContext } from "react";

export default function Radio({
  children,
  value,
  label,
  name,
  defaultChecked,
  disabled,
}) {
  const group = useContext(RadioContext);

  return (
    <div className="form_radio_btn">
      <input
        type="radio"
        value={value}
        id={label}
        name={name}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => group.onChange && group.onChange(e.target.value)}
      />
      <label htmlFor={label}>{children}</label>
    </div>
  );
}
