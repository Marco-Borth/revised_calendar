import React from 'react';
import * as events from "events";

export class Day extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: props.date ? props.date : null,
            monthLength: props.monthLength ? props.monthLength : null,
            weekSpan: props.weekSpan,
            day: props.day ? props.day : null,
            schedule: props.schedule ? props.schedule : null,
            events: [],
            isWeekend: props.isWeekend ? props.isWeekend : false,
        }
    }

    checkForLeapYear() {
        if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 400 === 0 ) {
            return true;
        } else if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 100 === 0 ) {
            return false;
        } else if (  parseInt(this.state.date.toLocaleString('en-US', {
            year: 'numeric',
        })) % 4 !== 0 ) {
            return false;
        } else {
            return true;
        }
    }

    checkForSolarEvents(Month, Day) {
        if (this.state.weekSpan === 7) {
            if (Month === 2 && Day === 20) {
                return "Spring Equinox"
            } else if (Month === 5 && Day === 21) {
                return "Summer Solstice"
            } else if (Month === 8 && Day === 22) {
                return "Fall Equinox"
            } else if (Month === 11 && Day === 21) {
                return "Winter Solstice"
            }
        } else {
            if (Month === 2 && Day === 14) {
                return "Spring Equinox"
            } else if (Month === 5 && Day === 17) {
                return "Summer Solstice"
            } else if (Month === 8 && Day === 20) {
                return "Fall Equinox"
            } else if (Month === 11 && Day === 20) {
                return "Winter Solstice"
            }
        }

        return null
    }

    checkForHoliday() {
        let Day = this.state.day;
        let Month = this.state.date.getMonth();

        let events = []
        if(this.state.day === this.state.monthLength) {
            Day = "end";
        }

        let SEvent = this.checkForSolarEvents(Month, Day);

        if (SEvent !== null) {
            events.push(SEvent);
        }

        /*
        if(Month === 1 && Day === "end" && this.checkForLeapYear()) {
            events.push("Leap Day");
        }
        */

        this.setState({events: events});
    }

    render() {
        //this.checkForLeapYear();
        this.checkForHoliday();

        let dayStyle = {
            "border-style": "solid",
            "min-width": "100px",
            "width": "100px",
            "height": "100px",
            "text-align": "left",
            "vertical-align": "top",
            "background-color" : "teal"
        }

        if(this.state.day === 34) {
            this.setState({isWeekend : true});
        }

        if(this.state.isWeekend) {
            dayStyle["background-color"] = "coral";
        }

        let events = this.state.events;

        if(events.length > 0) {
            dayStyle["background-color"] = "violet";
            return(
                <td style={dayStyle}>
                    { this.state.day + " " + events  }
                </td>
            )
        }

        return(
            <td style={dayStyle}>
                { this.state.day + ", " + this.state.date.getMonth() + ", " + this.state.weekSpan }
            </td>
        )
    }
}

