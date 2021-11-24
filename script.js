
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");

let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskAreaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");

let addModal = true;
let removeFlag = true;

let lockClass = "fa-lock";
let unLockClass = "fa-unlock"

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

//Listener for modal priority coloring
allPriorityColors.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (event) => {
        allPriorityColors.forEach((priorityColorEle, idx) => {
            priorityColorEle.classList.remove("border");
        });

        colorElem.classList.add("border");

        modalPriorityColor = colorElem.classList[0];

    });
});

addBtn.addEventListener("click", (event) => {
    //Display modal.
    //Generate ticket.

    if (addModal) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }

    addModal = !addModal;
});

removeBtn.addEventListener("click", (event) => {
    removeFlag = !removeFlag;
});

modalCont.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === 'Shift') {
        createTicket(modalPriorityColor, taskAreaCont.value, shortid());
        addModal = !addModal;
        modalCont.style.display = "none";
        taskAreaCont.value = "";
    };
});


function createTicket(ticketColor, ticketTask, ticketId) {
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor} "></div>
    <div class="ticket-id">${ticketId}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
    <i class="fas fa-lock"></i>
    </div>
    `;

    mainCont.append(ticketCont);

    handleRemoval(ticketCont);
    handleLock(ticketCont);
}

function handleRemoval(ticket) {
    if (removeFlag) {
        ticket.remove();
    }
}

function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");

    ticketLock.addEventListener("click", (event) => {
        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unLockClass);
            ticketTaskArea.setAttribute("contenteditable", true);
        } else {
            ticketLock.classList.remove(unLockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", false);
        }
    });
}














