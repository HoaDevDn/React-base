import LoginComponent from 'modules/auth/pages/Login';
import { login } from 'modules/auth/auth.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(null, mapDispatchToProps)(LoginComponent);
