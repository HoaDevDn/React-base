import React from 'react';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';

function NotFound(props) {
  const redirectToRegister = () => {
    props.history.push('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={redirectToRegister}>
          Back Home
        </Button>
      }
    />
  );
}

NotFound.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
};

NotFound.defaultProps = {
  history: {},
};

export default NotFound;
