import { createContext, useContext, useState, ReactNode } from 'react';

interface WarningContextType {
  showTrialWarning: boolean;
  setShowTrialWarning: (show: boolean) => void;
}

const WarningContext = createContext<WarningContextType | undefined>(undefined);

export function WarningProvider({ children }: { children: ReactNode }) {
  const [showTrialWarning, setShowTrialWarning] = useState(false);

  return (
    <WarningContext.Provider value={{ showTrialWarning, setShowTrialWarning }}>
      {children}
    </WarningContext.Provider>
  );
}

export function useWarning() {
  const context = useContext(WarningContext);
  if (context === undefined) {
    throw new Error('useWarning must be used within a WarningProvider');
  }
  return context;
}