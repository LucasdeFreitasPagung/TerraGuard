import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getFavorites, removeFavorite } from '../storage/favoritesStorage';
import { Event } from '../types/Event';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const isFocused = useIsFocused();

  // Consumindo o Modo Escuro
  const { colors, isDarkMode } = useContext(ThemeContext);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const handleRemove = async (id: string) => {
    await removeFavorite(id);
    Alert.alert("Removido", "Evento removido dos favoritos locais.");
    loadFavorites();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Os Seus Favoritos</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>
        Dados espaciais guardados no dispositivo
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#666' : '#999' }]}>
            Nenhum evento espacial guardado ainda. Vá ao início e selecione monitorizações! 🛰️
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.categories[0]?.title || 'Geral'}</Text>
              </View>
              
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemove(item.id)}>
                <Text style={styles.deleteButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyText: { fontSize: 16, textAlign: 'center', lineHeight: 22 },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  cardContent: { flex: 1, paddingRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardCategory: { fontSize: 12, color: '#E74C3C', marginTop: 5, fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#E74C3C', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  deleteButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
});
// --- FIM DO ARQUIVO ---