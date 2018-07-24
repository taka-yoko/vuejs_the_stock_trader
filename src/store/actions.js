import AsyncAPI from '../api/async_api.js';

export const loadData = ({commit}) => {
  AsyncAPI.getData()
    .then(responce => {
      const data = response.json();

      if(data) {
        const stocks = data.stocks;
        const funds = data.funds;
        const stockPortfolio = data.stockPortfolio;

        const portfolio = {
          funds,
          stockPortfolio
        };

        commit('SET_STOCKS', stocks);
        commit('SET_PORTFOLIO', portfolio);
      }
    });
};
