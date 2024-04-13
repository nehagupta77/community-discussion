const uid = localStorage.getItem('uid');
if(!uid || uid==='') window.location.href="https://nehagupta77.github.io/community-discussion/";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWpArY3NEFkSuiXt57uJyBlj_jn-WuYV8",
  authDomain: "auth-app-ed97f.firebaseapp.com",
  databaseURL: "https://auth-app-ed97f-default-rtdb.firebaseio.com",
  projectId: "auth-app-ed97f",
  storageBucket: "auth-app-ed97f.appspot.com",
  messagingSenderId: "751615460543",
  appId: "1:751615460543:web:e174e76e7c35fa57fbb20a",
  measurementId: "G-0PL8E1NB4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function getPosts() {
  const postsCol = collection(db, "posts");
  const q = query(postsCol, orderBy("timestamp", "desc")); 
  const postsSnapshot = await getDocs(q);
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })).filter(post => post.timestamp);

  // Example of how to display the posts in the HTML without using innerHTML
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = ''; 
  postsList.forEach((post) => { 
  const card = document.createElement("div");
   card.classList.add("card");
    const postElement = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = post.text;
    const link = document.createElement("a");
    link.href = `postDetail.html?postId=${post.id}`;
    link.target = "_blank";
    link.appendChild(title);
    card.appendChild(link);
    
   // postElement.appendChild(link);

    if (post.timestamp) {
            const date = post.timestamp.toDate(); // Convert timestamp to JavaScript Date object
            const dateString = date.toLocaleDateString("en-US");
            const timeString = date.toLocaleTimeString("en-US");
            const dateTimeElement = document.createElement("p");
            dateTimeElement.textContent = `Posted on: ${dateString} at ${timeString}`;
        postElement.appendChild(dateTimeElement);
    }

    if (post.imageUrl) {
        console.log(post)
      const image = document.createElement("img");
      image.src = post.imageUrl;
      image.alt = "Post Image";
      image.classList.add("card-image");
      card.appendChild(image);
      image.style = "max-width: 100%; height: auto;";
    }

    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    likeButton.onclick = () => toggleLike(post.id);
    card.appendChild(likeButton);

       postsContainer.appendChild(card);
  });

   async function toggleLike(postId) {
    const uid = localStorage.getItem('uid');
    if (!uid) {
    console.error("No UID found");
    return;
}

const postRef = doc(db, "posts", postId, "likes", uid);
const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
        // User already liked the post, remove like
        await deleteDoc(postRef);
        console.log("Like removed");
        } else {
        // Like the post
        await setDoc(postRef, { liked: true });
        console.log("Post liked");
        }
        // Update like count or UI after like is toggled
        updateLikeCount(postId);
        }         

async function updateLikeCount(postId) {
    const likesCollection = collection(db, "posts", postId, "likes");
    const likesSnapshot = await getDocs(likesCollection);
    const likesCount = likesSnapshot.docs.length;

// Example: Update the UI with likes count
console.log(`Total likes for post ${postId}: ${likesCount}`);
// Implement UI update logic here
}
  }
// Fetch and display posts
getPosts();
