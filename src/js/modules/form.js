import key from "./key.js";
import dataFilmes from "./dataFilmes.js";
import { openModalToggle } from "./modal.js";
import load from "./load.js";

export default function form() {
  const box = document.querySelector(".box");
  const listaFilmes = document.querySelector(".lista-filmes");
  const inputBuscar = document.querySelector(".input-buscar");
  let moviFilmes = JSON.parse(localStorage.getItem("moviList")) ?? [];

  let inputName = document.querySelector("#nome");

  async function getForm() {
    try {
      load.open();
      let url = `http://omdbapi.com/?apikey=${key}&t=${validateNome()}`;
      let response = await fetch(url)
        .then((data) => {
          load.close();
          return data.json();
        })
        .catch(() => {
          load.close();
        });

      if (response.Error) {
        throw new Error("Filme não encontrado");
      }

      dataFilmes(response);
      openModalToggle();
    } catch (error) {
      notie.alert({
        type: "error", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: error.message,
      });
    }
  }

  //btn de remove Filmes
  window.handleRemove = (dados) => {
    moviFilmes = moviFilmes.filter((filmes) => {
      return filmes.imdbID !== dados;
    });
    document.getElementById(`move-card-${dados}`).remove();
    showTitulo();
    updateLocalSotorage();
  };
  //btn de adcionar Filmes
  window.handleAdd = (dados) => {
    if (verificarFilmes(dados.imdbID)) {
      openModalToggle();
      notie.alert({
        type: "error", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: "Filme já está na lista",
      });
      return;
    }

    moviFilmes.push(dados);
    updateFilmes(dados);
    updateLocalSotorage();
    inputBuscar.value = "";
    showTitulo();
    openModalToggle();
    getLastMove(dados);
  };

  // mostra o ultimo card adcionado
  function getLastMove(dados) {
    const lastMove = document.getElementById(`move-card-${dados.imdbID}`);
    lastMove.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }

  //Verificar se o filme já existe
  function verificarFilmes(imdbID) {
    const validado = moviFilmes.find((imdbIDArray) => {
      return imdbIDArray.imdbID === imdbID;
    });
    return validado;
  }

  //Adcionar filmes no html
  function updateFilmes(dados) {
    box.innerHTML += `
    <div class="box-divisor" id="move-card-${dados.imdbID}">
    <div class="box-item">
      <div class="remove">
        <button class="btn-remove" onclick="{handleRemove('${dados.imdbID}')}">
          <i class="bi bi-trash"></i>Remove
        </button>
      </div>
      <div class="img-lista-filme">
        <img
          src="${dados.Poster}"
          alt=""
        />
      </div>
    </div>
  </div>
    `;
  }

  moviFilmes.forEach(updateFilmes);

  //Valida nome do Filmes
  function validateNome() {
    if (inputName.value === "") {
      load.close();
      throw new Error("O nome do filme deve ser informado");
    }
    return inputName.value.trim().replace(" ", "+");
  }

  //Atualizar o localStore
  function updateLocalSotorage() {
    localStorage.setItem("moviList", JSON.stringify(moviFilmes));
  }

  //Ações de Botões
  const btnBuscar = document.querySelector('[data-btn="buscar"]');
  btnBuscar.addEventListener("click", getForm);

  const h1 = document.createElement("h1");
  h1.classList.add("tituto-lista");

  //Volta ao topo quando não tiver filmes
  function showTitulo() {
    if (moviFilmes.length == 1) {
      h1.innerHTML = '<i class="bi bi-tv-fill"></i> Sua lista favorita';
      listaFilmes.insertBefore(h1, box);
    } else if (moviFilmes.length == 0) {
      document.querySelector(".tituto-lista").remove();
      window.scrollTo({
        top: 0 + "px",
        behavior: "smooth",
      });
    }
  }
  console.log("Flag: Deus é Fiel");
}
