# Cabal Bot Web UI

## styles

```
tailwindcss@3
tailwind.config.js
src/index.css
```

```
CabalService

start
  call connect to `UserActivityUni`
  broadcast message `userActivityConnected`
  call `UserPing` (this.pingUser)
  listen events (this.listenUserActivity)

```

---depends of ApiKey
start of CabalService
CabalService emit messages

useCabalService
proxy(broker'ing) all messages to stores

`tradeEventStore` -
on `CabalTradeStreamMessages.tradeEvent`
TradeEvent -> TradeRecord

```ts
type TradesStore = {
  trades: TradeRecord[];
};
```

Subscribers:

Chart
TradesHistory
=> currentPrice

## Data Stores

tradeEventsStore
