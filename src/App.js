import Counter from './components/Counter.js';
import Calender from './components/Calendar.js';

class App {
  async run() {
    const counter = new Counter([
      ['티본스테이크', 1, 55000],
      ['바비큐립', 1, 54000],
      ['초코케이크', 2, 15000],
      ['제로콜라', 1, 3000],
    ]);

    const calender = new Calender(7);
  }
}

export default App;
