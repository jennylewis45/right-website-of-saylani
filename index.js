const app = firebase.initializeApp(firebaseConfig);
console.log(app);

let database = firebase.database();

const signup = () => {
  let username = document.getElementById("username").value;
  let contact = document.getElementById("contact").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let role = "User";
  console.log(email, password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(user);
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          username: username,
          role: role,
          contact: contact,
          email: email,
          password: password,
        })
        .then(() => {
          console.log("User Created successfully.");
          window.location.href = "shop.html";
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
};



const signin = () => {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          let user = userCredential.user;
          console.log(user)
          const dbRef = firebase.database().ref();
          dbRef.child("users").child(user.uid).get().then((snapshot) => {
              if (snapshot.exists()) {
                  const userData = snapshot.val()
                  if (userData.role === 'Admin') {
                      const user = { email: email };
                      localStorage.setItem('user', JSON.stringify(user));
                      console.log('User created successfully.')
                      window.location.href = 'shop.html'
                  }
                  else {
                      const user = { email: email };
                      localStorage.setItem('user', JSON.stringify(user));
                      window.location.href = '../Home/home.html'
                  }
              } else {
                  console.log("No data available");
              }
          }).catch((error) => {
              console.error(error);
          });
      })
      .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode + ': ' + errorMessage)
      });

}




// document.getElementById('getStartedBtn').addEventListener('click', function() {
//     window.location.href = 'signup.html'; // Change the URL to your signup page
// });

const getStartedBtn = document.getElementById("getStartedBtn");

if (getStartedBtn !== null) {
  getStartedBtn.addEventListener("click", function() {
    window.location.href = "signup.html"
  });
} else {
  
}

  

// function redirectToShop() {
//     window.location.href = "/";
//   }
  
// const signupBtn = document.getElementById("signupButton");
// const shopPageUrl = "/cart.html";

// if (signupBtn !== null) {
//   signupBtn.addEventListener("click", function() {
//     window.location.href = "cart.html"
//   });
// } else {
  
// }

// const signinBtn = document.getElementById("signinButton");
// const shopsPageUrl = "/shop.html";

// if (signinBtn !== null) {
//   signinBtn.addEventListener("click", function() {
//     window.location.href = "shop.html"
//   });
// } else {
  
// }

