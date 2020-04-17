var modal = document.querySelector(".modal");
var trigger = document.querySelector(".button-modal");
var body = $('body', window.parent.document).html();

function toggleModal() {
    console.log("click");
    modal.classList.toggle("show-modal").appendTo(body);
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
