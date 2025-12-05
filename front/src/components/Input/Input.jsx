import { memo } from "react";

export const Input = memo((props) => {
  const { value, onChange } = props;
  const onChangeHandler = (event) => {
    onChange(event);
  }
  return <input type="text" value={value} onChange={onChangeHandler} />
})
