// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9iHGfmxZCMn0GfNiBtecB8jV5bLQWR08",
    authDomain: "tutorial-build-e34f1.firebaseapp.com",
    projectId: "tutorial-build-e34f1",
    storageBucket: "tutorial-build-e34f1.appspot.com",
    messagingSenderId: "7442298986",
    appId: "1:7442298986:web:36fb98a255f83583dd3213",
    measurementId: "G-XVXTC5M3QZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const userListUI = document.getElementById("userList");
usersRef.on("child_added", snap => {
    let user = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = user.name;
    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", userClicked) 
    userListUI.append($li);
});

function userClicked(e) {
    var userID = e.target.getAttribute("child-key");
    const userRef = dbRef.child('users/' + userID);
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""
    userRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val() 
        userDetailUI.append($p);
    });
}

const addUserBtnUI = document.getElementById("add-user-btn"); 
addUserBtnUI.addEventListener("click", addUserBtnClicked);

const usersRef = dbRef.child('users');

const addUserInputsUI = document.getElementsByClassName("user-input");

// this object will hold the new user information 
let newUser = {};

// loop through View to get the data for the model 
for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
    let key = addUserInputsUI[i].getAttribute('data-key');
    let value = addUserInputsUI[i].value;
    newUser[key] = value;
}
usersRef.push(newUser, function () {
    console.log("data has been inserted");
})

// edit icon 
let editIconUI = document.createElement("span");
editIconUI.class = "edit-user";
editIconUI.innerHTML = " ✎";
editIconUI.setAttribute("userid", key);
editIconUI.addEventListener("click", editButtonClicked) // Append after li.innerHTML = value.name 
$li.append(editIconUI);

// show the Edit User Form 
document.getElementById('edit-user-module').style.display = "block";

//set user id to the hidden input field 
document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

// set data to the user field 
const editUserInputsUI = document.querySelectorAll(".edit-user-input");

userRef.on("value", snap => {
    for (var i = 0, len = editUserInputsUI.length; i < len; i++) {
        var key = editUserInputsUI[i].getAttribute("data-key");
        editUserInputsUI[i].value = snap.val()[key];
    }
});

const saveBtn = document.querySelector("#edit-user-btn"); 
saveBtn.addEventListener("click", saveUserBtnClicked)

const userID = document.querySelector(".edit-userid").value;

const userRef = dbRef.child('users/' + userID);
var editedUserObject = {}
const editUserInputsUI = document.querySelectorAll(".edit-user-input");

editUserInputsUI.forEach(function (textField) {
    let key = textField.getAttribute("data-key");
    let value = textField.value;
    editedUserObject[textField.getAttribute("data-key")] = textField.value
});

document.getElementById('edit-user-module').style.display = "none";