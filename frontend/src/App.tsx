import { ThemeProvider } from './context/Themes'
import { LoaderProvider } from './context/Preloader'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './css/bootstrap.min.css';
import './css/styles.css';
import './css/icofont/icofont.css';
import './css/icon.css';
import './css/text.css';
import Articulos from './ComponentesPag/Articulos/Articulos'
import Dashboard from './ComponentesPag/Dashboard/Dashboard';
import Ingresos from './ComponentesPag/Ingresos/Ingresos';

const App: React.FC = (): JSX.Element => {

  return (
    <ThemeProvider>
      <LoaderProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Dashboard></Dashboard>} />
            <Route path='/articulos' element={<Articulos></Articulos>} />
            <Route path='/ingresos' element={<Ingresos></Ingresos>} />
          </Routes>
        </HashRouter>
      </LoaderProvider>
    </ThemeProvider>
  )
}

export default App
