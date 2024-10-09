'use client';

import { createContext, useContext, useState, useEffect } from 'react';

import { months } from '@/utils/months';

const LaborContext = createContext();

export const LaborProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [cachedSession, setCachedSession] = useState(null);

  const [loading, setLoading] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    return [month, year];
  };

  useEffect(() => {
    const [month, year] = getCurrentDate();
    // console.log('month', month);

    setSelectedMonth(month);
    setSelectedYear(year);
  }, []);

  return (
    <LaborContext.Provider
      value={{
        selectedMonth,
        selectedYear,
        setSelectedMonth,
        setSelectedYear,
        loading,
        setLoading,
        cachedSession,
        setCachedSession,
      }}
    >
      {children}
    </LaborContext.Provider>
  );
};

export const useLaborContext = () => useContext(LaborContext);
