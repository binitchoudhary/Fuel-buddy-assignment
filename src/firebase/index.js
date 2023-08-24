
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDxPqYx4BJqgALhE_IIo2vK2N8d3nf5lDE",
  authDomain: "vue-firebase-auth-2f5a9.firebaseapp.com",
  projectId: "vue-firebase-auth-2f5a9",
  storageBucket: "vue-firebase-auth-2f5a9.appspot.com",
  messagingSenderId: "563234980487",
  appId: "1:563234980487:web:795281c8ee381adc6aee22"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}