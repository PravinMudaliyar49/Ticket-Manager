
let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskAreaCont = document.querySelector(".textarea-cont");
let addModal = true;

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

modalCont.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === 'Shift') {
        createTicket();
        addModal = !addModal;
        modalCont.style.display = "none";
        taskAreaCont.value = "";
    };
});


function createTicket() {
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-color"></div>
    <div class="ticket-id">
        sample-id
    </div>
    <div class="task-area">
        ${taskAreaCont.value}
    </div>
    `;

    mainCont.append(ticketCont);

}













