import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';
import '../index.css'


class Login extends Component {
  state = { userId: null,
    gotoHome: false,
  }

  handleSelectionChanged = function(event) {
    const userId = event.target.value;
    this.setState(function(previousState) {
      return { ...previousState, userId, };
    });
  }

  handleLogin = function(e) {
    const { userId } = this.state;
    const { dispatch } = this.props;
    dispatch(setAuthedUser(userId));
    this.setState(function(previousState) {
      return {
        ...previousState,
        gotoHome: true,
      };
    });
  }
  componentDidMount() {
    this.props.dispatch(clearAuthedUser())
  }

  render() {
    const { userId, gotoHome } = this.state;
    const { history, users } = this.props;
    const selected = userId ? userId : -1;

    if(gotoHome) {
      const redirect = history.location.state;
      if (redirect != null) { return <Redirect to={redirect} push={true} />
      } return <Redirect to='/' />
    }
    return (
      <div className='header-top'>
        <h2 className='center'>Welcome to the Would You Rather App!</h2>
        <p as ='h3'>Please sign in to continue </p>
        <div className='login-box'>
          <div className='image-login'>
            <img src="/images/reactredux.jpg" alt='react'/>
          </div>
          <div className='user-select'>
            <select value={selected} onChange={(e) => this.handleSelectionChanged(e)}>
              <option value={-1} disabled>Select user...</option>
              {Object.keys(users).map(function(key) {
                return (
                  <option value={users[key].id} key={key}>{users[key].id}</option>
                  
                );
              })}
            </select>
          </div>
          <button className='btn' disabled={userId === null} onClick={(e) => this.handleLogin(e)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))


