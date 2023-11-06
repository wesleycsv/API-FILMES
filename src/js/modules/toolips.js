//Controler do Tooltips
export default function Toolips() {}

const tooltip = document.querySelector("[arial-tooltip]");

function onMouseOver(event) {
  const tooltipBox = createElement(this);

  onMouseLeave.tooltipBox = tooltipBox;
  onMouseLeave.elemento = this;
  this.addEventListener("mouseleave", onMouseLeave);

  onMouseMove.tooltipBox = tooltipBox;
  this.addEventListener("mousemove", onMouseMove);
}

const onMouseLeave = {
  handleEvent() {
    this.tooltipBox.remove();
    this.elemento.removeEventListener("mouseleave", onMouseLeave);
    this.elemento.removeEventListener("mousemove", onMouseMove);
  },
};

const onMouseMove = {
  handleEvent(event) {
    this.tooltipBox.style.top = event.pageY + 20 + "px";
    this.tooltipBox.style.left = event.pageX + 20 + "px";
  },
};

function createElement(elemento) {
  const createDiv = document.createElement("div");
  createDiv.classList.add("tooltip");
  createDiv.innerHTML = elemento.getAttribute("arial-tooltip");
  document.body.appendChild(createDiv);
  return createDiv;
}

tooltip.addEventListener("mouseenter", onMouseOver);
