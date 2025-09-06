//Seleciona o elemento HTML com a classe
//"mensagem-lista-vazia" e armaneza na variável
const mensagemListaVazia = document.querySelector(".mensagem-lista-vazia");

//Define a função que verifica a lista
function verificarListaVazia(listaDeCompras) {
    //Seleciona todos os elementos <li> dentro da lista de compras
    //O Js retorna como um array (lista) 
    const itensDaLista = listaDeCompras.querySelectorAll("li");

    //Se não houve nenhum item na lista = lista vazia
    if (itensDaLista.length === 0){
        mensagemListaVazia.style.display = "block";
    }else {
        mensagemListaVazia.style.display = "none";
    }
}

export default verificarListaVazia;
