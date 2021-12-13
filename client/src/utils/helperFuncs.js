export const toTitle = str =>
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(' ');

export const findIndex = (arr, key, value) => {
  let list = arr;
  let target = arr.indexOf(list.find(item => item[key] === value));

  return { list, target };
};

export const bodyToggle = edit =>
  edit
    ? ['overflow-x-hidden', 'overflow-y-hidden'].map(cl =>
        document.querySelector('body').classList.add(cl)
      )
    : ['overflow-x-hidden', 'overflow-y-hidden'].map(cl =>
        document.querySelector('body').classList.remove(cl)
      );

export const toggleStickyNav = () =>
  ['bg-gray-900', 'fixed'].map(cl =>
    document.querySelector('nav').classList.toggle(cl)
  );
