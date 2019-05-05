// function FirstTest() {
//   let counter = 1;
//   const minutesInHour = 60;
//   const start = moment(this.props.data[0].time, 'x');
//   const MinutesArr = [];
//   for (let i = 1; i < this.props.data.length; i++) {
//     let end = moment(this.props.data[i].time, 'x');
//     const diff = end.diff(start);
//     const minutesDuration = parseInt(moment.duration(diff).asMinutes());

//     const iterationCounter = counter++;
//     if(minutesDuration > 60) {
//     }
//     if(minutesDuration % minutesInHour + 1 === 0 && minutesDuration !== 0 ) {
//       if(minutesDuration % minutesInHour + 1 === 0) {
//         counter = 0;
//       }
//       const sliceEnd = i - 1;
//       const sliceStart = i - 1 - iterationCounter;
//       const subArray = this.props.data.slice(sliceStart, sliceEnd);
//       MinutesArr.push(subArray);
//     }
//   }
//   console.log(MinutesArr);
// }

/* export function getAvarage(arr) {
  const obj = {};
  const array = [];
  debugger;
  arr.forEach(function (el) {

    if (obj[el.time]) {
      obj[el.time]++;
    } else {
      obj[el.time] = 1;

    }
  });
  return obj;
} */

export function getAvarage(arr) {
  let sumHumidity = 0;
  const obj = {};

  return arr.reduce((acc, cur) => {
    for (let i = 0; i < arr.length; i++) {
      sumHumidity += cur.humidity;
      if (obj[arr[i].time]) {
        obj[arr[i].time]++;
      } else if (cur.time !== arr[i].time) {
        acc.push({
          time: cur.time,
          humidity: sumHumidity
        });
      }

      return acc;
    }
  }, []);
}
