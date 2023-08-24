<template>
    <!-- Registration form -->
    <form class="register" @submit.prevent="register">
      <!-- Registration heading -->
      <h2>Register</h2>
      <!-- Email input -->
      <input
        type="email"
        placeholder="Email address"
        v-model="form.email"
      />
      <!-- Password input with show/hide toggle -->
      <input
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        v-model="form.password"
      />
      <!-- Confirm Password input with show/hide toggle -->
      <input
        :type="showPassword ? 'text' : 'password'"
        placeholder="Confirm Password"
        v-model="form.confirmPassword"
      />
      <!-- Password show/hide toggle -->
      <div class="password-toggle">
        <input
          type="checkbox"
          v-model="showPassword"
          id="showPasswordCheckbox"
        />
        <label for="showPasswordCheckbox">Show Password</label>
      </div>
      <!-- Submit button -->
      <input
        type="submit"
        value="Register"
      />
      <!-- Link to login -->
      <p class="login-link">Already have an account? <router-link to="/login">Login</router-link></p>
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
    const form = ref({
      email: '',
      password: '',
      confirmPassword: ''
    });
    const store = useStore();
    const showPassword = ref(false);

    // Register method
    const register = () => {
      if (form.value.password !== form.value.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      store.dispatch('register', form.value);
    }

    return {
      form,
      register,
      showPassword
    }
  }
}
</script>

<style scoped>
/* Styling for the registration form */
form.register {
  color: #FFF;
  background-image: url('https://c0.wallpaperflare.com/preview/334/420/897/architecture-building-car-city.jpg');
  background-size: cover; /* Ensures the image covers the entire container */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

/* Styling for the registration heading */
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

/* Styling for input fields in the registration form */
form.register input:not([type="submit"]) {
  color: #FFF;
  border-bottom: 2px solid #FFF;
}

/* Styling for the submit button */
form.register input[type="submit"] {
  background-color: #FFF;
  color: rgb(245, 66, 101);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

/* Styling for the password toggle */
.password-toggle {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

/* Styling for the password toggle checkbox */
.password-toggle input[type="checkbox"] {
  margin-right: 0.5rem;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #FFF;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
}

/* Styling for the checkmark in the password toggle checkbox */
.password-toggle input[type="checkbox"]::before {
  content: '\2714'; /* Unicode checkmark character */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFF;
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

/* Styling for the checkmark in the password toggle checkbox when checked */
.password-toggle input[type="checkbox"]:checked::before {
  opacity: 1;
}

/* Styling for the password toggle label */
.password-toggle label {
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 2rem;
}
</style>
