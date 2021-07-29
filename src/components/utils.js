export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// export const showDataOnMap = (data, caseTypes="cases") => {
//   data.map(country => (
//     <Cirlce 
//     counter
//     >

//     </Cirlce>
//   ))
// }
// utils and map,js
