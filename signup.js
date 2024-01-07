  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCWpArY3NEFkSuiXt57uJyBlj_jn-WuYV8",
    authDomain: "auth-app-ed97f.firebaseapp.com",
    projectId: "auth-app-ed97f",
    storageBucket: "auth-app-ed97f.appspot.com",
    messagingSenderId: "751615460543",
    appId: "1:751615460543:web:e174e76e7c35fa57fbb20a",
    measurementId: "G-0PL8E1NB4S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



  var firstname =document.getElementById("firstname")
  var lastname =document.getElementById("lastname")
  var email =document.getElementById("email")
  var password =document.getElementById("password")

  window.signup = async function(e){
    e.preventDefault();
    var obj ={
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        password:password.value
    };
    await CreateUserwithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
        alert("Signup Successfully")

    })
    .catch(function(err){ 
        alert("error" +err)
  })
  console.log(obj)
    
  };
