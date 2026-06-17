import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types/Event';

const FAVORITES_KEY = '@terraguard_favorites';

// Função para procurar todos os favoritos guardados no disco
export const getFavorites = async (): Promise<Event[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    // Se existir dados, transforma de string para Objeto/Array, senão retorna um array vazio
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao procurar favoritos no disco:", e);
    return [];
  }
};

// Função para guardar um novo evento nos favoritos
export const saveFavorite = async (event: Event): Promise<void> => {
  try {
    const currentFavorites = await getFavorites();
    const isAlreadyFavorited = currentFavorites.some(item => item.id === event.id);
    
    // Evita duplicados
    if (!isAlreadyFavorited) {
      const newFavorites = [...currentFavorites, event];
      // Transforma o Array em String antes de gravar no AsyncStorage
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  } catch (e) {
    console.error("Erro ao guardar favorito:", e);
  }
};

// Função para remover um evento dos favoritos
export const removeFavorite = async (eventId: string): Promise<void> => {
  try {
    const currentFavorites = await getFavorites();
    const filteredFavorites = currentFavorites.filter(item => item.id !== eventId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
  } catch (e) {
    console.error("Erro ao remover favorito:", e);
  }
};