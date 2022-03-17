// function getCoins(data) {
//   return { type: 'GET_COINS', payload: data };
// }

// function failedRequest() {
//   return { type: FAILED_REQUEST, payload: error };
// }

// function fetchCoinsAction() {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await response.json();
//       return dispatch(getCoins(data));
//     } catch (error) {
//       dispatch(failedRequest(error));
//     }
//   };
// }
