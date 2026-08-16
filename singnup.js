let users = JSON.parse(localStorage.getItem("users")) || [];

function signup() {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("User already exists");
        return;
    }

    let newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful");
     window.location.href = "login.html";
}

document.querySelector("#signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    signup();
});