import { createStore } from 'solid-js/store';

type ChartTradesPriceStore = {
  price: number | null;
};

const initValue = {
  price: null,
};

const [chartTradePriceStore, setChartTradePriceStore] =
  createStore<ChartTradesPriceStore>(initValue);

export { chartTradePriceStore, setChartTradePriceStore };
