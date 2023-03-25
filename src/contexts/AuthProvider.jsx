import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let gotSession = localStorage.getItem("session")
    if (gotSession) {
      console.log("Retrieved: ", gotSession)
      setSession(JSON.parse(gotSession))
      setUser(JSON.parse(gotSession))
    }
    async function getSession() {
      setLoading(false)
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            console.log("New session: ", session)
            setUser(session.user)
            localStorage.setItem("session", JSON.stringify(session))
            setSession(session)
          } else {
            localStorage.removeItem("session")
            setSession(null)
            setUser(null)
          }
          setLoading(false)
        }
      )
      return () => {
        subscription?.unsubscribe()
      }
    }
    getSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;