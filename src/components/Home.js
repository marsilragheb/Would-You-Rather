import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Home extends Component {
  state = {anserShow: false,}

  handleFilterClicked = (answered)=> {
    this.setState(function() {
      return { anserShow: answered };
    });
  }

  render() {

    const { anserShow } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter(function(question) {
      const contains = ( question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1
      );
      return anserShow ? contains : !contains;
    });
    const questionsSorted = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      
      <div className='all-group'>
        <div className='btn-group'>
          <button  onClick={(e) => this.handleFilterClicked(false)} >
           <h1> Unanswered</h1>
          </button>
          <button onClick={(e) => this.handleFilterClicked(true)} >
           <h1> Answered</h1>
          </button>
        </div>
        <div className='one-group'>
        <ul className='question-list'>
          {questionsSorted.map((question) => (
            <li key={question.id}><Question question={question} /> </li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Home)
