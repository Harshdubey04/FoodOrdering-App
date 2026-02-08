import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { Routes, Route, Outlet, Navigate} from "react-router-dom";
import Error from './Pages/Error';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Cart from './Pages/Cart';
import RestMenu from "./Pages/RestMenu";
import { lazy, Suspense, useEffect } from 'react';
import Login from './Pages/Login';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/Firebase';
import { addUser, removeUser } from './Utils/Store/userSlice';
import { useState } from 'react';

const Grocery = lazy(() => import("./Pages/Grocery"));
function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // WAIT till Firebase confirms auth
  if (!authChecked) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Protected */}
      <Route
        path="/browse"
        element={
          user ? (
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Outlet />
              </main>
              <Footer />
            </div>
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route index element={<Body />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="restaurants/:restid" element={<RestMenu />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="grocery"
          element={
            <Suspense fallback={<h1>Loading Grocery...</h1>}>
              <Grocery />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App