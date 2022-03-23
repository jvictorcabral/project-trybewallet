// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: ['USD',
    'CAD',
    'EUR',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
  ],
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
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expense: state.expenses.filter(
        (despesa) => despesa.id === action.payload,
      ),
    };
  case 'SAVE_EDIT_EXPENSE':
    return {
      ...state,
      expenses: [action.payload,
        ...state.expenses.filter(
          (despesa) => despesa.id !== action.payload.id,
        ),
      ],
    };
  default:
    return state;
  }
};

export default walletReducer;
