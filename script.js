```javascript
/* =========================================================
   EVENTSPHERE - SIMPLE JAVASCRIPT
   Matches the current index.html
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let isRegisterMode = false;
let selectedEventName = "";


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Check if user is already logged in
    const savedUser = localStorage.getItem("eventSphereUser");

    if (savedUser) {
        showMainWebsite();
    } else {
        showLoginPage();
    }

});


/* =========================================================
   LOGIN PAGE
========================================================= */

function showLoginPage() {

    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("mainWebsite").classList.add("hidden");

    isRegisterMode = false;

    document.getElementById("formTitle").textContent = "Welcome Back";

    document.getElementById("formDescription").textContent =
        "Login to continue to EventSphere";

    document.getElementById("username").placeholder =
        "Enter your name";

    document.getElementById("password").placeholder =
        "Enter password";

    document.querySelector(".main-button").textContent =
        "Login";

    document.querySelector(".switch-text").innerHTML =
        `Don't have an account?
        <button onclick="showRegister()" class="link-button">
            Register
        </button>`;

    document.getElementById("message").textContent = "";
}


/* =========================================================
   REGISTER PAGE
========================================================= */

function showRegister() {

    isRegisterMode = true;

    document.getElementById("formTitle").textContent =
        "Create Account";

    document.getElementById("formDescription").textContent =
        "Create your EventSphere account";

    document.getElementById("username").placeholder =
        "Create your name";

    document.getElementById("password").placeholder =
        "Create password";

    document.querySelector(".main-button").textContent =
        "Register";

    document.querySelector(".switch-text").innerHTML =
        `Already have an account?
        <button onclick="showLogin()" class="link-button">
            Login
        </button>`;

    document.getElementById("message").textContent = "";
}


/* =========================================================
   SWITCH TO LOGIN
========================================================= */

function showLogin() {

    isRegisterMode = false;

    document.getElementById("formTitle").textContent =
        "Welcome Back";

    document.getElementById("formDescription").textContent =
        "Login to continue to EventSphere";

    document.getElementById("username").placeholder =
        "Enter your name";

    document.getElementById("password").placeholder =
        "Enter password";

    document.querySelector(".main-button").textContent =
        "Login";

    document.querySelector(".switch-text").innerHTML =
        `Don't have an account?
        <button onclick="showRegister()" class="link-button">
            Register
        </button>`;

    document.getElementById("message").textContent = "";
}


/* =========================================================
   LOGIN / REGISTER BUTTON
========================================================= */

function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("message");


    /* -------------------------
       EMPTY FIELD CHECK
    ------------------------- */

    if (username === "" || password === "") {

        message.textContent =
            "Please enter name and password.";

        message.style.color = "#ff7777";

        return;
    }


    /* =====================================================
       REGISTER
    ===================================================== */

    if (isRegisterMode) {

        const user = {
            name: username,
            password: password
        };

        localStorage.setItem(
            "eventSphereUser",
            JSON.stringify(user)
        );

        message.textContent =
            "Account created successfully!";

        message.style.color = "#77d69b";


        setTimeout(function () {

            showMainWebsite();

        }, 500);

        return;
    }


    /* =====================================================
       LOGIN
    ===================================================== */

    const savedUser =
        localStorage.getItem("eventSphereUser");


    if (!savedUser) {

        message.textContent =
            "No account found. Please register first.";

        message.style.color = "#ff7777";

        return;
    }


    const user =
        JSON.parse(savedUser);


    if (
        username === user.name &&
        password === user.password
    ) {

        message.textContent =
            "Login successful!";

        message.style.color = "#77d69b";


        setTimeout(function () {

            showMainWebsite();

        }, 500);

    } else {

        message.textContent =
            "Incorrect name or password.";

        message.style.color = "#ff7777";

    }

}


/* =========================================================
   SHOW MAIN WEBSITE
========================================================= */

function showMainWebsite() {

    document.getElementById("loginPage").style.display =
        "none";

    document.getElementById("mainWebsite").classList.remove(
        "hidden"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   EVENT SELECTION
========================================================= */

function selectEvent(eventName) {

    selectedEventName = eventName;


    /* Change selected event name */

    const selectedEvent =
        document.getElementById("selectedEvent");

    if (selectedEvent) {

        selectedEvent.textContent =
            eventName;

    }


    /* Clear previous amount */

    const amount =
        document.getElementById("amount");

    if (amount) {

        amount.value = "";

    }


    /* Clear previous message */

    const bookingMessage =
        document.getElementById("bookingMessage");

    if (bookingMessage) {

        bookingMessage.textContent = "";

    }


    /* =====================================================
       OPEN BOOKING SECTION
    ===================================================== */

    const bookingSection =
        document.getElementById("booking");


    if (bookingSection) {

        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   CONFIRM BOOKING
========================================================= */

function confirmBooking() {

    const amountInput =
        document.getElementById("amount");

    const bookingMessage =
        document.getElementById("bookingMessage");


    /* Check event */

    if (selectedEventName === "") {

        bookingMessage.textContent =
            "Please select an event first.";

        bookingMessage.style.color = "#ff7777";

        return;

    }


    /* Get amount */

    const amount =
        Number(amountInput.value);


    /* Check amount */

    if (!amount || amount < 500) {

        bookingMessage.textContent =
            "Please enter a valid amount of at least ₹500.";

        bookingMessage.style.color = "#ff7777";

        return;

    }


    /* =====================================================
       CREATE BOOKING
    ===================================================== */

    const booking = {

        id:
            "ES-" +
            Date.now().toString().slice(-6),

        event:
            selectedEventName,

        amount:
            amount,

        date:
            new Date().toLocaleDateString("en-IN"),

        user:
            getCurrentUser()

    };


    /* =====================================================
       SAVE BOOKING
    ===================================================== */

    let bookings =
        JSON.parse(
            localStorage.getItem("eventSphereBookings")
        ) || [];


    bookings.push(booking);


    localStorage.setItem(
        "eventSphereBookings",
        JSON.stringify(bookings)
    );


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    bookingMessage.innerHTML =
        `
        <strong>Booking Request Submitted! 🎉</strong><br>
        Event: ${selectedEventName}<br>
        Budget: ₹${amount.toLocaleString("en-IN")}<br>
        Booking ID: ${booking.id}
        `;

    bookingMessage.style.color = "#77d69b";


    /* Clear amount */

    amountInput.value = "";


    /* Scroll to booking message */

    bookingMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   GET CURRENT USER
========================================================= */

function getCurrentUser() {

    const savedUser =
        localStorage.getItem("eventSphereUser");


    if (!savedUser) {

        return "Guest";

    }


    const user =
        JSON.parse(savedUser);


    return user.name;

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem("eventSphereUser");

    selectedEventName = "";

    document.getElementById("mainWebsite")
        .classList.add("hidden");

    document.getElementById("loginPage")
        .style.display = "flex";


    /* Reset login page */

    showLogin();


    /* Clear fields */

    document.getElementById("username").value = "";

    document.getElementById("password").value = "";

    document.getElementById("message").textContent = "";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   PREVENT ENTER KEY FROM CAUSING PAGE PROBLEMS
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const activeElement =
            document.activeElement;


        if (
            activeElement &&
            (
                activeElement.id === "username" ||
                activeElement.id === "password"
            )
        ) {

            loginUser();

        }

    }

});
```
