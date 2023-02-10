// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCditjEOySH_QaZ9Pdua3lWjIRrh75OAYk",
  authDomain: "conectate-isp-ec.firebaseapp.com",
  projectId: "conectate-isp-ec",
  storageBucket: "conectate-isp-ec.appspot.com",
  messagingSenderId: "489739363659",
  appId: "1:489739363659:web:378e0683cb8355c5ebb4ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const gsReferenceQPC = ref(storage, 'gs://conectate-isp-ec.appspot.com/Manual_Routers_QPCOM.pdf');
const gsReferenceTPL = ref(storage, 'gs://conectate-isp-ec.appspot.com/Manual_Routers_TPLINK.pdf');