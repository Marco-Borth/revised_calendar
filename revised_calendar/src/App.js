import './App.css';
import {CalendarUI} from "./CalendarUI";

function App() {
    const newStyle = { "float": "left"}
    const standardStyle = { "float": "right"}

  return (
    <div className="App">
      <h1>
        Welcome to the Custom Calendar
      </h1>
        <CalendarUI
            weekspan={6}
            style={newStyle}
        />
        <CalendarUI
            weekspan={7}
            style={standardStyle}
        />
        <CalendarUI
            weekspan={5}
            style={newStyle}
        />
    </div>
  );
}

export default App;
