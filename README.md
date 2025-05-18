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
