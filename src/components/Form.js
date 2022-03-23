import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../services/fetchApi';
import { walletAction } from '../actions/wallet';

const INITIAL_TAG = 'Alimentação';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: INITIAL_TAG,
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

      expenses.forEach(({ value, exchangeRates, currency }) => {
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
      currency: 'USD',
      method: 'Dinheiro',
      tag: INITIAL_TAG,
      id: id + 1,
    });
    this.totalValue();
  }

  render() {
    const { value, description, currency, method, tag, moedas } = this.state;

    return (
      <div>
        <section>
          <form>
            <input
              type="number"
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
              value={ description }
              placeholder="descrição da expense"
            />

            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
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
              value={ method }
            >
              <option value="Dinheiro" defaultValue>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>

            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
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
      </div>
    );
  }
}

Form.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesAction: (payload) => dispatch(walletAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
