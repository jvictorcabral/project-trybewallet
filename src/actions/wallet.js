function walletAction(payload) {
  return {
    type: 'ADD_EXPENSE',
    payload,
  };
}

export default walletAction;
