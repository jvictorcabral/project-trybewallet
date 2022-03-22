import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../services/fetchApi';
import Table from '../components/Table';
import { walletAction } from '../actions/wallet';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      moedas: [],
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const apiValue = await fetchApi();
    this.setState({
      moedas: Object.keys(apiValue).filter((element) => element !== 'USDT'),
    });
    return apiValue;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  totalValue = () => {
    const { expenses } = this.props;

    if (expenses.length > 0) {
      let finalResult = 0;

      expenses.forEach(({ value, exchangeRates, currency}) => {
        finalResult += Number(value)
           * Number(exchangeRates[currency].ask);
      });
      return finalResult.toFixed(2);
    }
    return 0;
  }

  handleCLick = async () => {
    const apiValue = await this.getApi();
    const { expensesAction } = this.props;
    const { value, description, currency,
      method, tag, id } = this.state;
    const objectExpenses = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates: apiValue,
    };
    expensesAction(objectExpenses);
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
    this.totalValue();
  }

  render() {
    const { email } = this.props;
    const { value, moedas } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{`Email: ${email}`}</h3>
          <h3 data-testid="total-field">
            {`Total expenses: R$${this.totalValue()}`}
          </h3>
          <h3 data-testid="header-currency-field">Cambio: BRL</h3>
        </header>

        <section>
          <form>
            <input
              type="text"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
              placeholder="valor da expense"
            />

            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              placeholder="descrição da expense"
            />

            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              aria-label="moeda"
            >
              {moedas.map((moeda) => (
                <option value={ moeda } key={ moeda } data-testid={ moeda }>
                  {moeda}
                </option>
              ))}
            </select>

            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro" defaultValue>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>

            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação" defaultValue>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>

            <button
              type="button"
              onClick={ this.handleCLick }
            >
              Adicionar despesa
            </button>
          </form>
        </section>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesAction: (payload) => dispatch(walletAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
