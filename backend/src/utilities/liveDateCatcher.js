export function getDate() {
  let year = new Date().getFullYear();
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  if (date < 10) {
    date = "0" + date;
  }

  if (month < 10) {
    month = "0" + month;
  }

  let arr = [];

  arr.push(String(year));
  arr.push(String(month));
  arr.push(String(date));

  let goodDate = arr.join("-");

  return goodDate;
}
