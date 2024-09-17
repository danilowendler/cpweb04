function salvarItem() {
    // Obtém o item inserido pelo usuário
    const item = document.getElementById('item').value;

    // Verifica se o item não está vazio
    if (item !== '') {
        // Obtém a lista existente do localStorage ou cria uma lista vazia*
        let lista = JSON.parse(localStorage.getItem('lista')) || [];
        // Adiciona o novo item à lista
        lista.push(item);
        // Armazena a lista atualizada no localStorage
        localStorage.setItem('lista', JSON.stringify(lista));
        // Limpa o campo de entrada
        document.getElementById('item').value = '';
    }
}
//*Criar uma lista vazia garante que a variável lista sempre contenha um array válido, independentemente de haver ou não dados no localStorage. Isso torna o código mais robusto e evita que a aplicação falhe inesperadamente.

function visualizarLista() {
    // Obtém a lista armazenada no localStorage
    const lista = JSON.parse(localStorage.getItem('lista')) || [];
    // Seleciona o elemento ul para exibir a lista
    const listaHtml = document.getElementById('lista');
    // Limpa o conteúdo da lista HTML
    listaHtml.innerHTML = '';

    // Percorre cada item da lista
    lista.forEach(item => {
        // Cria um elemento li para cada item
        const li = document.createElement('li');
        // Define o conteúdo do elemento li como o item
        li.textContent = item;
        // Adiciona o elemento li à lista HTML
        listaHtml.appendChild(li);
    });
}

function limparLista() {
    // Remove a lista do localStorage
    localStorage.removeItem('lista');
    // Limpa a lista exibida na página
    document.getElementById('lista').innerHTML = '';
}
