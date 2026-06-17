import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { nasaApi } from '../services/api';
import { saveFavorite } from '../storage/favoritesStorage';
import { Event } from '../types/Event';
import { ThemeContext } from '../context/ThemeContext';

const CATEGORIES = ['Todos', 'Wildfires', 'Severe Storms', 'Volcanoes', 'Ice'];

export default function EventsScreen() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Consumindo o Modo Escuro
  const { colors, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await nasaApi.get('/events', { params: { limit: 30 } });
        setAllEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } catch (error) {
        console.error("Erro ao procurar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    let result = allEvents;

    if (selectedCategory !== 'Todos') {
      result = result.filter(event => 
        event.categories.some(cat => cat.title.includes(selectedCategory))
      );
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(result);
  }, [searchQuery, selectedCategory, allEvents]);

  const handleFavorite = async (event: Event) => {
    await saveFavorite(event);
    Alert.alert("Sucesso", "🚀 Evento guardado offline!");
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#0055FF" />
        <Text style={[styles.loadingText, { color: colors.text }]}>A descarregar dados de satélite...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Cabeçalho adaptável */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', borderBottomColor: isDarkMode ? '#333333' : '#E0E0E0' }]}>
        <Text style={[styles.title, { color: colors.text }]}>Explorador de Eventos</Text>
        
        <TextInput
          style={[styles.searchInput, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F0F2F5', color: colors.text }]}
          placeholder="Procure por um país, região ou evento..."
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterChip, 
                  { backgroundColor: isDarkMode ? '#2D2D2D' : '#F0F2F5' },
                  selectedCategory === item && styles.filterChipActive
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[styles.filterText, { color: isDarkMode ? '#AAA' : '#666' }, selectedCategory === item && styles.filterTextActive]}>
                  {item === 'Wildfires' ? '🔥 Incêndios' : 
                   item === 'Severe Storms' ? '⛈️ Tempestades' : 
                   item === 'Volcanoes' ? '🌋 Vulcões' : 
                   item === 'Ice' ? '❄️ Gelo' : '🌎 Todos'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Resultados */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#666' : '#999' }]}>Nenhum evento encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.categories[0]?.title || 'Geral'}</Text>
              </View>
              <TouchableOpacity style={styles.favButton} onPress={() => handleFavorite(item)}>
                <Text style={styles.favButtonText}>⭐ Guardar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontWeight: '500' },
  header: { padding: 20, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  searchInput: { padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 15 },
  filterContainer: { flexDirection: 'row' },
  filterChip: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#0055FF' },
  filterText: { fontWeight: '600' },
  filterTextActive: { color: '#FFF' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, textAlign: 'center' },
  card: {
    padding: 15, marginHorizontal: 20, marginTop: 15, borderRadius: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2
  },
  cardContent: { flex: 1, paddingRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardCategory: { fontSize: 12, color: '#E74C3C', marginTop: 5, fontWeight: 'bold' },
  favButton: { backgroundColor: '#0055FF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  favButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
});
// --- FIM DO ARQUIVO ---