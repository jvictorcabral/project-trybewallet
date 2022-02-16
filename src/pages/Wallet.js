import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      initialValue: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { initialValue } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{`Email: ${email}`}</h3>
          <h3 data-testid="total-field">{`Valor: ${initialValue}`}</h3>
          <h3 data-testid="header-currency-field">Cambio: BRL</h3>
        </header>

        <section>
          <form>
            <input
              type="text"
              name="value"
              data-testid="value-input"
              // value={ value }
              placeholder="valor da despesa"
            />

            <input
              type="text"
              name="description"
              data-testid="description-input"
              placeholder="descrição da despesa"
            />

            {/* <select
              name="currency"
              data-testid="currency-input"
              aria-label="moeda"
            >
            </select> */}

            <select
              name="method"
              data-testid="method-input"
            >
              <option value="Dinheiro" defaultValue>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>

            <select
              name="tag"
              data-testid="tag-input"
            >
              <option value="Alimentação" defaultValue>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>

            <button
              type="submit"
            >
              Adicionar despesa
            </button>
          </form>
        </section>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
