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

    setMonthLength() {
        if ( this.state.weekSpan === 7) {
            if ( this.state.date.getMonth() === 1 ) {
                if (  parseInt(this.state.date.toLocaleString('en-US', {
                    year: 'numeric',
                })) % 4 !== 0 ) {
                    this.setState({length: 28});
                } else {
                    this.setState({length: 29});
                }
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
        //this.setDate()
        //calDate.setMonth(calDate.getMonth() + 1);

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
              </table>
          </div>
        );
    }

    MonthHeader() {
        const buttonStyle = { 'font-size':'24px' }
        let calDate = this.state.date;

        return(
            <h2>
                <button id = "prev-year"
                        onClick={
                            () => {
                                let iDate = this.state.date;
                                iDate.setMonth(iDate.getMonth() - 12)
                            }
                        }
                >
                    <i className='fas fa-angle-double-left' style = {buttonStyle}/>
                </button>
                {" "}
                <button id = "prev-month"
                        onClick={
                            () => {
                                let iDate = this.state.date;
                                iDate.setMonth(iDate.getMonth() - 1)
                            }
                        }
                >
                    <i className='fas fa-angle-left' style = {buttonStyle}/>
                </button>
                { " " + calDate.toLocaleString('en-US', { month: 'long', year: 'numeric'} )+ " " }
                <button id = "next-month"
                        onClick={
                            () => {
                                let iDate = this.state.date;
                                iDate.setMonth(iDate.getMonth() + 1)
                            }
                        }
                >
                    <i className='fas fa-angle-right' style = {buttonStyle}/>
                </button>
                {" "}
                <button id = "next-year"
                              onClick={
                                  () => {
                                      let iDate = this.state.date;
                                      iDate.setMonth(iDate.getMonth() + 12)
                                  }
                              }
                >
                    <i className='fas fa-angle-double-right' style = {buttonStyle}/>
                </button>
            </h2>
        )
    }



    setWeekHeader() {
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
