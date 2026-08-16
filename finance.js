TOPHEAD = document.querySelector(".TOPHEAD");
let updateindex = null;

document.querySelector(".settings").addEventListener("click",()=>{
    document.querySelector(".sett10").style.display = "flex";
})

document.querySelector(".dashboard").addEventListener("click",()=>{
document.querySelector(".sett10").style.display = "none";
})

document.querySelector(".bottom").addEventListener("click",()=>{
    document.querySelector(".form1").style.display = "flex";
})

document.querySelector(".cross").addEventListener("click",()=>{
    document.querySelector(".form1").style.display = "none";
})

productarray = JSON.parse(localStorage.getItem("transaction"))||[];

let ui = function () {
    TOPHEAD.innerHTML = "";

    productarray.forEach((element,index) => {
        TOPHEAD.innerHTML += `<div class="toptrans2">
            <div class="topic2">${element.date}</div>
            <div class="topic2">${element.description}</div>
            <div class="topic2">${element.category}</div>
            <div class="topic2">${element.amount}</div>
            <div class="topic2">
                <span id="blue" onclick="edit(${element.id})"><i class="ri-edit-line"></i></span>
                <span id="red" onclick="deletetransaction(${index})"><i class="ri-delete-bin-fill"></i></span>
            </div>
        </div>`;
    });
};
ui();
const form = document.querySelector("#transactionForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let type = e.target[0].value;
    let description = e.target[1].value;
    let amount = e.target[2].value;
    let date = e.target[3].value;
    let category = e.target[4].value;

    let obj = {
        id: Date.now(),
        type,
        description,
        amount,
        date,
        category
    };

    console.log(obj);

   if(updateindex != null){
productarray[updateindex]=obj;
updateindex = null;
localStorage.setItem("transaction",JSON.stringify(productarray));
   }
   else{
     productarray.push(obj);
     localStorage.setItem("transaction",JSON.stringify(productarray));
   }

    ui();

    form.reset();
    document.querySelector(".form1").style.display = "none";
});


 let deletetransaction =function (index) {
    productarray.splice(index,1);
     localStorage.setItem("transaction",JSON.stringify(productarray));
    ui();
}

let edit = function (id) {
    document.querySelector(".form1").style.display = "flex";
    let history = productarray.find((item)=>item.id === id);
    form[0].value = history.type;
    form[1].value = history.description;
    form[2].value = history.amount;
    form[3].value = history.date;
    updateindex = productarray.findIndex((item)=>item.id === id);
}

let updatecard = function(){
    let expenses = 0;
    let income = 0;
    productarray.forEach((item)=>{
        if(item.type === "expenses"){
            expenses += Number(item.amount);
        }
        if(item.type === "income"){
            income += Number(item.amount);
        }
    })
    document.querySelector("#income10").textContent = income;
    document.querySelector("#expenses10").textContent = expenses;
    document.querySelector("#balanced10").textContent = income-expenses;
    document.querySelector("#Transaction10").textContent = productarray.length;
}
updatecard()

document.querySelector("#reset10").addEventListener("click",()=>{
    alert("all the data will be deleted");
    localStorage.clear();
})

let expenses = 0;
let income = 0;
productarray.forEach((item) => {
    if (item.type === "expenses") {
        expenses += Number(item.amount);
    }
    if (item.type === "income") {
        income += Number(item.amount);
    }
});
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',

    data: {
        labels: ['Expenses', 'Income'],

        datasets: [
            {
                label: 'Expenses',
                data: [expenses, 0],
                backgroundColor: 'red',
                borderWidth: 1
            },
            {
                label: 'Income',
                data: [0,income],
                backgroundColor: 'lightgreen',
                borderWidth: 1
            }
        ]
    },

    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

settingarr = JSON.parse(localStorage.getItem("setting"))||[];

const form1 = document.querySelector("#settingForm");

form1.addEventListener("submit",(e)=>{
e.preventDefault();

let names1000 = e.target[0].value;
let currency1000 = e.target[1].value;

let obj10 = {
    id:Date.now(),
    names1000,
    currency1000
}
    settingarr = [obj10];
    localStorage.setItem("setting",JSON.stringify(settingarr));

form1.reset();
})
document.querySelector("#naam").textContent = settingarr[0].names1000;
document.querySelector("#rupees").textContent = settingarr[0].currency1000;
document.querySelector("#rupees1").textContent = settingarr[0].currency1000;
document.querySelector("#rupees2").textContent = settingarr[0].currency1000;

let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enabledarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disabledarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}
if(darkmode === "active") enabledarkmode()
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enabledarkmode() : disabledarkmode()
})

document.querySelector(".logout").addEventListener("click",()=>{
     window.location.href = "login.html";
})

let username =JSON.parse( localStorage.getItem("loggedInUser"));
console.log(username.name);


document.querySelector("#naam").textContent = username.name;