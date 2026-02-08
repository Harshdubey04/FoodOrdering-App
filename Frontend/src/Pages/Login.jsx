import React, { useState, useRef, useContext, useEffect } from 'react';
import { checkValidSignInData, checkValidSignUpData } from '../utils/Validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { PROFILE_PHOTO } from "../utils/constant";
import LoginHeader from '../Components/LoginHeader';
import { replace, useNavigate } from 'react-router';
import { addUser } from '../utils/Store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '../Contexts/ThemeContext';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Theme
  const { theme, handleTheme } = useContext(Theme);

  const [errorMessage, seterrorMessage] = useState(null);
  const [signUp, setSignUp] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const confirmedPassword = useRef(null);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/browse",{replace:true})
    }
  }, [user, navigate]);


  const toggleSignup = () => {
    setSignUp(prev => !prev);
    seterrorMessage(null);
  };

  const handleButtonClick = () => {

    // Sign In
    if (!signUp) {
      const errorMessage = checkValidSignInData(
        email.current.value,
        password.current.value
      );

      seterrorMessage(errorMessage);
      if (errorMessage) return;

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;

            const { uid, email, displayName, photoURL } = user;

            dispatch(addUser({ uid, email, displayName, photoURL }));
            navigate("/browse");
        })
        .catch((error) => {
            seterrorMessage(error.code + " - " + error.message);
      });

    }

    //  Sign Up
    else {
      const errorMessage = checkValidSignUpData(
        name.current.value,
        email.current.value,
        password.current.value,
        confirmedPassword.current.value
      );

      seterrorMessage(errorMessage);
      if (errorMessage) return;

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PROFILE_PHOTO
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;

            dispatch(addUser({ uid, email, displayName, photoURL }));
            navigate("/browse");
          });
        })
        .catch((error) => {
          seterrorMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-4 
      ${theme === "dark"
        ? "bg-gradient-to-br from-black via-gray-900 to-black"
        : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      }`}
    >
      <LoginHeader />
      {/*  Theme Toggle */}
      <button
        onClick={handleTheme}
        className={`absolute top-6 right-6 px-3 py-2 rounded-full text-sm font-semibold shadow-lg transition
        ${theme === "dark"
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-white text-gray-800 hover:bg-gray-200 border"
        }`}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Auth Card */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`w-full max-w-md rounded-2xl p-8 shadow-2xl backdrop-blur-md
        ${theme === "dark"
          ? "bg-gray-950/90 text-white"
          : "bg-white text-black border"
        }`}
      >

        {/*  Heading */}
        <h1 className={`text-3xl font-extrabold mb-2
          ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
          {signUp ? "Create your account" : "Welcome back!"}
        </h1>

        <p className="text-gray-500 mb-6">
          {signUp
            ? "Sign up to order delicious food 🍕"
            : "Sign in to continue ordering 🍔"}
        </p>

        {/*  Name */}
        {signUp && (
          <input
            ref={name}
            type="text"
            placeholder="Your name"
            required
            className={`p-3 mb-4 w-full rounded-lg border
            ${theme === "dark"
              ? "bg-gray-900 border-gray-700 focus:ring-green-500"
              : "bg-gray-100 border-gray-300 focus:ring-green-600"
            } focus:outline-none focus:ring-2`}
          />
        )}

        {/*  Email */}
        <input
          ref={email}
          type="email"
          placeholder="Email address"
          required
          className={`p-3 mb-4 w-full rounded-lg border
          ${theme === "dark"
            ? "bg-gray-900 border-gray-700 focus:ring-green-500"
            : "bg-gray-100 border-gray-300 focus:ring-green-600"
          } focus:outline-none focus:ring-2`}
        />

        {/*  Password */}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          required
          className={`p-3 mb-4 w-full rounded-lg border
          ${theme === "dark"
            ? "bg-gray-900 border-gray-700 focus:ring-green-500"
            : "bg-gray-100 border-gray-300 focus:ring-green-600"
          } focus:outline-none focus:ring-2`}
        />

        {/*  Confirm Password */}
        {signUp && (
          <input
            ref={confirmedPassword}
            type="password"
            placeholder="Confirm password"
            required
            className={`p-3 mb-4 w-full rounded-lg border
            ${theme === "dark"
              ? "bg-gray-900 border-gray-700 focus:ring-green-500"
              : "bg-gray-100 border-gray-300 focus:ring-green-600"
            } focus:outline-none focus:ring-2`}
          />
        )}

        {/*  Error */}
        {errorMessage && (
          <p className="text-red-500 font-semibold mb-3">{errorMessage}</p>
        )}

        {/*  Submit */}
        <button
          onClick={handleButtonClick}
          className="w-full py-3 mt-2 rounded-xl font-bold bg-green-600 hover:bg-green-700 active:scale-95 transition text-white"
        >
          {signUp ? "Create Account" : "Sign In"}
        </button>

        {/*  Toggle Auth */}
        <p
          className="mt-6 text-gray-500 cursor-pointer text-sm"
          onClick={toggleSignup}
        >
          {signUp ? (
            <>Already have an account? <span className="text-green-500 font-semibold">Sign in</span></>
          ) : (
            <>New here? <span className="text-green-500 font-semibold">Create an account</span></>
          )}
        </p>

      </form>
    </div>
  );
};

export default Login;
