/*
 * Looking at the rowIndex, columnIndex or id attributes, are there differences
 *  in the source and current arrays.
 */

export default function pinComparer(otherArray) {
  return (current) => {
    return otherArray.filter(
        (other) => other.rowIndex === current.rowIndex
            && other.columnIndex === current.columnIndex
            && other.id === current.id
    ).length === 0;
  }
}
