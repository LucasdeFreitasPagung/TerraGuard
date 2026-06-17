import { useState, useEffect } from 'react';
import { nasaApi } from '../services/api';
import { Event } from '../types/Event';

export const useNasaEvents = () => {
  // Estados para guardar os dados e controlar a tela de carregamento
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Busca os eventos mais recentes (limitado a 5 para a Home)
        const response = await nasaApi.get('/events', { params: { limit: 5 } });
        setEvents(response.data.events);
      } catch (error) {
        console.error("Erro ao buscar dados da NASA:", error);
      } finally {
        setLoading(false); // Desliga a animação de carregamento
      }
    };

    fetchEvents();
  }, []);

  return { events, loading };
};