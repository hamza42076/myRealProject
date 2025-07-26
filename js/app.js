import { auth, createUserWithEmailAndPassword, collection, addDoc, db } from "./config.js";

let submit_btn = document.querySelector(".submit-btn");

let signUpUser = async (e) => {
  e.preventDefault();
  try {
    let name = document.querySelector("#name").value;
    let phone = document.querySelector("#phone").value;
    let nameSpan = document.querySelector("#nameSpan");
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;
    let confirmPasswordSpan = document.querySelector("#confirmPasswordSpan");

    nameSpan.innerHTML = "";
    confirmPasswordSpan.innerHTML = "";

    if (name.length < 3) {
      nameSpan.innerHTML = "Kindly enter a valid name";
      return;
    }

    if (password !== confirmPassword) {
      confirmPasswordSpan.innerHTML = "Passwords do not match";
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user.uid);
    

    window.localStorage.setItem("uid", JSON.stringify(user.uid));
    console.log("User successfully added");

    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      email: email,
      phoneNumber: phone
    });

    console.log("User data stored with ID: ", docRef.id);

    // Reset and redirect
    document.querySelector("#signupForm").reset();
    window.location.replace("signIn.html");

  } catch (e) {
    console.log("Signup Error: ", e);
  }
};

submit_btn.addEventListener("click", signUpUser);
