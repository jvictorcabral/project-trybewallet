export function walletAction(payload) {
  return {
    type: 'ADD_EXPENSE',
    payload,
  };
}

export function delAction (payload) {
  return {
    type: 'DEL_EXPENSE',
    payload,
  }
};

