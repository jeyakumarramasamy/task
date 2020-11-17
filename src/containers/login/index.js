import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, loadUsers } from '../../actionCreators/login';
import loginSelector from '../../selectors/login';
import TextInput from '../../components/TextInput';
import UIConstants from '../../constants/UIConstants';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      submitted: false,
      error: false,
    };
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn && isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', true);
      this.props.history.push('/home');
    }
  }

  handleChange = (payload) => {
    const { name, value } = payload;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true, error: false, });
    const { userName, password } = this.state;
    if (userName && password) {
      this.props.loginUser({ userName, password });
    }
  }

  render() {
    const {
      userName,
      password,
      submitted,
      error,
    } = this.state;
    return (
      <div className="d-flex login-container">
        <form
          action="#"
          method="post"
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <TextInput
            submitted={submitted}
            value={userName}
            errorMessage={UIConstants.USERNAME_ERROR}
            name="userName"
            placeholder={UIConstants.USERNAME_PLACEHOLDER}
            onChange={this.handleChange}
          />
          <TextInput
            submitted={submitted}
            value={password}
            errorMessage={UIConstants.PASSWORD_ERROR}
            name="password"
            type="password"
            placeholder={UIConstants.PASSWORD_PLACEHOLDER}
            onChange={this.handleChange}
          />
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg">
              {UIConstants.SUBMIT}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => loginSelector(state);

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: bindActionCreators(loadUsers, dispatch),
    loginUser: bindActionCreators(loginUser, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
