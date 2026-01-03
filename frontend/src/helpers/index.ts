export const recorte = (texto: string) => {
  if (texto.length > 20) return texto.slice(0, 20) + '...';
  else return texto;
};


import axios from 'axios';
const VITE_API_URL_DONFAUSTINO = import.meta.env.VITE_API_URL_DONFAUSTINO;

export const PostGeneral = async (url: string, body: { [key: string]: string | number | boolean }) => {
  try {
    return await api.post(`${VITE_API_URL_DONFAUSTINO}` + url, body).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
}

// Crear una instancia de Axios
const api = axios.create({
  baseURL: `${VITE_API_URL_DONFAUSTINO}`,
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si hay un error 401 (no autorizado), redirige al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
