import './App.css';
import {CalendarMonthUI} from "./CalendarMonthUI";
import {CalendarYearUI} from "./CalendarYearUI";

function App() {
    const newStyle = { "float": "left"}
    const standardStyle = { "float": "right"}

  return (
    <div className="App">
      <h1>
        Welcome to the Custom Calendar
      </h1>
        <div style={newStyle}>
            <CalendarYearUI>
                weekspan={7}
            </CalendarYearUI>
        </div>
        <div style={standardStyle}>

            <CalendarMonthUI
                weekspan={7}
                isIndependent={true}
            />
            <CalendarMonthUI
                weekspan={6}
                isIndependent={true}
            />
            <CalendarMonthUI
                weekspan={5}
                isIndependent={true}
            />
        </div>
    </div>
  );
}

export default App;
