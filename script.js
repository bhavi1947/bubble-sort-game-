const bubbleContainer = document.getElementById("bubbleContainer");
const message = document.getElementById("message");

let numbers = [];

function generateBubbles() {
    numbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    message.textContent = "Arrange the numbers in ascending order!";
    renderBubbles();
}

function renderBubbles() {
    bubbleContainer.innerHTML = "";
    numbers.forEach((num, index) => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = num;
        bubble.setAttribute("draggable", true);
        bubble.setAttribute("data-index", index);

        bubble.addEventListener("dragstart", dragStart);
        bubble.addEventListener("dragover", dragOver);
        bubble.addEventListener("drop", drop);

        bubbleContainer.appendChild(bubble);
    });
}

let draggedIndex = null;

function dragStart(event) {
    draggedIndex = event.target.getAttribute("data-index");
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    const targetIndex = event.target.getAttribute("data-index");

    if (draggedIndex !== null && targetIndex !== null) {
        [numbers[draggedIndex], numbers[targetIndex]] = [numbers[targetIndex], numbers[draggedIndex]];
        renderBubbles();
        checkWin();
    }
}

function checkWin() {
    if (numbers.every((num, i, arr) => i === 0 || arr[i - 1] <= num)) {
        message.textContent = "You sorted it correctly! 🎉";
    }
}

generateBubbles();