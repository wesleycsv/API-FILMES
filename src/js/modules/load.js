//component de load
const load = {
  elemento: document.querySelector(".load"),
  open() {
    this.elemento.classList.add("ativo");
  },
  close() {
    this.elemento.classList.remove("ativo");
  },
};

export default load;
