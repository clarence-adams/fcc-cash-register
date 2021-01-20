function checkCashRegister(price, cash, cid) {
  // initializes a variable that stores the total amount of change owed
  let changeTotal = (cash * 100 - price * 100);
  // initializes a variable that stores the total amount of cid
  let cidTotal = cid.map(element => {
    return element[1] * 100;
  })
  .reduce((accumulator, currentValue) => accumulator + currentValue)

  if (cidTotal < changeTotal) { // ensures register has enough cash at all to return change
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (cidTotal == changeTotal) {
    return {status: "CLOSED", change: cid};
  } else { // begins totaling up exact change
    // initializes a variable that will store exact change
    let change = [];
    // initializes an array containing currency values in only cents instead of dollars
    let currencies = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];

    for (let i = cid.length - 1; i >= 0; i--) {
      let currencyCount = 0;

      while (changeTotal / currencies[i] >= 1 && cid[i][1] > 0) {
        changeTotal -= currencies[i];
        cid[i][1] -= currencies[i] / 100;
        currencyCount++;
      }

      if (currencyCount > 0) {
        change.push([cid[i][0], (currencies[i] / 100)* currencyCount]);
      }
    }

    if (changeTotal > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    } else {
      let returnValue = {status: "OPEN", change: change}

      return returnValue;
    }
  }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));