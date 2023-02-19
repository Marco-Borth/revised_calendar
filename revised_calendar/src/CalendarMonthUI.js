import React from 'react';
import { Day } from './Day.js';

export class CalendarMonthUI extends React.Component {
    constructor(props) {
        super(props);

        let calDate;
        if(props.calDate != null) {
            calDate = props.calDate
        } else {
            calDate = new Date();
            calDate.setDate(1);
        }

        this.state = {
            weekSpan: props.weekspan ? props.weekspan : 7,
            length: 30,
            date: calDate,
            weekdays: null,
            weekends: null,
            weeks: 1,
            isLeapYear: false,
            isIndependent: props.isIndependent ? props.isIndependent : false
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

        let week = this.state.weekSpan*(i - 1) + 2;
        if(this.state.weekSpan === 7) {
            week = week - startDate.getDay() - 5;
        }

        if(this.state.weekSpan === 5) {
            week -= 1;
        }

        return(
            <tr>
                {this.addWeekHeader(i)}

                {this.addDay(week - 2, 7)}
                {this.addDay(week - 1, 6)}
                {this.addCalDay(week)}
                {this.addCalDay(1 + week)}
                {this.addCalDay(2 + week)}
                {this.addCalDay(3 + week, true)}
                {this.addCalDay(4 + week, true)}
            </tr>
        )
    }

    addWeekHeader(i) {
        if(this.state.weekSpan === 7) {
            return(<th>Week {i-1}</th>)
        } else if ( this.state.weekSpan*(i) < this.state.length + this.state.weekSpan ) {
            return(<th>Week {i}</th>)
        }
    }

    addDay(i, j) {
        if(this.state.weekSpan >= j) {
            return(this.addCalDay(i))
        }
    }

    addCalDay(i, occasion) {
        let curDate = this.state.date;
        let weekSpan = this.state.weekSpan;

        /*
        let monthlySchedule = USHolidays.filter(
            (event) => {
                return event[0] === curDate.getMonth() + 1;
            }
        )
        */

        if ( i <= this.state.length) {
            if (i <= 0) {
                if(this.state.weekSpan === 7) {
                    return( <td></td>)
                }
            } else {
                return(
                    <Day date={curDate} day={i} monthLength={this.state.length} weekSpan={weekSpan} schedule={USHolidays} isWeekend={occasion}/>
                )
            }
        }
    }

    render() {
        this.setMonthLength();

        this.setState( {weeks:this.state.length/this.state.weekSpan});

        let title = null;

        if(this.state.isIndependent) {
            title = this.state.weekSpan + " Day Week";
        }

        return(
          <div style={this.props.style}
               className={
                    "" + this.state.date.toLocaleString('en-US', { month: 'long', year: 'numeric'} )
                }
          >
              <h1>{title}</h1>
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
                  {this.week(8)}
              </table>
          </div>
        );
    }

    MonthHeader() {
        let calDate = this.state.date;

        if (this.state.isIndependent) {
            return(
                <h2>
                    { this.renderButton("prev-year", 'double-left', -12) } {" "}
                    { this.renderButton("prev-month", 'left', -1) }
                    { " " + calDate.toLocaleString('en-US', { month: 'long', year: 'numeric'} )+ " " }
                    { this.renderButton("next-month", 'right', 1) } {" "}
                    { this.renderButton("next-year", 'double-right', 12) }
                </h2>
            )
        } else {
            return ( <h2> { " " + calDate.toLocaleString('en-US', { month: 'long', year: 'numeric'} )+ " " } </h2> )
        }
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
            > <i className={'fas fa-angle-'+imageClass} style = {buttonStyle}/>
            </button>
        )
    }

    setWeekHeader() {
        if( this.state.isIndependent || (!this.state.isIndependent && this.state.date.getMonth() === 0) ){
            let names = ["Monday", "Tuesday", "Wednesday",];

            if(this.state.weekSpan === 7) {
                names.push("Thursday");
            }
            names.push("Friday");
            if(this.state.weekSpan >= 6) {
                names.push("Saturday");
            }
            names.push("Sunday");

            let weekdays = names.splice(0, names.length-2)
            let weekends = names.splice(names.length-2, names.length)

            this.setState({weekdays: weekdays, weekends: weekends});

            return(
                <tr className="week-header">
                    <th/>
                    { weekdays.map( workday => ( <th>{workday}</th> ) ) }
                    { weekends.map( workday => ( <th>{workday}</th> ) ) }
                </tr>
            );
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
    [3, 14, "Pi Day"],
    [3, 15, "The Ides of March"],
    [4, 1, "April Fools Day"],
    [4, 15, "Tax Day"],
    [4, 22, "Arbor Day"],
    [5, 5, "Cinco de Mayo"],
    [5, [2, 1], "Mother's Day"],
    [5, ["last", 2], "Memorial Day"],
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
