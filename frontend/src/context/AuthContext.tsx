// AuthContext.tsx (cookie-only)
import { createContext, useContext, useState, ReactNode} from 'react';

interface AuthContextType {
  user: { id: string; username?: string } | null;
  setUser: (user: { id: string; nombre?: string; apellido?: string } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; username?: string } | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
