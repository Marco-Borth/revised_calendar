import React from 'react';
import {CalendarMonthUI} from "./CalendarMonthUI";

export class CalendarYearUI extends React.Component {
    constructor(props) {
        super(props);

        let calDate = new Date();
        calDate.setDate(1);

        this.state = {
            weekSpan: props.weekspan ? props.weekspan : 7,
            length: 365,
            date: calDate,
            isLeapYear: false
        }
    }

    render() {
        let calDate = [];
        for(let i = 0; i <= 11; i++) {
            let month = new Date();
            month.setFullYear(this.state.date.getFullYear());
            month.setMonth(i)
            calDate.push(month)
        }

        return (
            <div>
                <h1> {this.state.date.toLocaleString('en-US', { year: 'numeric'} )} - {this.state.weekSpan} Day Week </h1>
                {this.yearHeader()}
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[0]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[1]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[2]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[3]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[4]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[5]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[6]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[7]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[8]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[9]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[10]}
                />
                <CalendarMonthUI
                    weekspan={this.state.weekSpan}
                    calDate={calDate[11]}
                />
            </div>
        );
    }

    yearHeader() {
        let calDate = this.state.date;

        return(
            <h2>
                { this.renderButton("prev-year", 'double-left', -12) } {" "}
                { " " + calDate.toLocaleString('en-US', { month: 'long', year: 'numeric'} )+ " " }
                { this.renderButton("next-year", 'double-right', 12) } {" "}
            </h2>
        )
    }

    renderButton(buttonID, imageClass, i) {
        const buttonStyle = { 'font-size':'24px' }

        return(
            <button id = {buttonID}
                onClick= { () => {
                    let iDate = this.state.date;
                    iDate.setMonth(iDate.getMonth() + i)
                    this.setState({date: iDate})
                } }
            > <i className={'fas fa-angle-'+imageClass} style = {buttonStyle}/>
            </button>
        )
    }

    setDate = (i) => {
        let iDate = this.state.date;
        iDate.setMonth(iDate.getMonth() + i)
        this.setState({date: iDate})
    }

}