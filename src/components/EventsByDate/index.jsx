import React from 'react';
import EventPreview from '../EventPreview';
import eonet from '../../lib/eonet';
import './style.css';

class EventsByDate extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dateSelected: null,
      currentView: [],
      error: false,
    };
  }

  changeDate = (event) => {
    this.setState({
      loading: true,
      error: false,
      dateSelected: event.target.value,
    });
    eonet({
      field: 'events',
      params: {
        start: event.target.value,
        end: event.target.value,
      },
    })
      .then((data) => {
        if (data) {
          this.setState({
            currentView: data.events,
            loading: false,
          });
        }
      })
      .catch((error) => this.setState({ loading: false, error }));
  };

  render() {
    const { dateSelected, currentView, loading, error } = this.state;
    return (
      <section className="EventsByDate">
        <h2>History</h2>
        <p className="dateSelect">
          <input type="date" onChange={this.changeDate} />
        </p>
        {error && <p className="error">{error.message}</p>}
        {!error && dateSelected && loading && (
          <p className="loading">Loading…</p>
        )}
        {!error && dateSelected && !loading && !currentView.length && (
          <p className="empty">No Event</p>
        )}
        {!error && dateSelected && !loading && currentView.length && (
          <ol>
            {currentView.map((event) => (
              <li key={event.id}>
                <EventPreview event={event} />
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }
}

export default EventsByDate;