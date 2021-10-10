import React, { Component, Fragment } from 'react';
import { handleInitialData } from '../actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';
import QuestionPage from './QuestionPage';
import ProtectionRoute from '../utils/ProtectionRoute';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Navbar />
              <div>
                <Switch>
                  <ProtectionRoute
                    path='/' exact component={Home} loggedIn={loggedIn} 
                  />
                  <ProtectionRoute 
                    path='/add' exact component={NewQuestion} loggedIn={loggedIn} 
                  />
                  <ProtectionRoute 
                  path='/leaderboard' exact component={Leaderboard} loggedIn={loggedIn} />
                  <ProtectionRoute 
                  path='/questions/:id' exact component={QuestionPage} loggedIn={loggedIn} />
                  <Route path='/login' exact component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
