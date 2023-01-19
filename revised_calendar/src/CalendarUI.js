import React from 'react';

export class CalendarUI extends React.Component {
    constructor(props) {
        super(props);

        let calDate = new Date();

        this.state = {
            weekSpan: props.weekspan ? props.weekspan : 7,
            date: calDate,
            length: 30,
            isLeapYear: false
        }
    }

    handleLeapYears(length) {
        if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 400 === 0 ) {
            this.setState({length: length + 1, isLeapYear: true});
        } else if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 100 === 0 ) {
            this.setState({length: length, isLeapYear: false});
        } else if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 4 !== 0 ) {
            this.setState({length: length, isLeapYear: false});
        } else {
            this.setState({length: length + 1, isLeapYear: true});
        }
    }

    setMonthLength() {
        if ( this.state.weekSpan === 7) {
            if ( this.state.date.getMonth() === 1 ) {
                this.handleLeapYears(28)
            } else if (
                this.state.date.getMonth() === 3
                || this.state.date.getMonth() === 5
                || this.state.date.getMonth() === 8
                || this.state.date.getMonth() === 10 ) {
                this.setState({length: 30});
            } else {
                this.setState({length: 31});
            }
        } else {
            if ( this.state.date.getMonth() === 1 ) {
                this.handleLeapYears(35)
            } else {
                this.setState({length: 30});
            }
        }
    }

    week(i) {
        let startDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1, );

        let week = this.state.weekSpan*(i - 1);
        if(this.state.weekSpan === 7) {
            week = week - startDate.getDay() - 5;
        }
        return(
            <tr>
                {this.addWeekHeader(i)}

                {this.addSeventhDay(week)}
                {this.day(1 + week)}
                {this.day(2 + week)}
                {this.day(3 + week)}
                {this.day(4 + week)}
                {this.day(5 + week, "weekend")}
                {this.day(6 + week, "weekend")}
            </tr>
        )
    }

    addWeekHeader(i) {
        if(this.state.weekSpan === 7) {
            return(<th>Week {i-1}</th>)
        } else  if ( this.state.weekSpan*(i) < this.state.length + this.state.weekSpan ) {
            return(<th>Week {i}</th>)
        }
    }

    addSeventhDay(i) {
        if(this.state.weekSpan === 7) {
            return(this.day(i, ))
        }
    }

    checkForHoliday(Month, Day) {
        let startDate = new Date(this.state.date.getFullYear(), Month, 1);
        let holiday = "";

        if(Day === this.state.length) {
            Day = "end";
        }

        if(Month === 1 && Day === "end" && this.state.isLeapYear) {
            holiday += " Leap Day";
        }

        for (let i = 0; i < USHolidays.length; i++) {
            if ( USHolidays[i][0] === Month + 1 ) {
                if ( USHolidays[i][1]  === Day) {
                    holiday += " " + USHolidays[i][2];
                } else if (this.state.weekSpan === 7) {
                    let adjust = 0
                    if (USHolidays[i][1][1] < startDate.getDay() + 1) {
                        adjust += 7
                    }

                    if ( USHolidays[i][1][0] * this.state.weekSpan
                        + USHolidays[i][1][1] - startDate.getDay() + adjust === Day ) {
                        holiday += " " + USHolidays[i][2];
                    }
                } else {
                    if ( USHolidays[i][1][0] * this.state.weekSpan + USHolidays[i][1][1] - 1 === Day ) {
                        holiday += " " + USHolidays[i][2];
                    }
                }
            }
        }

        if (this.state.weekSpan === 7) {
            if (Month === 2 && Day === 20) {
                holiday += " Spring Equinox"
            } else if (Month === 5 && Day === 21) {
                holiday += " Summer Solstice"
            } else if (Month === 8 && Day === 22) {
                holiday += " Fall Equinox"
            } else if (Month === 11 && Day === 21) {
                holiday += " Winter Solstice"
            }
        } else {
            if (Month === 2 && Day === 14) {
                holiday += " Spring Equinox"
            } else if (Month === 5 && Day === 17) {
                holiday += " Summer Solstice"
            } else if (Month === 8 && Day === 20) {
                holiday += " Fall Equinox"
            } else if (Month === 11 && Day === 20) {
                holiday += " Winter Solstice"
            }
        }


        return holiday;
    }

    day(i, occasion) {
        let dayStyle = {
            "border-style": "solid",
            "min-width": "100px",
            "width": "100px",
            "height": "100px",
            "text-align": "left",
            "vertical-align": "top",
            "background-color" : "teal"
        }

        let holiday = this.checkForHoliday(this.state.date.getMonth(), i);

        if(occasion === "weekend") {
            dayStyle["background-color"] = "coral";
        }

        if(!this.state.isLeapYear && i === 34) {
            dayStyle["background-color"] = "coral";
        }

        if(holiday !== "") {
            dayStyle["background-color"] = "violet";
        }

        if ( i <= this.state.length) {
            if (i <= 0) {
                if(this.state.weekSpan === 7) {
                    return(
                        <td>
                        </td>
                    )
                }
            } else {
                return(
                    <td style={dayStyle}>
                        { i + holiday}
                    </td>
                )
            }
        }
    }

    render() {
        this.setMonthLength();

        return(
          <div className="calendarApp" style={this.props.style}>
              <h1> {this.state.weekSpan} Day Week </h1>
              {this.MonthHeader()}
              <table>
                  {this.setWeekHeader()}
                  {this.week(1)}
                  {this.week(2)}
                  {this.week(3)}
                  {this.week(4)}
                  {this.week(5)}
                  {this.week(6)}
                  {this.week(7)}
              </table>
          </div>
        );
    }

    MonthHeader() {
        let calDate = this.state.date;

        return(
            <h2>
                { this.renderButton("prev-year", 'double-left', -12) }
                {" "}
                { this.renderButton("prev-month", 'left', -1) }
                { " " + calDate.toLocaleString('en-US', { month: 'long', year: 'numeric'} )+ " " }
                { this.renderButton("next-month", 'right', 1) }
                {" "}
                { this.renderButton("next-year", 'double-right', 12) }
            </h2>
        )
    }

    renderButton(buttonID, imageClass, i) {
        const buttonStyle = { 'font-size':'24px' }

        return(
            <button id = {buttonID}
                    onClick={
                        () => {
                            let iDate = this.state.date;
                            iDate.setMonth(iDate.getMonth() + i)
                        }
                    }
            >
                <i className={'fas fa-angle-'+imageClass} style = {buttonStyle}/>
            </button>
        )
    }

    setWeekHeader() {
        return(
            <tr className="week-header">
                <th/>
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

let USHolidays = [
    [1, 1, "New Years Day"],
    [1, 6, "Orthodox Christmas Eve Day"],
    [1, 7, "Orthodox Christmas Day"],
    [1, [2, 2], "MLK Day"],
    [2, 2, "Groundhog Day"],
    [2, 14, "Valentines Day"],
    [2, [2, 2], "Presidents' Day"],
    //[2, [3, 4], "Ash Wednesday"],
    [3, 14, "Pi Day"],
    [3, 15, "The Ides of March"],
    [4, 1, "April Fools Day"],
    [4, 15, "Tax Day"],
    [4, 22, "Arbor Day"],
    [5, 5, "Cinco de Mayo"],
    [5, [2, 1], "Mother's Day"],
    [5, [3, 2], "Memorial Day"],
    [6, [3, 1], "Father's Day"],
    [6, 14, "Flag Day USA"],
    [6, 19, "Juneteenth"],
    [7, 4, "Independence Day"],
    [9, [0, 2], "Labor Day"],
    [10, 9, "Columbus Day"],
    [10, "end", "Halloween Day"],
    [11, [0, 3], "Election Day"],
    [11, 11, "Veterans Day"],
    [11, [3, 4], "Thanksgiving Day"],
    [11, [3, 5], "N.A. Heritage Day"],
    [12, 24, "Christmas Eve Day"],
    [12, 25, "Christmas Day"],
    [12, 26, "Kwanzaa"],
    [12, "end", "New Years Eve Day"],
];
