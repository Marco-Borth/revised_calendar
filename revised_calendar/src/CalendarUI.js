import React from 'react';

export class CalendarUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weekspan: 7,
            length: 30,
            dayCount: 0
        }
    }

    week(i) {
        let tempLength = 0;

        return(
            <tr>
                {
                    //if(this.state.dayCount <= this.state.length) {}
                    this.day(1 + this.state.weekspan*(i - 1))
                }
                {this.day(2 + this.state.weekspan*(i - 1))}
                {this.day(3 + this.state.weekspan*(i - 1))}
                {this.day(4 + this.state.weekspan*(i - 1))}
                {this.day(5 + this.state.weekspan*(i - 1))}
                {this.day(6 + this.state.weekspan*(i - 1))}
                {this.day(7 + this.state.weekspan*(i - 1))}
            </tr>
        )

        this.setState( {dayCount: 0 } )
    }

    day(i) {
        const dayStyle = {
            "border-style": "solid",
            "width": "100px",
            "height": "100px",
            "text-align": "left",
            "vertical-align": "top"
        }

        if (i <= this.state.length && ( (i - 1) % this.state.weekspan <= this.state.weekspan - 1 ) ) {
            this.setState( {dayCount: this.state.dayCount + 1 } )

            return(
                <td style={dayStyle}>{ i }</td>
            )
        }
    }

    render() {
        return(
          <div class="calendarApp">
              <h2> January 2023</h2>
              <table>
                  {this.sevenDays()}
                  {this.week(1)}
                  {this.week(2)}
                  {this.week(3)}
                  {this.week(4)}
                  {this.week(5)}
              </table>
          </div>
        );
    }

    sevenDays() {
        return(
            <tr className="week-header">
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
        )
    }

    sixDays() {
        return(
            <tr className="week-header">
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
        )
    }
}
