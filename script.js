
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");

let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskAreaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let toolBoxColors = document.querySelectorAll(".color");

let ticketsArr = [];

let addModal = true;
let removeFlag = false;

let lockClass = "fa-lock";
let unLockClass = "fa-unlock"

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

if(localStorage.getItem("jira_tickets")){
    //Fetch and display tickets.
    ticketsArr = JSON.parse(localStorage.getItem("jira_tickets"));
    ticketsArr.forEach((ticketObj) => {
        createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId);
    });
}

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
        createTicket(modalPriorityColor, taskAreaCont.value);
        addModal = !addModal;
        setModalToDefault();
    };
});

toolBoxColors.forEach((colorElem) => {
    colorElem.addEventListener("click", (event) => {
        let color = colorElem.classList[0];

        let filteredTickets = ticketsArr.filter((ticketObj) => {
            return color === ticketObj.ticketColor;
        });

        //Remove all the tickets.
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        allTicketsCont.forEach((ticket) => {
            ticket.remove();
        });

        //Display the filtered tickets.
        filteredTickets.forEach((ticketObj) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId);
        });

    });

    colorElem.addEventListener("dblclick", (event) => {
        //Re-add all the tickets.
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        allTicketsCont.forEach((ticket) => {
            ticket.remove();
        });

        ticketsArr.forEach((ticketObj) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId);
        });

    });

});


function createTicket(ticketColor, ticketTask, ticketId) {
    let id = ticketId || shortid();

    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor} "></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
    <i class="fas fa-lock"></i>
    </div>
    `;
    
    mainCont.append(ticketCont);
    
    //Create object of the ticket and add it to the array.
    if (!ticketId) {
        ticketsArr.push({
            ticketColor, ticketTask, ticketId: id
        });
        
        localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
    }
    
    handleRemoval(ticketCont, id);
    handleLock(ticketCont, id);
    handleColor(ticketCont, id);
}

function handleRemoval(ticket, id) {
    ticket.addEventListener("click", (event) => {
        if (removeFlag) {
            //Database removal.
            let ticketIdx = getTicketIdx(id);
            ticketsArr.splice(ticketIdx, 1);
            localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));

            ticket.remove();        //UI removal.
        }
    });
}

function handleLock(ticket, id) {
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");

    ticketLock.addEventListener("click", (event) => {
        let ticketIdx = getTicketIdx(id);

        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unLockClass);
            ticketTaskArea.setAttribute("contenteditable", true);
        } else {
            ticketLock.classList.remove(unLockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", false);
        }

        ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
        localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr)); 
        
    });
}

function handleColor(ticket, id) {
    let ticketColor = ticket.querySelector(".ticket-color");

    ticketColor.addEventListener("click", (event) => {
        //Get ticket_idx from the tickets_arr.
        let ticketIdx = getTicketIdx(id);

        let currentTicketColor = ticketColor.classList[1];

        //Get the index of the currentTicketColor.

        let currentColorIndex = colors.findIndex((color) => {
            return color === currentTicketColor;
        });

        currentColorIndex = (currentColorIndex + 1) % colors.length;

        let newColor = colors[currentColorIndex];

        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newColor);

        //Update the change in priority_color... in the local_storage.
        ticketsArr[ticketIdx].color = newColor;
        localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr)); 

    });


}

function getTicketIdx(id){
    return ticketsArr.findIndex((ticketObj) => {
        return ticketObj.ticketId === id;
    });
}

function setModalToDefault() {
    modalCont.style.display = "none";
    taskAreaCont.value = "";
    modalPriorityColor = colors[colors.length - 1];
    allPriorityColors.forEach((priorityColorEle, idx) => {
        priorityColorEle.classList.remove("border");
    });

    allPriorityColors[allPriorityColors.length - 1].classList.add("border");

}










