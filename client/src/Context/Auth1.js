import {useState,useContext,createContext,useEffect} from 'react'
const AuthContext = createContext()


const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : { user: null, consultant: null, token: "" };
  });

  useEffect(() => {
    console.log("AuthProvider - Current auth state:", auth);
  }, [auth]);

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  return (
    <AuthContext.Provider value={[auth, updateAuth]}>
      {children}
    </AuthContext.Provider>
  );
}


//custom hook
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider };