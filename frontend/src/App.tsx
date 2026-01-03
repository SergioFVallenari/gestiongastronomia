import { ThemeProvider } from './context/Themes'
import { LoaderProvider } from './context/Preloader'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './css/bootstrap.min.css';
import './css/styles.css';
import './css/icofont/icofont.css';
import './css/icon.css';
import './css/text.css';
import Articulos from './Views/Articulos/Articulos'
import Dashboard from './Views/Dashboard/Dashboard';
import Ingresos from './Views/Ingresos/Ingresos';
import MateriaPrima from './Views/Materia-Prima/MateriaPrima';
import Ventas from './Views/Ventas/Ventas';
import Carta from './Views/Carta/Carta';
import Login from './pages/Login/Login';
import ProtectedRoute from './pages/componentes/ProtectedRoute';
import RedirectToAppropriatePage from './pages/componentes/Redireccion';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Ruta para redirigir al login o dashboard según autenticación */}
              <Route path='/' element={<RedirectToAppropriatePage />} />

              {/* Ruta de login */}
              <Route path='/login' element={<Login />} />

              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/articulos' element={<Articulos />} />
                <Route path='/ingredientes' element={<MateriaPrima />} />
                <Route path='/compras' element={<Ingresos />} />
                <Route path='/ventas' element={<Ventas />} />
                <Route path='/carta' element={<Carta />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;


