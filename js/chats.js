import { addDoc, collection,db,getDocs,query,serverTimestamp, where,or,and,orderBy, onSnapshot } from "./config.js";


let currentUser =JSON.parse(window.localStorage.getItem("uid"));
let users = [];
let sendBtn = document.querySelector("#sendBtn");
let selectedUser = null;
let message = [];
let chatUnsbscribe = null;


console.log(currentUser);

let renderChat = ()=>{
    let messages_box =document.querySelector("#messages-box");
    messages_box.innerHTML = "";
    if(messages_box.length <1){
        messages_box.innerHTML = "<p>No chat yet</p>";
        return
        
    }
    message.map((msg)=>{
        let msgDiv = document.createElement("div");
        msgDiv.className = (msg.from === currentUser.uid ) ? "rightMsg" : "leftMsg";
        msgDiv.innerHTML = `${msg.text}`

        messages_box.appendChild(msgDiv)
    })
}

let getChat =(user)=>{
    selectedUser = user;
    if(typeof chatUnsbscribe === "function"){
        chatUnsbscribe();
    }

    try {
        const q = query(collection(db,"messages"),or(
            and(where("from","==",selectedUser.uid),where("to","==",currentUser)),
            and(where("from","==",currentUser),where("to","==",selectedUser.uid))
        ),
        orderBy("createdAt")
    );
    chatUnsbscribe= onSnapshot(q, (snapshot) => {
        message =[];
        snapshot.forEach((doc)=>{
            message.push(
                {...doc.data(),id:doc.id}
            )
        });
        message = message.sort((a,b)=> a.createdAt -b.createdAt)
        console.log(message);
        renderChat();
    });
    } catch (error) {
        console.log(error); 
    }
}


let renderUser =()=>{
    let userList = document.querySelector("#userList");
    users.map((user)=>{
     let userDiv  = document.createElement("div");
     userDiv.innerHTML = `<div id="user-card">${user.name} </div>` ;
     userDiv.querySelector("#user-card").addEventListener("click",()=>{
        getChat(user)

     })
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
    // console.log(users);    
});
    renderUser();

let sendMessage =async(value)=>{
    try {
      await addDoc(collection(db, "messages"), {
      text: value,
      from: currentUser,             
      to: selectedUser.uid,        
      createdAt:serverTimestamp()  
    }).then(()=>{
        console.log("message sent");
        let messageInp = document.querySelector("#messageInp");
        messageInp.value = "";
    })
    } 
    catch (error) {
        console.log(error);  
    }
}
sendBtn.addEventListener("click",()=>{
    let messageInp = document.querySelector("#messageInp");
    if (messageInp.value.length <1) {
        return
    }
    sendMessage(messageInp.value);
})



