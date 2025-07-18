import {
  auth,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  db,
  query,
  where,
  onSnapshot,
  doc, deleteDoc ,
  updateDoc
} from "./config.js";

let signout = document.querySelector("#signout");
let post_btn = document.querySelector("#post-btn");
let editPostsId = null;
let currentUser = null;
let posts = [];

// ✅ Monitor user auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user.uid;
    setupPostsListener();
  } else {
    console.log("User is signed out.");
    window.location.replace("index.html");
  }
});

// ✅ Sign-out function
const signoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Sign-out successful.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

signout.addEventListener("click", signoutUser);

// Document delete karne ka function
let deleteData = async(id)=>{
  try {
    await deleteDoc(doc(db, "posts",id));
    console.log("Document successfully deleted!");
  } 
  catch (error) {
    console.error("Error deleting document: ", error);
  }
}
let editData=(id)=>{
  let postInput = document.querySelector("#postInput");
  let findPost = posts.find((post) => post.id === id)
  postInput.value = findPost.post;
  post_btn.innerHTML = "update";
  editPostsId = id;

}

let renderpost=()=>{
  let posts_box = document.querySelector("#posts_box");
  posts_box.innerHTML = '';
  posts.map((post)=>{
    console.log(post);
    
    let cardDiv = document.createElement("div");
    cardDiv.className = "post-card";
    cardDiv.innerHTML = `<span>${post.post} </span>
    <button class="edit-btn">edit</button>
    <button class='del-btn'>delete</button>
    `
    cardDiv.querySelector(".del-btn").addEventListener("click",()=>{
      deleteData(post.id)
    });

    cardDiv.querySelector(".edit-btn").addEventListener("click",()=>{
      editData(post.id)
    })
    posts_box.appendChild(cardDiv)


  })

}
post_btn.addEventListener("click", async()=>{
      const postInput = document.querySelector("#postInput").value.trim();
      if (!postInput) {
      alert("Please enter a post.");
      return;
      // 🔄 Update existing post
    }
      if(post_btn.innerHTML ==="update" && editPostsId){
        try {
          const postRef = doc(db, "posts", editPostsId);
      await updateDoc(postRef, {
        post: postInput,
      });
      console.log("posts successfully updated");
      post_btn.innerHTML ="Post";
      editPostsId = null;
       document.querySelector("#postInput").value = "";

        } catch (error) {
          console.log(error);
        }
      }
          // ➕ Create new post!
      else{
        try {
    const postInput = document.querySelector("#postInput").value.trim();

    if (!postInput) {
      alert("Please enter a post.");
      return;
    }

    const docRef = await addDoc(collection(db, "posts"), {
      post: postInput,
      uid: currentUser,
    });

    console.log("Post created with ID:", docRef.id);
    document.querySelector("#postInput").value = ""; // clear input
  } catch (e) {
    console.error("Error adding post:", e);
  }

      }


});

// ✅ Fetch and listen for posts of the current user
const setupPostsListener = () => {
  const q = query(collection(db, "posts"), where("uid", "==", currentUser));

  onSnapshot(q, (querySnapshot) => {
    posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });

    console.log("User posts:", posts);
    renderpost();
    // ✅ You can also call a function to display posts in the UI here
  });
};
