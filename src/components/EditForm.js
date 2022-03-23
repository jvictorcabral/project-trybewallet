import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEditAction } from '../actions/wallet';

const INITIAL_TAG = 'Alimentação';

class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: INITIAL_TAG,
      id: 0,
    };
  }

  componentDidMount() {
    const { expense } = this.props;
    this.handleTest();
    console.log(expense);
  }

  handleTest = () => {
    const { expense } = this.props;
    this.setState({
      value: expense[0].value,
      description: expense[0].description,
      currency: expense[0].currency,
      method: expense[0].method,
      tag: expense[0].tag,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleEdit = () => {
    const { saveEdtitAction, expense } = this.props;
    const { value, description, currency,
      method, tag, id } = this.state;
    const objectExpenses = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates: expense[0].exchangeRates,
    };
    saveEdtitAction(objectExpenses);
    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: INITIAL_TAG,
      description: '',
      id: expense[0].id,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

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
              {currencies.map((moeda) => (
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
              onClick={ this.handleEdit }
            >
              Editar despesa
            </button>
          </form>
        </section>
      </div>
    );
  }
}

EditForm.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string),
  // currency: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expense: state.wallet.expense,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdtitAction: (payload) => dispatch(saveEditAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
