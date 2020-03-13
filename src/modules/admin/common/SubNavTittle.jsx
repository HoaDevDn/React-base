import React from 'react';
import PropTypes from 'prop-types';

function SubNavTittle(props) {
  return (
    <span>
      {props.icon} {props.name}
    </span>
  );
}

SubNavTittle.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.shape({}).isRequired,
};

export default SubNavTittle;
