import { Input } from '..';

export const renderInputs = (inputs, changeHandler, xs, md) =>
  inputs.map((input, i) => (
    <Input
      key={i}
      label={input?.label}
      type={input?.type}
      name={input?.name}
      changehandler={changeHandler}
      value={input?.value}
      xs={xs || 12}
      md={md || 6}
    />
  ));
