import React, { useContext } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  // Puxamos as variáveis do nosso Estado Global (Context API)
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);

  return (
    // Usamos as cores dinâmicas no estilo inline para atualizar instantaneamente
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Ajuste as preferências do TerraGuard</Text>
      </View>

      <View style={[styles.settingRow, { backgroundColor: colors.card }]}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            {isDarkMode ? '🌙 Modo Escuro Ativado' : '☀️ Modo Claro Ativado'}
          </Text>
          <Text style={styles.settingDescription}>
            Altera o esquema de cores do aplicativo
          </Text>
        </View>

        {/* O botão que liga e desliga o tema */}
        <Switch
          trackColor={{ false: '#767577', true: '#0055FF' }}
          thumbColor={isDarkMode ? '#FFF' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
  }
});
// --- FIM DO ARQUIVO ---