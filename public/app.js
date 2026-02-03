const API_BASE_URL = 'http://localhost:5500'

let token = "";
let currentUser = "";

async function signup() {
    const user = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("password").value;

    const res = await fetch(`${API_BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, email, pwd })
    });

    const data = await res.json();
    alert(data.message || "Signed up!");
    console.log(data);
}

async function login() {
    const user = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("password").value;

    const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, email, pwd })
    });

    const data = await res.json();
    console.log(data);

    if (data.token) {
        token = data.token;
        currentUser = username;
        document.getElementById("auth").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        document.getElementById("user").innerText = username;
    } else {
        alert(data.error || "Login failed");
    } 
}

async function getSubscriptions() {
    const res = await fetch(`${API_BASE_URL}/subscriptions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const plans = await res.json();

    const list = document.getElementById("plansList");
    list.innerHTML = "";

    plans.forEach(plan => {
        const li = document.createElement("li");
        li.textContent = `${plan.name} — ₹${plan.price}`;
        const btn = document.createElement("button");
        btn.textContent = "Subscribe";
        btn.onclick = () => subscribe(plan.id);
        li.appendChild(btn);

        list.appendChild(li);
    });
}

async function subscribe(planId) {
    const res = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ planId })
    });
    const data = await res.json();
    alert(data.message || "Subscribed!");
}
