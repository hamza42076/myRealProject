import { auth, createUserWithEmailAndPassword ,collection, addDoc,db} from "./config.js";

 let submit_btn = document.querySelector(".submit-btn");
let signUpUser =async (e)=>{
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
        
        if (name.length < 3){
            nameSpan.innerHTML = "Kindly Enter the correct name";
            return;
        }
        if(password !== confirmPassword){
            confirmPasswordSpan.innerHTML = "Enter the same password";
            return
        }
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User successfully added");
        
        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            phoneNumber: phone
        });
        console.log("Document written with ID: ", docRef.id);
        // Form reset and redirect
        window.location.replace("signIn.html");
        document.querySelector("#signupForm").reset();
    } 
    catch (e) {
        console.log(e);
    }
}
submit_btn.addEventListener("click",signUpUser);