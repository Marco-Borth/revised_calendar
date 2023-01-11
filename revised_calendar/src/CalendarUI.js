import React from 'react';

export class CalendarUI extends React.Component {
    constructor(props) {
        super(props);

        let calDate = new Date();

        this.state = {
            weekSpan: props.weekspan,
            date: calDate,
            length: 30,
        }
    }

    handleLeapYears(length) {
        if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 400 === 0 ) {
            this.setState({length: length + 1});
        } else if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 100 === 0 ) {
            this.setState({length: length});
        } else if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 4 !== 0 ) {
            this.setState({length: length});
        } else {
            this.setState({length: length + 1});
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
        return(
            <tr>
                {this.addWeekHeader(i)}

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

    addWeekHeader(i) {
        if ( this.state.weekSpan*(i) < this.state.length + this.state.weekSpan ) {
            return(<th>Week {i}</th>)
        }
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

        if ( i <= this.state.length ) {
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
              {this.MonthHeader()}
              <table>
                  {this.setWeekHeader()}
                  {this.week(1)}
                  {this.week(2)}
                  {this.week(3)}
                  {this.week(4)}
                  {this.week(5)}
                  {this.week(6)}
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
