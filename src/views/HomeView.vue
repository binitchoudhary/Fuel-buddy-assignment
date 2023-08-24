<template>
  <div>
    <!-- Display the main content if user is authenticated -->
    <main class="home" v-if="user">
      <!-- Dashboard heading -->
      <h1 class="dashboard-heading">DashBoard</h1>
      <div class="card">
        <div class="card-image">
          <img :src="profileImageUrl" alt="Profile Image" />
        </div>
        <div class="card-content">
          <!-- Display user information -->
          <p>User ID: {{ user.uid.slice(-5) }}</p>
          <p>User's Email: {{ user.email }}</p>
        </div>
        <!-- Logout button -->
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </main>
    <!-- Show loading message if user is not authenticated -->
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
    profileImageUrl() {
      return 'https://source.unsplash.com/user/wsanter';
    }
  },
  methods: {
    // Logout method to call the 'logout' action in the store
    logout() {
      this.$store.dispatch('logout');
    }
  },
  beforeCreate() {
    // Call fetchUser action here to ensure user data is fetched before rendering
    this.$store.dispatch('fetchUser');
  }
};
</script>

<style>
/* Styling for the dashboard heading */
.dashboard-heading {
  margin-bottom: 1rem;
}

/* Styling for the main content area */
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

/* Styling for the card containing user information */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Styling for the user profile image */
.card-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Creates a circular image */
  object-fit: cover;
  margin-bottom: 10px;
}

/* Styling for user information in the card */
.card-content p {
  margin: 5px 0;
}

/* Styling for the logout button */
.logout-button {
  background-color: rgb(245, 66, 101);
  color: #FFF;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 1rem;
}
</style>
