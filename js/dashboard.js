import{
    auth,
    signOut,onAuthStateChanged} from "./config.js";

let signout = document.querySelector("#signout")

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    
  } else {
    window.location.replace("index.html")
   console.log("user is signout");
   
  }
});

let signoutUser =async ()=>{
    try {
        await signOut(auth)
        console.log("Sign-out successful.");
    } catch (error) {
        console.log(error);
        
    }
} 
signout.addEventListener("click",signoutUser)
