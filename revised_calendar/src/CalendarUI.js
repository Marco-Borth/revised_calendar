import React from 'react';

export class CalendarUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weekSpan: props.weekspan,
            month: props.month,
            length: 30,
        }
    }

    setMonthLength() {
        if ( this.state.weekSpan === 7) {
            if ( this.state.month === "February" ) {
                this.setState({length: 28});
            } else if (
                this.state.month === "September"
                || this.state.month === "April"
                || this.state.month === "June"
                || this.state.month === "November" ) {
                this.setState({length: 30});
            } else {
                this.setState({length: 31});
            }
        } else {
            this.setState({length: 30});
        }
    }

    week(i) {
        return(
            <tr>
                {this.day(1 + this.state.weekSpan*(i - 1))}
                {this.day(2 + this.state.weekSpan*(i - 1))}
                {this.day(3 + this.state.weekSpan*(i - 1))}
                {this.day(4 + this.state.weekSpan*(i - 1))}
                {this.day(5 + this.state.weekSpan*(i - 1))}
                {this.day(6 + this.state.weekSpan*(i - 1))}
                {this.addSeventhDay(7 + this.state.weekSpan*(i - 1))}
            </tr>
        )
    }

    addSeventhDay(i) {
        if(this.state.weekSpan === 7) {
            return(this.day(i))
        }
    }

    day(i) {
        const dayStyle = {
            "border-style": "solid",
            "min-width": "100px",
            "height": "100px",
            "text-align": "left",
            "vertical-align": "top"
        }

        if (i <= this.state.length ) {
            return(
                <td style={dayStyle}>{ i }</td>
            )
        }
    }

    render() {
        this.setMonthLength();

        return(
          <div className="calendarApp" style={this.props.style}>
              <h1> {this.state.weekSpan} Day Week </h1>
              <h2> {this.state.month} 2023</h2>
              <table>
                  {this.setHeader()}
                  {this.week(1)}
                  {this.week(2)}
                  {this.week(3)}
                  {this.week(4)}
                  {this.week(5)}
              </table>
          </div>
        );
    }

    setHeader() {
        return(
            <tr className="week-header">
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                {this.includeDay()}
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
        );
    }

    includeDay() {
        if(this.state.weekSpan === 7) {
            return(<th>Thursday</th>);
        }
    }
}
