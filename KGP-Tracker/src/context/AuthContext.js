import { createContext, useContext, useEffect, useState } from "react";

// tworzenie kontekstu autoryzacji
const AuthContext = createContext();

// własny hook do używania kontekstu autoryzacji
const useAuth = () => useContext(AuthContext);

// komponent dostarczający kontekst autoryzacji dla swojego drzewa komponentów
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // załadowanie użytkownika z localStorage, jeśli tam jest
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // logowanie - ustawienie użytkownika i wrzucenie w localStorage
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    // zmienna wskazująca, czy użytkownik jest zalogowany
    const isLoggedIn = !!user;

    // dostarczanie wartości kontekstu dla komponentów potomnych
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider, useAuth };
