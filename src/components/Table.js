import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delAction } from '../actions/wallet';

class Table extends React.Component {
  finalValue = (value, ask) => {
    const totalValue = value * ask;
    return parseFloat(totalValue).toFixed(2);
  }

  render() {
    const { expenses, dispatchDelete } = this.props;
    return (
      <div>
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
                <button data-testid="edit-btn">
                  editar despesa
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
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string),
  currency: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (value) => dispatch(delAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
