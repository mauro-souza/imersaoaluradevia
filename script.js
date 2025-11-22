const CardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("header div input");
let dados = [];

// Função para carregar os dados do JSON e renderizar os cards iniciais
async function carregarDados() {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

// Função que implementa a busca
function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

function renderizarCards(cardsParaRenderizar) {
    // Limpa o container antes de adicionar novos cards
    CardContainer.innerHTML = "";

    if (cardsParaRenderizar.length === 0) {
        CardContainer.innerHTML = "<p>Nenhuma tecnologia encontrada.</p>";
        return;
    }

    for (const dado of cardsParaRenderizar) {
        const article = document.createElement("article");
        article.classList.add("card"); // A classe no CSS é "card", não "Card"
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href=${dado.link} target="_blank">Saiba Mais</a>
        `
        CardContainer.appendChild(article);
    }
}

// Carrega os dados assim que o script é executado
carregarDados();
