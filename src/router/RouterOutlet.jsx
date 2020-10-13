import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from '@/Index';
import FullPage from '@/FullPage';
import Home from '@/Home';
import Error404 from '@/Error404';
import { service } from 'services/service';
import { GeneralAction } from 'actions/general-action';
import { connect } from 'react-redux';

class RouterOutlet extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event,
    };
  }

  componentDidMount() {
    this.loadEvent();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.event.id !== undefined && state.event.id !== props.event.id) {
      return {
        event: props.event,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  loadEvent() {
    this._isMounted = true;
    this.setState({ preLoader: true });
    service.get(`${process.env.REACT_APP_URL}/event/fetch/api-event`)
      .then(
        response => {
          if (response.success) {
            if (this._isMounted) {
              if (response.data) {
                this.setState({
                  event: response.data.event,
                  preLoader: false
                }, () => {
                  this.props.dispatch(GeneralAction.eventInfo(response.data.event));
                });
              }
            }
          }
        },
        error => { }
      );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <MasterLayoutRoute component={FullPage} exact path="/fullpage" />
          <MasterLayoutRoute component={Home} exact path="/home" />
          <MasterLayoutRoute component={Index} exact path="/:event_url?" />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { event } = state;
  return {
    event
  };
}

export default connect(mapStateToProps)(RouterOutlet);
