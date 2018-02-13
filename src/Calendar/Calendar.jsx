import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { calendarActions } from "../_actions";
import { calendarService } from "../_services";

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    calendarService.calEvents().then(eventos => {
      this.setState({
        events: eventos
      });
    });
  }

  render() {
    return (
      <div>
        <h1>hola</h1>
        <ul>
          {this.state.events.map(event => {
            return <li key={event.MeetingId}>{event.MeetingId}</li>;
          })}
        </ul>
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  const { calEvents } = state.authentication;
  return {
    calEvents
  };
}

const connectedCalendar = connect(mapStateToProps)(Calendar);
export { connectedCalendar as Calendar };
*/
