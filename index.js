// Importa a função criarItemDaLista do arquivo especificado
import { criarItemDaLista } from "./scripts/criarItemDaLista.js";
// Importa a função verificarListaVazia do arquivo especificado
import verificarListaVazia from "./scripts/verificarListaVazia.js";

// Seleciona o input onde o usuário digita o item
const inputItem = document.getElementById("input-item");
// Seleciona a lista de compras (ul ou ol)
const listaDeCompras = document.getElementById("lista-de-compras");
// Seleciona o botão de adicionar item
const botaoAdicionar = document.getElementById("adicionar-item");
botaoAdicionar.style.cursor = "pointer";

// Adiciona um ouvinte de evento de clique ao botão de adicionar
botaoAdicionar.addEventListener("click", (evento) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    evento.preventDefault();
    // Cria um novo item da lista usando a função importada
    const itemDaLista = criarItemDaLista();
    // Adiciona o novo item à lista de compras
    listaDeCompras.appendChild(itemDaLista);
    // Verifica se a lista está vazia e atualiza a interface se necessário
    verificarListaVazia(listaDeCompras);
    // Limpa o campo de input após adicionar o item
    inputItem.value = "";
});

// Faz uma verificação inicial se a lista está vazia ao carregar a página
verificarListaVazia(listaDeCompras);

