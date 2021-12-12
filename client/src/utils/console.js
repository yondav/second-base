export const consoleColors = {
  greenBlock: 'color: white; background-color: green;',
  redBlock: 'color: white; background-color: red;',
  purpleBlock: 'color: white; background-color: purple;',
};

export const consoleMessages = {
  state: state =>
    console.log('%cstate', consoleColors.purpleBlock, '\n', state),
  success: message =>
    console.log('%csuccess:', consoleColors.greenBlock, message),
  fail: message => console.log('%cfail:', consoleColors.redBlock, message),
};
