// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter(
        (despesa) => despesa.id !== action.payload,
      )],
    };
  default:
    return state;
  }

};

export default walletReducer;
