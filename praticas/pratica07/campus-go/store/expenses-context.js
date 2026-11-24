import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_STORAGE_KEY = '@campusgo:expenses';
const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(EXPENSES_STORAGE_KEY)
      .then((stored) => {
        if (!stored) return;
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setExpenses(parsed);
      })
      .catch(() => {})
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses)).catch(() => {});
  }, [isReady, expenses]);

  const value = useMemo(() => ({ expenses, setExpenses }), [expenses]);
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) throw new Error('useExpenses precisa ser usado dentro de ExpensesContextProvider.');
  return context;
}
