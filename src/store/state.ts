// import {
//   getSetting
// } from "./clientStorage";
export class State {
  // constructor() {
  //   this.setting = getSetting();
  // }
  //
  // setting?: ISetting;

  // local
  width?: number = 1024; //current client width
  sidebar?: boolean = false;
  sidebarRight?: boolean = false;

  // getUtcFilterLastDate(num: number, dateInput?: DateInput) {
  //   let date = new Date();
  //   date.setMilliseconds(date.getMilliseconds() + 86400000);
  //   let to = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  //   date.setMilliseconds(date.getMilliseconds() - 86400000 * num - 2);
  //   let from = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  //   return { from, to };
  // }
}

const state = new State();
export default state;
