import { createContext, useState, useEffect, ReactNode } from 'react';
import { Box, Image, Heading } from '../components/elements';
import PulseLoader from 'react-spinners/PulseLoader';
import loadingImg from '../images/logo-donFaustino/don-faustino2.png';

interface LoaderContextType {
  loading: boolean;
}

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderContext.Provider value={{ loading }}>
      {loading ? (
        <Box className='mc-spinner'>
          <Image src={loadingImg} alt='logo' />
          <Box className='mc-spinner-group'>
            <Heading>Cargando</Heading>
            <PulseLoader color='#0857f5' loading={loading} size={8} />
          </Box>
        </Box>
      ) : (
        children
      )}
    </LoaderContext.Provider>
  );
};
