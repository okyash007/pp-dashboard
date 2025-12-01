import React, { createContext, useContext } from 'react';

const SubscriptionModalContext = createContext(null);

export function SubscriptionModalProvider({ children, setProDialogOpen }) {
  return (
    <SubscriptionModalContext.Provider value={{ setProDialogOpen }}>
      {children}
    </SubscriptionModalContext.Provider>
  );
}

export function useSubscriptionModal() {
  const context = useContext(SubscriptionModalContext);
  if (!context) {
    // Return a no-op function if context is not available (for graceful degradation)
    return { setProDialogOpen: () => {} };
  }
  return context;
}

