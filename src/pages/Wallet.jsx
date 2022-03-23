import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delAction, editAction, walletAction } from '../actions/wallet';
import Form from '../components/Form';
import EditForm from '../components/EditForm';

// Fiz o requisito 9 com ajuda do Muca MUITO OBRIGADO SALVOU MINHA PELE!!!!!
// github ta de sacanagem
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      // value: '',
      // description: '',
      // currency: 'USD',
      // method: 'Dinheiro',
      // tag: 'Alimentação',
      // id: 0,
      // moedas: [],
      editClicked: false,
    };
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

  handleEdit = (id) => {
    const { dispatchEdit } = this.props;
    const { editClicked } = this.state;

    if (!editClicked) {
      dispatchEdit(id);
      this.setState({
        editClicked: true,
      });
    } else {
      this.setState({
        editClicked: false,
      });
    }
  }

  finalValue = (value, ask) => {
    const totalValue = value * ask;
    return Number(totalValue).toFixed(2);
  }

  render() {
    const { email, expenses, dispatchDelete } = this.props;
    const { editClicked } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{`Email: ${email}`}</h3>
          <h3 data-testid="total-field">
            {`Total expenses: R$${this.totalValue()}`}
          </h3>
          <h3 data-testid="header-currency-field">Cambio: BRL</h3>
        </header>

        { !editClicked ? <Form /> : <EditForm editClicked={ editClicked } /> }

        <section>
          <table>
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Tag</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Moeda</th>
                <th scope="col">Ask</th>
                <th scope="col">Câmbio utilizado</th>
                <th scope="col">Valor convertido</th>
                <th scope="col">Moeda de conversão</th>
                <th scope="col">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 && expenses.map(({ id, description, tag, method,
                value, exchangeRates, currency,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    {Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td>{exchangeRates[currency].codein}</td>
                  <td>
                    {this.finalValue(value,
                      exchangeRates[currency].ask)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.handleEdit(id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => dispatchDelete(id) }
                      value={ id }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
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
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesAction: (payload) => dispatch(walletAction(payload)),
  dispatchDelete: (value) => dispatch(delAction(value)),
  dispatchEdit: (value) => dispatch(editAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
