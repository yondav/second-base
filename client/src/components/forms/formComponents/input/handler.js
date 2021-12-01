export const inputHandler = (e, state, stateSetter) => {
  let obj = { ...state };
  let name = e.target.getAttribute('name');

  if (name.includes('-')) {
    let arr = name.split('-');
    obj[arr[0]][arr[1]] = e.target.value;
  } else {
    obj[name] = e.target.value;
  }

  stateSetter(obj);
};

export const passwordInputHandler = (e, resetPassword, setResetPassword) => {
  let obj = resetPassword;
  obj[e.target.getAttribute('name')] = e.target.value;
  setResetPassword(obj);
};
