import {
  auth,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  db,
  query,
  where,
  onSnapshot
} from "./config.js";

let signout = document.querySelector("#signout");
let post_btn = document.querySelector("#post-btn");
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
    posts_box.appendChild(cardDiv)

  })

}
// ✅ Create post function
const userPost = async () => {
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
};

post_btn.addEventListener("click", userPost);

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
