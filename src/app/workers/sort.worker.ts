/// <reference lib="webworker" />

function sortArrayOfObjects(data: object[], col: string, reversed:boolean ) {
  data.sort((a, b) => {
    if ( a[col] < b[col]) {
      return reversed ? -1 : 1;
    }
    if ( a[col] > b[col]) {
      return  reversed ? 1 : -1;
    }
    return 0;
  });
}

addEventListener('message', ({ data }) => {
  sortArrayOfObjects(data.data,data.sarake,data.reverse);
  postMessage(data.data);
});
