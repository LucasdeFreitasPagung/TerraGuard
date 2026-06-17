import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext'

export default function App() {
  return (
    <SafeAreaProvider>
      {/* O ThemeProvider envolve todo o app, injetando o estado global de Dark Mode */}
      <ThemeProvider>
        {/* O StatusBar garante que os ícones de bateria/hora do celular fiquem visíveis */}
        <StatusBar style="auto" />
        
        {/* O AppNavigator gerencia a navegação entre as telas do TerraGuard */}
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
// --- FIM DO ARQUIVO ---