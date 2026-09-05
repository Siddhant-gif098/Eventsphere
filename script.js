```javascript
/* ================= LOGIN / REGISTER ================= */

let registeredUser = "";
let registeredPassword = "";

let isRegisterMode = false;


/* SHOW REGISTER */

function showRegister() {

    isRegisterMode = true;

    document.getElementById("formTitle").innerText =
        "Create Account";

    document.getElementById("formDescription").innerText =
        "Register using your name and password";

    document.querySelector(".main-button").innerText =
        "Register";

    document.querySelector(".switch-text").innerHTML =
        'Already have an account? <button onclick="showLogin()" class="link-button">Login</button>';

    document.getElementById("message").innerText = "";
}


/* SHOW LOGIN */

function showLogin() {

    isRegisterMode = false;

    document.getElementById("formTitle").innerText =
        "Welcome Back";

    document.getElementById("formDescription").innerText =
        "Login to continue to EventSphere";

    document.querySelector(".main-button").innerText =
        "Login";

    document.querySelector(".switch-text").innerHTML =
        'Don\'t have an account? <button onclick="showRegister()" class="link-button">Register</button>';

    document.getElementById("message").innerText = "";
}


/* LOGIN / REGISTER */

function loginUser() {

    let username =
        document.getElementById("username").value.trim();

    let password =
        document.getElementById("password").value.trim();

    let message =
        document.getElementById("message");


    /* EMPTY CHECK */

    if (username === "" || password === "") {

        message.style.color = "#ff7777";

        message.innerText =
            "Please enter name and password.";

        return;
    }


    /* REGISTER */

    if (isRegisterMode) {

        registeredUser = username;
        registeredPassword = password;

        message.style.color = "#6eff9a";

        message.innerText =
            "Registration successful! You can now login.";

        showLogin();

        document.getElementById("username").value =
            username;

        document.getElementById("password").value =
            "";

        return;
    }


    /* LOGIN */

    if (
        username === registeredUser &&
        password === registeredPassword
    ) {

        document.getElementById("loginPage").style.display =
            "none";

        document.getElementById("mainWebsite").classList.remove(
            "hidden"
        );

        window.scrollTo(0, 0);

    } else {

        message.style.color = "#ff7777";

        message.innerText =
            "Invalid name or password.";
    }
}


/* ================= LOGOUT ================= */

function logoutUser() {

    document.getElementById("mainWebsite").classList.add(
        "hidden"
    );

    document.getElementById("loginPage").style.display =
        "flex";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    showLogin();
}


/* ================= EVENT SELECTION ================= */

function selectEvent(eventName) {

    document.getElementById("selectedEvent").innerText =
        eventName;

    document.getElementById("amount").value = "";

    document.getElementById("bookingMessage").innerText = "";

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= BOOKING ================= */

function confirmBooking() {

    let amount =
        document.getElementById("amount").value;

    let eventName =
        document.getElementById("selectedEvent").innerText;

    let bookingMessage =
        document.getElementById("bookingMessage");


    if (amount === "" || Number(amount) <= 0) {

        bookingMessage.style.color = "#ff7777";

        bookingMessage.innerText =
            "Please enter a valid amount.";

        return;
    }


    bookingMessage.style.color = "#6eff9a";

    bookingMessage.innerText =
        "Booking request for " +
        eventName +
        " has been placed successfully!";

}
```
