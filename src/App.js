import Counter from './components/Counter.js';
import Calendar from './components/Calendar.js';

class App {
  #calendar = new Calendar();

  #counter = new Counter();

  async run() {
    // await this.#calendar.getDate();
    await this.#counter.getOrder();
  }
}

export default App;
