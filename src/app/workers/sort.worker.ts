/// <reference lib="webworker" />

function sortArrayOfObjects(col: string, data: object[]) {
  data.sort((a, b) => {
    if ( a[col] < b[col]) {
      return 1;
    }
    if ( a[col] > b[col]) {
      return -1;
    }
    return 0;
  });
}

addEventListener('message', ({ data }) => {
  if (data.reverse){
    data.data.reverse();
  } else {
    sortArrayOfObjects(data.sarake,data.data);
  }
  postMessage(data.data);
});
