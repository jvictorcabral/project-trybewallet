import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      valueEmail: '',
      valuePass: '',
      disabled: true,
    };

    this.handleInputsChange = this.handleInputsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleInputsChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const {
        valueEmail,
        valuePass,
      } = this.state;
      const SEIS = 6;

      if (valuePass.length < SEIS
        || !this.validateEmail(valueEmail)) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submitUserInfo, history } = this.props;
    const { valueEmail } = this.state;
    submitUserInfo(valueEmail);
    history.push('/carteira');
  }

  render() {
    const { valueEmail, valuePass, disabled } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="email">
            email:
            <input
              type="email"
              id="email"
              name="valueEmail"
              data-testid="email-input"
              value={ valueEmail }
              onChange={ (e) => this.handleInputsChange(e) }
            />
          </label>

          <label htmlFor="password">
            senha:
            <input
              type="password"
              id="password"
              name="valuePass"
              value={ valuePass }
              onChange={ (e) => this.handleInputsChange(e) }
              data-testid="password-input"
            />
          </label>

          <button
            type="submit"
            disabled={ disabled }
            onClick={ (e) => this.handleSubmit(e) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  submitUserInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitUserInfo: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
