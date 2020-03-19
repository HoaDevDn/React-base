import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

function SubInfo(props) {
  const { user } = props;
  const amountOfstars = parseInt(user.ratingAverage, 10) + (Number(user.ratingAverage) % 1 < 0.5 ? 0 : 0.5);

  return (
    <div className="sub-info">
      {user.hasOwnProperty('isTeaching') ? <p>Teaching: {user.isTeaching ? 'Yes' : 'No'}</p> : ''}
      {user.hasOwnProperty('isBlocked') ? <p>Blocked: {user.isBlocked ? 'Yes' : 'No'}</p> : ''}
      {user.hasOwnProperty('rateToday') ? <p>Rate today: {parseInt(user.rateAccepted * 100, 10)}%</p> : ''}
      {user.hasOwnProperty('rateAccepted') ? <p>Rate accepted: {parseInt(user.rateAccepted * 100, 10)}%</p> : ''}
      {user.hasOwnProperty('rateCompleted') ? <p>Rate completed: {parseInt(user.rateCompleted * 100, 10)}%</p> : ''}
      {user.hasOwnProperty('settingLanguage') ? <p>Setting language: {user.settingLanguage}</p> : ''}
      {user.hasOwnProperty('earnToday') ? (
        <p>
          Earn today: {user.earnToday} {user.unit}
        </p>
      ) : (
        ''
      )}
      {user.hasOwnProperty('ratingAverage') ? (
        <p>
          Rating average: <Rate allowHalf defaultValue={amountOfstars} />
        </p>
      ) : (
        ''
      )}
    </div>
  );
}

SubInfo.propTypes = {
  user: PropTypes.element.isRequired,
};

export default SubInfo;
