import { collection,db,getDocs,  } from "./config.js";


let currentUser =JSON.parse(window.localStorage.getItem("uid"));
let users = []

console.log(currentUser);


let renderUser =()=>{
    let userList = document.querySelector("#userList");
    users.map((user)=>{
        console.log(user.name);
     let userDiv  = document.createElement("div");
     userDiv.innerHTML = `<div id="user-card">${user.name} </div>` ;
     userList.appendChild(userDiv)  
    })

    
}

const userRef = collection(db, "users");
const fetchData = await getDocs(userRef)
fetchData.forEach(doc => {
    const usersData = doc.data();
    if(usersData.uid !== currentUser){
        users.push({...usersData ,id:doc.id})
    }
    console.log(users);    
});
    renderUser();



