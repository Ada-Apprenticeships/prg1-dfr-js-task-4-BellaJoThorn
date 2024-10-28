const fs = require('fs'); 


function fileExists(filename) {
  return !fs.existsSync(filename) ? false : true
}


function validNumber(value) { // value can be string or numeric
  return /^-?\d*\.?\d+$/.test(value.toString()) 
}


function dataDimensions(dataframe) {

  // returns a list [rows (int), cols (int)]

  let rows = -1
  let cols = -1

  if (!(dataframe == undefined)) {

    if (dataframe.length > 0) {
      rows = dataframe.length;
    }

    if (!Array.isArray(dataframe[0])) { 
      cols = -1;
    } else {cols = dataframe[0].length}

  }

  console.log([rows, cols])
  return [rows, cols]

}


function calculateMean(dataset) {
  // returns a float or false

  let validNums = []
  let amount = 0
  let total = 0
  let average = 0

  for (let i = 0; i < dataset.length; i++) {
     if (validNumber(dataset[i])) {
      validNums.push(parseFloat(dataset[i]))
     }
  }

  for (let i = 0; i < validNums.length; i++) {
    amount ++
  }

  validNums.forEach(Number => {
    total = total + Number
  });

  average = total / amount
  
  console.log(total)
  console.log(amount)
  if (!validNumber(average)){
    average = false
  }
  console.log(average)
  
 return average

}


function findTotal(dataset) {
  // returns float or false

  let total = 0
  let validNums = []

  for (let i = 0; i < dataset.length; i++) {
    if (validNumber(dataset[i])) {
     validNums.push(parseFloat(dataset[i]))
    }
  }

  validNums.forEach(Number => {
    total = total + Number
  });
  
  if (total === 0){
    total = false
  }

  console.log(total)
  return total

} 


function convertToFloat(dataframe, col){ 

 // returns an integer, which is the number that were  converted to floats.
 let integer = 0

 for (let i = 0; i < dataframe.length; i++) {
  if (validNumber(dataframe[i][col]) && typeof(dataframe[i][col]) == 'string') {
    dataframe[i][col] = parseFloat(dataframe[i][col])
    integer ++
  }
 }

 console.log(integer)
 return integer

}


function flatten(dataframe) {
  // returns a dataset (a flattened dataframe)

  let newArray = []

  if (dataframe[0].length == 1){
   for (let i = 0; i < dataframe.length; i++) { 
     for (let j = 0; j < dataframe[i].length; j++) { 
       newArray.push(dataframe[i][j]);
     }
    }
   }

   console.log(newArray)
   return(newArray)

}

csvFile = './assets/testing/datatrafficdataset_10.csv'

let ignorerows = [0]

let ignorecols = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]

function loadCSV(csvFile, ignorerows, ignorecols) {  // string, dataset, dataset
  // returns a list comprising of [dataframe, rows (integer), cols (integer)]
  const rows = 0
  const cols = 0
  const newArray = []
  const delimiter = ','

  const data = fs.readFileSync(csvFile, {encoding: "utf-8", flag: 'r'});
  const lines = data.split(/\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const elements = line.split(delimiter);
    newArray.push(elements)
  }

  rows = 
  
  console.log(newArray)

}

loadCSV(csvFile, ignorerows, ignorecols)

//loadCSV(csvFile)


function calculateMedian(dataset) {

  // return float or false 

  let validNums = []
  let median = 0

  for (let i = 0; i < dataset.length; i++) {
    if (validNumber(dataset[i])) {
     validNums.push(parseFloat(dataset[i]))
    }
  }

  console.log(validNums.sort(function(a, b){return a - b}))

  let odd = false
  let even = false

  if ((validNums.length)% 2 == 0){
    even = true
  } else {
    odd = true
  }

  if (odd === true){
    median = validNums[((validNums.length - 1) / 2)]
  }

  if (even === true) {
    median = (validNums[(validNums.length)/2] + validNums[((validNums.length)/2) -1]) / 2
  }
  
  console.log(median)

 if (validNums != ""){
  return median
 } else {
  return false
 }

}


function createSlice(dataframe, colindex, colpattern, exportcols = []) { // dataframe, integer, string/numeric, dataset

const newArray = [];

  for (let i = 0; i < dataframe.length; i++) {
    if ( (colpattern === '*' && colindex < dataframe[i].length) || dataframe[i][colindex] === colpattern) { 
      let newRow = [];
      const colsToInclude = exportcols.length > 0 ? exportcols : dataframe[i].map((_, j) => j);
      for (let j = 0; j < colsToInclude.length; j++) {
        const columnIndex = colsToInclude[j];
        if (dataframe[i][columnIndex] !== undefined) {
          newRow.push(dataframe[i][columnIndex]);
        }
      }
      newArray.push(newRow);
    }
  }

  console.log(newArray);
  return newArray;

}


module.exports = {
  fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
  loadCSV, calculateMedian, createSlice,
} 