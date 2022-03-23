export function walletAction(payload) {
  return {
    type: 'ADD_EXPENSE',
    payload,
  };
}

export function delAction(payload) {
  return {
    type: 'DEL_EXPENSE',
    payload,
  };
}

export function editAction(payload) {
  return {
    type: 'EDIT_EXPENSE',
    payload,
  };
}

export function saveEditAction(payload) {
  return {
    type: 'SAVE_EDIT_EXPENSE',
    payload,
  };
}
