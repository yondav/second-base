import { Input } from '..';

export const renderInputs = (inputs, changeHandler) =>
  inputs.map((input, i) => (
    <Input
      key={i}
      label={input?.label}
      type={input?.type}
      name={input?.name}
      changehandler={changeHandler}
      value={input?.value}
      sm={input.sm || 12}
      md={input.md || 6}
    />
  ));
