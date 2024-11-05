import { ThemeProvider } from './context/Themes'
import { LoaderProvider } from './context/Preloader'
import { HashRouter, Route, Routes } from 'react-router-dom'
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

const App: React.FC = (): JSX.Element => {

  return (
    <ThemeProvider>
      <LoaderProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Login></Login>} />
            <Route path='/dashboard' element={<Dashboard></Dashboard>} />
            <Route path='/articulos' element={<Articulos></Articulos>} />
            <Route path='/ingredientes' element={<MateriaPrima></MateriaPrima>} />
            <Route path='/compras' element={<Ingresos></Ingresos>} />
            <Route path='/ventas' element={<Ventas></Ventas>} />
            <Route path='/carta' element={<Carta></Carta>} />
          </Routes>
        </HashRouter>
      </LoaderProvider>
    </ThemeProvider>
  )
}

export default App
