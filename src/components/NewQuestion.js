import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = { optionOne: '',
    optionTwo: '',
    gotoHome: false,
  }
  handleChange = (e, optionIndex)=> {
    const text = e.target.value;
    this.setState(function(previousState) {
      return optionIndex === 1
        ? { ...previousState, 'optionOne': text }
        : { ...previousState, 'optionTwo': text };
    });
  }
  handleSubmit = function(e) {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.setState(function(previousState) {
      return {
        ...previousState,
        gotoHome: true,
      };
    })
  }
  render() {
    const { optionOne, optionTwo, gotoHome } = this.state;
      if (gotoHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='create-question'>
        <h3 className='center'>Create New Question</h3>
        <div className='question'>
          <span>Complet the question:</span>
          <br/>
          <p as='h3' > Would You Rather... </p>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="option">
              <input placeholder='Enter Option One' value={optionOne} onChange={(e) => this.handleChange(e, 1)}/>
                or..
              <input placeholder='Enter Option Two'  value={optionTwo}  onChange={(e) => this.handleChange(e, 2)}  required/>              
            </div>
            
            <button className='btn' type='submit' disabled={optionOne === '' || optionTwo === ''} >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(NewQuestion)
