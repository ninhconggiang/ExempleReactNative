import Moment from "moment";
var numeral = require('numeral');

export function trunc(text, limit) {
  let mlimit = limit ? limit : 12;
  return text.length > mlimit ? `${text.substr(0, mlimit)}...` : text;
}

export function date(text) {
  return (text.length > 10 ? `${text.substr(0, 10)}` : text);
}

export function convertDateToString(text) {
  return Moment(text,"YYYY-MM-DDThh:mm:ss").format("DD/MM/YYYY")
}
export function convertDateTimeToString(text) {
  return Moment(text,"YYYY-MM-DDThh:mm:ss").format("DD/MM/YYYY HH:mm")
}
export function formatNumber(text) {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
export function convertMonthToString(text){
  return Moment(text,"DD-MM-YYYY").format("MM")

}
export function convertYearToString(text){
  return Moment(text,"DD-MM-YYYY").format("YYYY")

}
export function convertNumber(text){
  return Number(text.toString().split(".").join(""))
}
export function  formatDateTimeToString(text){
  return Moment(text).format("YYYY-MM-DDThh:mm:ss")
}

export function moneyFormat(number){
  return numeral(number).format('0,0');
}

