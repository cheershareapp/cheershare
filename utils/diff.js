export default function pinComparer(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other.rowIndex == current.rowIndex && other.columnIndex == current.columnIndex;
    }).length == 0;
  }
}
