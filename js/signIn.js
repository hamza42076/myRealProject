import { 
     auth,
     signInWithEmailAndPassword,
     signInWithPopup,provider,
     GoogleAuthProvider } from "./config.js";

let emailLoginBtn = document.querySelector("#emailLoginBtn");
let signInbtn = document.querySelector("#signInbtn");
let signInUser =async (e)=>{
    e.preventDefault();
    try {
         let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
       await signInWithEmailAndPassword(auth, email, password);
       console.log("signIn successfully");
       window.location.replace("dashboard.html"); 
       
        
    } catch (error) {
        console.log(error);
        
    }
}
 emailLoginBtn.addEventListener("click",signInUser) ;

 let signInWithGoogle=async()=>{

 await signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(`user ${user}`);
    
    window.location.replace("dashboard.html");
  }).catch((error) => {
    console.log(error);
  });

 }
 signInbtn.addEventListener("click",signInWithGoogle) ;