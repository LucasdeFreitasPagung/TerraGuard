import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNasaEvents } from '../hooks/useNasaEvents';
import { saveFavorite } from '../storage/favoritesStorage';
import { Event } from '../types/Event';

export default function HomeScreen() {
  const { events, loading } = useNasaEvents();
  
  const handleFavorite = async (event: Event) => {
    await saveFavorite(event);
    Alert.alert("Sucesso", "🚀 Evento monitorizado e guardado localmente!");
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0055FF" />
        <Text style={styles.loadingText}>Conectando aos satélites da NASA...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitorização Global</Text>
      <Text style={styles.subtitle}>Últimos eventos captados por satélite</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCategory}>{item.categories[0]?.title || 'Evento Geral'}</Text>
            </View>
            
            <TouchableOpacity style={styles.favButton} onPress={() => handleFavorite(item)}>
              <Text style={styles.favButtonText}>⭐ Guardar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#333' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A24' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  cardCategory: { fontSize: 12, color: '#E74C3C', marginTop: 5, fontWeight: 'bold' },
  favButton: { backgroundColor: '#0055FF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  favButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
});
// --- FIM DO ARQUIVO ---