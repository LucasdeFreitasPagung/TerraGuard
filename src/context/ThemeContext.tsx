import React, { createContext, useState, ReactNode } from 'react';

// Define o formato do nosso contexto
interface ThemeContextData {
  isDarkMode: boolean;
  toggleTheme: () => void;
  // Cores dinâmicas para facilitar o uso nas telas
  colors: {
    background: string;
    text: string;
    card: string;
  };
}

// Cria o contexto vazio
export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

// Cria o Provedor (o guarda-chuva que vai cobrir o app)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Paletas de cores dinâmicas
  const colors = {
    background: isDarkMode ? '#121212' : '#F5F7FA',
    text: isDarkMode ? '#FFFFFF' : '#1A1A24',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
// --- FIM DO ARQUIVO ---