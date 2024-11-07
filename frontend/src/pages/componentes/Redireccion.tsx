import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componente para redirigir al login o dashboard según si está autenticado
const RedirectToAppropriatePage: React.FC = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      // Verifica si el token existe en localStorage
      const token = localStorage.getItem('token');
  
      if (token) {
        // Si el usuario está autenticado (token presente), redirige al dashboard
        navigate('/dashboard');
      } else {
        // Si el usuario no está autenticado, redirige al login
        navigate('/login');
      }
    }, [navigate]); // Ejecuta solo cuando `navigate` cambie
  
    return null; // No renderiza nada, solo realiza la redirección
  };

export default RedirectToAppropriatePage;