// Import necessary functions and components
import { createStore } from 'vuex';
import router from '../router';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Create and export the Vuex store instance
export default createStore({
  // Define the initial state
  state: {
    user: null // Initial user state is null (not authenticated)
  },
  // Define mutations to update the state
  mutations: {
    // Mutation to set the user in the state
    SET_USER(state, user) {
      state.user = user;
    },
    // Mutation to clear the user from the state (logout)
    CLEAR_USER(state) {
      state.user = null;
    }
  },
  // Define actions to perform asynchronous operations
  actions: {
    // Action to handle user login
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      // Commit the SET_USER mutation with the authenticated user
      commit('SET_USER', auth.currentUser);

      // Redirect to the home page after successful login
      router.push('/');
    },

    // Action to handle user registration
    async register({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch(error.code) {
          // Handle different registration errors
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      // Commit the SET_USER mutation with the authenticated user
      commit('SET_USER', auth.currentUser);

      // Redirect to the home page after successful registration
      router.push('/');
    },

    // Action to handle user logout
    async logout({ commit }) {
      await signOut(auth);

      // Commit the CLEAR_USER mutation to log the user out
      commit('CLEAR_USER');

      // Redirect to the login page after logout
      router.push('/login');
    },

    // Action to fetch user's authentication status
    async fetchUser({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          // If user is not authenticated, clear user from state
          commit('CLEAR_USER');
        } else {
          // If user is authenticated, set user in the state
          commit('SET_USER', user);

          // Redirect to home page if user is authenticated and on login page
          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/');
          }
        }
      });
    }
  }
});
