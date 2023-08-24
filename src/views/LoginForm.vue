<template>
    <!-- Login form -->
    <form class="login" @submit.prevent="login">
      <!-- Login heading -->
      <h2>Login</h2>
      <!-- Email input -->
      <input
        type="email"
        placeholder="Email address"
        v-model="form.email"
      />
      <!-- Password input -->
      <input
        type="password"
        placeholder="Password"
        v-model="form.password"
      />
      <!-- Submit button -->
      <input
        type="submit"
        value="Login"
      />
      <!-- Link to registration -->
      <p class="register-link">New to FuelBuddy? <router-link to="/register">Create an account</router-link></p>
    </form>
</template>
  
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  setup () {
    // Data and store setup
    const form = ref({});
    const store = useStore();

    // Login method
    const login = () => {
      store.dispatch('login', form.value);
    }

    return {
      form,
      login
    }
  }
}
</script>
  
<style scoped>
/* Styling for the login form */
form.login {
  color: #FFF;
  background-image: url('https://c1.wallpaperflare.com/preview/747/735/637/dark-night-filling-gas.jpg');
  background-size: cover; /* Ensures the image covers the entire container */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Styling for the login heading */
h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

/* Styling for input fields */
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

/* Styling for input fields on focus */
input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

/* Styling for input placeholders */
input::placeholder {
  color: inherit;
}

/* Styling for input fields in the login form */
form.login input:not([type="submit"]) {
  color: #FFF;
  border-bottom: 2px solid whitesmoke;
}

/* Styling for the submit button */
form.login input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #FFF;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

/* Styling for the link to registration */
.register-link {
  margin-top: 1rem;
  text-align: center;
  color: #FFF;
}
</style>
