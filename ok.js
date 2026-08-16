
const set10 = document.querySelector(".sett10");
const settings = document.querySelector(".settings");
const dashboard = document.querySelector(".dashboard");
const addtransition = document.querySelector(".addtransition");
const form1 = document.querySelector(".form1");
const cross = document.querySelector(".cross");
const toptrans2 = document.querySelector(".toptrans2");
const save = document.querySelector(".save");
const form = document.querySelector("form");
const TOPHEAD = document.querySelector(".TOPHEAD");
const exp = document.querySelector("#exp");
const currentbalance = document.querySelector("#currentbalance");
const incomeamt = document.querySelector("#incomeamt");
const transactiontimes = document.querySelector("#transactiontimes");

let productarray = JSON.parse(localStorage.getItem("transaction")) || [];

if (!Array.isArray(productarray)) {
    productarray = [];
}

let updateindex = null;

console.log(productarray);

settings.addEventListener("click", () => {
    set10.style.display = "flex";
});

dashboard.addEventListener("click", () => {
    set10.style.display = "none";
});

addtransition.addEventListener("click", () => {
    form1.style.display = "flex";
});

cross.addEventListener("click", () => {
    form1.style.display = "none";
    form.reset();
    updateindex = null;
});

function ui() {
    TOPHEAD.innerHTML = "";

    productarray.forEach((Element, index) => {

        TOPHEAD.innerHTML += `
            <div class="toptrans2">
                <div class="topic2">${Element.date}</div>
                <div class="topic2">${Element.description}</div>
                <div class="topic2">${Element.category.join(", ")}</div>
                <div class="topic2">${Element.amount}</div>

                <div class="topic2">

                    <span id="blue" onclick="update10(${Element.id})">
                        <i class="ri-edit-line"></i>
                    </span>

                    <span id="red" onclick="delete10(${index})">
                        <i class="ri-delete-bin-fill"></i>
                    </span>

                </div>
            </div>
        `;
    });
}

ui();

form.addEventListener("submit", (events) => {

    events.preventDefault();

    let type = events.target[0].value;
    let description = events.target[1].value;
    let amount = events.target[2].value;
    let date = events.target[3].value;

    let cate = events.target[4];
    let category = [];

    for (let option of cate.options) {
        if (option.selected) {
            category.push(option.value);
        }
    }

    if (updateindex !== null) {

        productarray[updateindex].type = type;
        productarray[updateindex].description = description;
        productarray[updateindex].amount = amount;
        productarray[updateindex].date = date;
        productarray[updateindex].category = category;

        updateindex = null;

    } else {

        let obj = {
            id: Date.now(),
            type: type,
            description: description,
            amount: amount,
            date: date,
            category: category
        };

        productarray.push(obj);
    }

    localStorage.setItem(
        "transaction",
        JSON.stringify(productarray)
    );

    ui();
    updatecard();
    updateChart();

    form.reset();
    form1.style.display = "none";
});

function delete10(index) {

    productarray.splice(index, 1);

    localStorage.setItem(
        "transaction",
        JSON.stringify(productarray)
    );

    ui();
    updatecard();
    updateChart();
}

function update10(id) {

    let history = productarray.find(item => item.id === id);

    if (!history) {
        return;
    }

    form1.style.display = "flex";

    form[0].value = history.type;
    form[1].value = history.description;
    form[2].value = history.amount;
    form[3].value = history.date;

    for (let option of form[4].options) {
        option.selected = history.category.includes(option.value);
    }

    updateindex = productarray.findIndex(
        item => item.id === id
    );
}

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
}

document.querySelector(".logout").addEventListener("click", () => {
    logout();
});

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {

    window.location.href = "login.html";

} else {

    document.querySelector("#naam").textContent =
        loggedInUser.name;
}

function updatecard() {

    let expense = 0;
    let income = 0;

    productarray.forEach((item) => {

        if (item.type === "Expenses") {
            expense += Number(item.amount);
        }

        if (item.type === "Income") {
            income += Number(item.amount);
        }
    });

    document.querySelector("#expenses10").textContent = expense;

    document.querySelector("#income10").textContent = income;

    document.querySelector("#balanced10").textContent =
        income - expense;

    document.querySelector("#Transaction10").textContent =
        productarray.length;
}

updatecard();

document.querySelector("#reset10").addEventListener("click", () => {

    let confirmDelete = confirm(
        "Your data will be permanently deleted"
    );

    if (confirmDelete) {

        localStorage.removeItem("transaction");

        productarray = [];

        ui();
        updatecard();
        updateChart();
    }
});

const ctx = document.getElementById("myChart");

let myChart = new Chart(ctx, {

    type: "bar",

    data: {

        labels: ["Expenses", "Income"],

        datasets: [

            {
                label: "Expenses",
                data: [0, 0],
                backgroundColor: "red",
                borderWidth: 1
            },

            {
                label: "Income",
                data: [0, 0],
                backgroundColor: "green",
                borderWidth: 1
            }

        ]
    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: true,
                position: "top"
            }

        },

        scales: {

            y: {
                beginAtZero: true
            }

        }

    }
});

function updateChart() {

    let expense = 0;
    let income = 0;

    productarray.forEach((item) => {

        if (item.type === "Expenses") {
            expense += Number(item.amount);
        }

        if (item.type === "Income") {
            income += Number(item.amount);
        }
    });

    myChart.data.datasets[0].data = [expense, 0];

    myChart.data.datasets[1].data = [0, income];

    myChart.update();
}

updateChart();

