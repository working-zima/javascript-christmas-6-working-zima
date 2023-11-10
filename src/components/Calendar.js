class Calender {
  #date;

  constructor(date) {
    this.date = date;
  }

  isWeekend() {
    if (new Date(2023, 11, `${this.date}`).getDay() >= 5) {
      return true;
    }
    return false;
  }
}

export default Calender;
