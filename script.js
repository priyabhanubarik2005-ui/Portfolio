/* =====================================
   PORTFOLIO JAVASCRIPT
   Priyabhanu Barik
===================================== */


/* =====================================
   FOOTER YEAR
===================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =====================================
   DARK / LIGHT MODE
===================================== */

const themeToggle =
  document.getElementById("themeToggle");

const savedTheme =
  localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {

  document.body.classList.add("dark");

  themeToggle.textContent = "☀️";

}


themeToggle.addEventListener("click", function () {

  document.body.classList.toggle("dark");

  const isDark =
    document.body.classList.contains("dark");

  if (isDark) {

    localStorage.setItem(
      "portfolioTheme",
      "dark"
    );

    themeToggle.textContent = "☀️";

  } else {

    localStorage.setItem(
      "portfolioTheme",
      "light"
    );

    themeToggle.textContent = "🌙";

  }

});


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
  document.getElementById("contactForm");

const formMessage =
  document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

  event.preventDefault();


  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const message =
    document.getElementById("message").value.trim();


  if (!name || !email || !message) {

    formMessage.textContent =
      "Please fill in all fields.";

    return;
  }


  /* Create response object */

  const response = {

    id: Date.now(),

    name: name,

    email: email,

    message: message,

    timestamp:
      new Date().toLocaleString()

  };


  /* Get existing responses */

  let responses =
    JSON.parse(
      localStorage.getItem("portfolioResponses")
    ) || [];


  /* Add new response */

  responses.push(response);


  /* Save responses */

  localStorage.setItem(
    "portfolioResponses",
    JSON.stringify(responses)
  );


  /* Show success message */

  formMessage.textContent =
    "Thank you! Your message has been received.";


  /* Reset form */

  contactForm.reset();


  /* Optional Google Apps Script */

  sendToGoogleSheets(response);

});


/* =====================================
   GOOGLE APPS SCRIPT
===================================== */

/*
   IMPORTANT:

   Replace the URL below after creating
   your Google Apps Script Web App.

   Example:

   const GOOGLE_SCRIPT_URL =
   "https://script.google.com/macros/s/XXXX/exec";
*/

const GOOGLE_SCRIPT_URL = "";


function sendToGoogleSheets(response) {

  /*
     If URL is empty, we only use localStorage.

     This allows the project to work in CodePen
     before Google Apps Script is configured.
  */

  if (!GOOGLE_SCRIPT_URL) {

    console.log(
      "Google Apps Script URL not configured."
    );

    return;
  }


  fetch(GOOGLE_SCRIPT_URL, {

    method: "POST",

    mode: "no-cors",

    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },

    body: JSON.stringify(response)

  })
  .then(() => {

    console.log(
      "Response sent to Google Sheets."
    );

  })
  .catch((error) => {

    console.error(
      "Google Sheets error:",
      error
    );

  });

}


/* =====================================
   ADMIN LOGIN
===================================== */

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");

const loginBox =
  document.getElementById("loginBox");

const responsesBox =
  document.getElementById("responsesBox");

const logoutButton =
  document.getElementById("logoutButton");


/*
   DEMO ADMIN CREDENTIALS

   Username:
   admin

   Password:
   priyabhanu123
*/


const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "priyabhanu123";


loginButton.addEventListener("click", function () {

  const username =
    document.getElementById("adminUsername").value;

  const password =
    document.getElementById("adminPassword").value;


  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {

    loginMessage.textContent =
      "Login successful.";

    loginMessage.style.color =
      "#22c55e";


    loginBox.classList.add("hidden");

    responsesBox.classList.remove("hidden");


    displayResponses();

  } else {

    loginMessage.textContent =
      "Invalid username or password.";

    loginMessage.style.color =
      "#ef4444";

  }

});


/* =====================================
   DISPLAY RESPONSES
===================================== */

function displayResponses() {

  const responsesList =
    document.getElementById("responsesList");


  let responses =
    JSON.parse(
      localStorage.getItem("portfolioResponses")
    ) || [];


  if (responses.length === 0) {

    responsesList.innerHTML = `
      <div class="response-card">
        <p>No responses received yet.</p>
      </div>
    `;

    return;
  }


  /* Show newest first */

  responses =
    responses.reverse();


  responsesList.innerHTML =
    responses.map(function (response) {

      return `

        <div class="response-card">

          <h4>
            ${escapeHTML(response.name)}
          </h4>

          <div class="response-email">
            ${escapeHTML(response.email)}
          </div>

          <div class="response-message">
            ${escapeHTML(response.message)}
          </div>

          <div class="response-time">
            Received: ${escapeHTML(response.timestamp)}
          </div>

        </div>

      `;

    }).join("");

}


/* =====================================
   HTML SECURITY FUNCTION
===================================== */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =====================================
   LOGOUT
===================================== */

logoutButton.addEventListener("click", function () {

  responsesBox.classList.add("hidden");

  loginBox.classList.remove("hidden");

  document.getElementById(
    "adminUsername"
  ).value = "";

  document.getElementById(
    "adminPassword"
  ).value = "";

  loginMessage.textContent = "";

});


/* =====================================
   CLEAR RESPONSES
===================================== */

document
  .getElementById("clearResponses")
  .addEventListener("click", function () {

    const confirmation =
      confirm(
        "Are you sure you want to delete all responses?"
      );


    if (!confirmation) {
      return;
    }


    localStorage.removeItem(
      "portfolioResponses"
    );


    displayResponses();

  });


/* =====================================
   DEMO DATA
===================================== */

/*
   This function creates sample responses
   so you can demonstrate the admin panel
   during your project presentation.

   Run:

   addDemoData()

   from browser console.
*/


function addDemoData() {

  const demoResponses = [

    {

      id: Date.now(),

      name: "Rahul Kumar",

      email: "rahul@example.com",

      message:
        "Hello Priyabhanu, I liked your portfolio website.",

      timestamp:
        new Date().toLocaleString()

    },

    {

      id: Date.now() + 1,

      name: "Ananya Das",

      email: "ananya@example.com",

      message:
        "Your portfolio looks great. Best wishes!",

      timestamp:
        new Date().toLocaleString()

    }

  ];


  localStorage.setItem(

    "portfolioResponses",

    JSON.stringify(demoResponses)

  );


  alert(
    "Demo responses added successfully."
  );

}