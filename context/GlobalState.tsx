"use client"

import { ReactNode } from 'react';
import { ScriptProvider } from './ScriptContext';

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ScriptProvider>
      {children}
    </ScriptProvider>
  );
};
