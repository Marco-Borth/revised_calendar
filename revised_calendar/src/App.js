import './App.css';
import {CalendarUI} from "./CalendarUI";

function App() {
    const sixStyle = { "float": "left"}
    const sevenStyle = { "float": "right"}
    let calDate = new Date();
    let calDate2 = new Date();
    calDate2.setMonth(calDate2.getMonth()+4);

  return (
    <div className="App">
      <h1>
        Welcome to the Custom Calendar
      </h1>
        <CalendarUI
            weekspan={6}
            month={
                calDate.toLocaleString('en-US', {
                    month: 'long',
                })
            }
            style={sixStyle}
        />
        <CalendarUI
            weekspan={7}
            month={
                calDate2.toLocaleString('en-US', {
                    month: 'long',
                })
            }
            style={sevenStyle}
        />
    </div>
  );
}

export default App;
