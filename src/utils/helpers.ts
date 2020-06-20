// Given the list of objects with a key that is shared between
// those objects, removes the elements from the list with the same
// value of the provided key and returns a new list of objects
// with no duplicates of the provided key property
export const removeDupsByKey = <T, K extends keyof T>(list: T[], key: K): T[] =>
  list.filter(
    (myEl, index, self) =>
      index === self.findIndex((thatEl) => myEl[key] === thatEl[key])
  );
