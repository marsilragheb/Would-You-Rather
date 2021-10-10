import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionPage extends Component{
    render(){
    const { 
      id, 
      questions
     } = this.props;
    const question = questions[id];
    if(question == null) {
      return <Redirect from='*' to='/not-found' />
    }
    return(
      <div>
        {question && <Question question={question} /> }
      </div>
    )
  }
}
function mapStateToProps({ authedUser, questions }, props) {
  const { id } = props.match.params;
    return {    id,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionPage);
