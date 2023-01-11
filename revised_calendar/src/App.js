import './App.css';
import {CalendarUI} from "./CalendarUI";

function App() {
    const sixStyle = { "float": "left"}
    const sevenStyle = { "float": "right"}

  return (
    <div className="App">
      <h1>
        Welcome to the Custom Calendar
      </h1>
        <CalendarUI
            weekspan={6}
            style={sixStyle}
        />
        <CalendarUI
            weekspan={7}
            style={sevenStyle}
        />
    </div>
  );
}

export default App;
