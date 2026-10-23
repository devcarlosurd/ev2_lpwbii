/**
 * Servicio centralizado para comunicación HTTP con la API REST NestJS.
 * Utiliza fetch() nativo según lo exigido por la pauta de evaluación.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Función auxiliar para parsear respuestas y capturar errores del backend
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        // En NestJS el ValidationPipe puede devolver un array de errores o un string
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join('. ')
          : errorData.message;
      }
    } catch {
      // Si la respuesta no es JSON, se conserva el mensaje genérico
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return await response.json();
}

export const api = {
  // GET /equipos
  async getEquipos() {
    const response = await fetch(`${API_BASE_URL}/equipos`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    return await handleResponse(response);
  },

  // GET /equipos/:id
  async getEquipoById(id) {
    const response = await fetch(`${API_BASE_URL}/equipos/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    return await handleResponse(response);
  },

  // POST /equipos
  async createEquipo(equipoData) {
    const response = await fetch(`${API_BASE_URL}/equipos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(equipoData),
    });
    return await handleResponse(response);
  },

  // PATCH /equipos/:id
  async updateEquipo(id, equipoData) {
    const response = await fetch(`${API_BASE_URL}/equipos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(equipoData),
    });
    return await handleResponse(response);
  },

  // DELETE /equipos/:id
  async deleteEquipo(id) {
    const response = await fetch(`${API_BASE_URL}/equipos/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    return await handleResponse(response);
  },
};