function login() {
    let email = document.querySelector("#loginEmail").value;
    let password = document.querySelector("#loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        alert("Invalid email or password");
        window.location.href = "index1.html"
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful");

    
    window.location.href = "index.html";

}

document.querySelector("#loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    login();
});