// src/context/CabalContext.tsx
import { createContext, useContext, ParentComponent } from 'solid-js';
import CabalService from './services/CabalService';

const CabalContext = createContext<CabalService>();

export const CabalProvider: ParentComponent<{
  apiKey: string;
  apiUrl: string;
}> = (props) => {
  const cabal = new CabalService({
    apiKey: props.apiKey,
    apiUrl: props.apiUrl,
  });

  cabal.start();

  return (
    <CabalContext.Provider value={cabal}>
      {props.children}
    </CabalContext.Provider>
  );
};

export function useCabal() {
  const context = useContext(CabalContext);
  if (!context) {
    throw new Error('useCabal must be used within a CabalProvider');
  }
  return context;
}
