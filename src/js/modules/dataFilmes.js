//Montar o modal de filmes
export default function dataFilmes(data) {
  let modalContent = document.querySelector(".app");
  modalContent.innerHTML = `
      <div class="modal-img">
        <img src="${data.Poster}" alt="" />
      </div>
      <div class="modal-conteudo">
        <span class="titulo-infor">Titulo</span>
        <h2>${data.Title}</h2>
        <p class="post-descricao">
          ${data.Plot}
        </p>
        <span class="titulo-infor">Ano</span>
        <p>${data.Year}</p>
        <span class="titulo-infor">Atores</span>
        <p>${data.Actors}</p>
        <button class="btn-add" onclick='{handleAdd(${JSON.stringify(
          data
        ).replace("'", "`")})}'>
          <i class="bi bi-check-circle-fill"></i> Adcionar
        </button>
      </div>`;
}
