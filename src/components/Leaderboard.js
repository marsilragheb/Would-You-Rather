import React from 'react';
import { connect } from 'react-redux';

function Leaderboard(props) {
  const { users } = props;

  const usersSort = users.sort( (a, b) => b.totalScore - a.totalScore)

  return (
    <div>
      <ul className='user-list'>
        {usersSort.map((user) => (
          
          <li key={user.id}>
            <div className='user'>
              <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar' />
              <span>{user.name}</span>
              <div className='user-stats'>
                <p>Answered questions: {Object.keys(user.answers).length}</p>
                <p>Created questions: {user.questions.length}</p>
              </div>
              <div  className='user-score'>
                <div className='user-score-title'>score</div>
                <div>{user.totalScore}</div>
              </div>
            </div>
          </li>
          
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps({ users }) {
  const listUser = Object.values(users)
  listUser.map( (user) => user.totalScore = 
  Object.keys(user.answers).length + user.questions.length )
    return { users: listUser}
  
}

export default connect(mapStateToProps)(Leaderboard)
