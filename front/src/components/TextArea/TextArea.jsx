import { memo } from "react";

export const TextArea = memo((props) => {
  const { value, onChange } = props;
  const onChangeHandler = (event) => {
    onChange(event);
  }
  return <textarea value={value} onChange={onChangeHandler} />
})