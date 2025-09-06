// Exporta a constante 'inputItem' para que ela possa ser usada em outros arquivos JavaScript.
// Essa constante está ligada ao elemento HTML com o id "input-item" (geralmente um campo <input>)
export const inputItem = document.getElementById("input-item");

let contador = 0;

// Exporta a função 'criarItemDaLista', que será usada para criar um novo item na lista de compras.
export function criarItemDaLista() {
  const valor = (inputItem.value || "").trim();

  // Verifica se o campo de entrada está vazio
  if (valor === "") {
    alert("Por favor, insira um item!");
    return;
  }

  // <li> do item
  const itemDaLista = document.createElement("li");

  // Container principal da linha
  const containerItemDaLista = document.createElement("div");
  containerItemDaLista.classList.add("lista-item-container");

  // ====== ESQUERDA: checkbox + texto ======
  const containerTexto = document.createElement("div");
  containerTexto.style.display = "flex";
  containerTexto.style.alignItems = "center";
  containerTexto.style.gap = "10px";
  containerTexto.style.flex = "1";

  // checkbox
  const inputCheckBox = document.createElement("input");
  inputCheckBox.type = "checkbox";
  inputCheckBox.id = "checkbox-" + contador++;

  // texto do item
  const nomeItem = document.createElement("p");
  nomeItem.classList.add("lista-item-texto");
  nomeItem.innerText = valor;

  // risco quando marcar o checkbox
  inputCheckBox.addEventListener("change", function () {
    if (inputCheckBox.checked) {
      nomeItem.classList.add("line-through");
    } else {
      nomeItem.classList.remove("line-through");
    }
  });

  containerTexto.appendChild(inputCheckBox);
  containerTexto.appendChild(nomeItem);

  // ====== DIREITA: botões editar + excluir ======
  const containerBotoes = document.createElement("div");
  containerBotoes.classList.add("container-botoes");

  // Botão Editar
  const botaoEditar = document.createElement("button");
  botaoEditar.classList.add("botao-editar");
  botaoEditar.style.cursor = "pointer";
  botaoEditar.innerHTML = `<i class="bi bi-pencil"></i>`;

  // Botão Excluir
  const botaoExcluir = document.createElement("button");
  botaoExcluir.classList.add("botao-excluir");
  botaoExcluir.style.cursor = "pointer";
  botaoExcluir.innerHTML = `<i class="bi bi-trash"></i>`;

  containerBotoes.appendChild(botaoEditar);
  containerBotoes.appendChild(botaoExcluir);

  // ====== Monta a linha ======
  containerItemDaLista.appendChild(containerTexto);
  containerItemDaLista.appendChild(containerBotoes);
  itemDaLista.appendChild(containerItemDaLista);

  // ====== Eventos ======

  // Excluir
  botaoExcluir.addEventListener("click", function () {
    const confirmacao = confirm("Deseja realmente excluir esse item?");
    if (confirmacao) {
      itemDaLista.remove();

      // Se quiser mostrar a mensagem de lista vazia após excluir:
      const lista = document.getElementById("lista-de-compras");
      const msg = document.querySelector(".mensagem-lista-vazia");
      if (lista && msg && lista.querySelectorAll("li").length === 0) {
        msg.style.display = "block";
      }
    }
  });

  // Editar (transforma apenas o texto em input e salva com Enter/blur; cancela com Esc)
  botaoEditar.addEventListener("click", function () {
    // Evita abrir dois campos de edição ao mesmo tempo no mesmo item
    if (containerTexto.querySelector(".input-edicao")) {
      containerTexto.querySelector(".input-edicao").focus();
      return;
    }

    const inputEdicao = document.createElement("input");
    inputEdicao.type = "text";
    inputEdicao.value = nomeItem.innerText;
    inputEdicao.classList.add("input-edicao");

    // Estilinho básico sem depender do CSS global
    inputEdicao.style.flex = "1";
    inputEdicao.style.fontSize = "16px";
    inputEdicao.style.padding = "8px 10px";
    inputEdicao.style.border = "1px solid var(--cinza)";
    inputEdicao.style.borderRadius = "10px";

    // Troca apenas o texto pelo input
    containerTexto.replaceChild(inputEdicao, nomeItem);
    inputEdicao.focus();
    inputEdicao.select();

    const aplicarRiscoSeMarcado = () => {
      if (inputCheckBox.checked) {
        nomeItem.classList.add("line-through");
      } else {
        nomeItem.classList.remove("line-through");
      }
    };

    const salvar = () => {
      const novoValor = inputEdicao.value.trim();
      if (novoValor === "") {
        alert("O item não pode ficar vazio.");
        inputEdicao.focus();
        return;
      }
      nomeItem.innerText = novoValor;
      containerTexto.replaceChild(nomeItem, inputEdicao);
      aplicarRiscoSeMarcado();
    };

    const cancelar = () => {
      containerTexto.replaceChild(nomeItem, inputEdicao);
      aplicarRiscoSeMarcado();
    };

    inputEdicao.addEventListener("keydown", (event) => {
      if (event.key === "Enter") salvar();
      if (event.key === "Escape") cancelar();
    });

    // Também salva ao perder o focos
    inputEdicao.addEventListener("blur", salvar);
  });

  // Retorna o <li> pronto
  return itemDaLista;
}


