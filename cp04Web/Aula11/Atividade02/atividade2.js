// Função para criar a animação de adicionar o produto ao carrinho
function adicionarProdutoAnimado(id, nome, valor, quantidade) {
    adicionarProduto(id, nome, valor, quantidade);

    // Selecionar o botão que foi clicado
    const button = event.target;
    const cartIcon = document.querySelector('.cart-icon');

    // Criar um clone do botão para a animação
    const buttonClone = button.cloneNode(true);
    buttonClone.style.position = 'absolute';
    buttonClone.style.left = `${button.getBoundingClientRect().left}px`;
    buttonClone.style.top = `${button.getBoundingClientRect().top}px`;
    buttonClone.style.width = `${button.offsetWidth}px`;
    buttonClone.style.height = `${button.offsetHeight}px`;
    buttonClone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
    buttonClone.style.zIndex = 1000;

    document.body.appendChild(buttonClone);

    // Definir a animação
    setTimeout(() => {
        buttonClone.style.transform = `translate(${cartIcon.getBoundingClientRect().left - button.getBoundingClientRect().left}px, ${cartIcon.getBoundingClientRect().top - button.getBoundingClientRect().top}px) scale(0.1)`;
        buttonClone.style.opacity = 0;
    }, 100);

    // Remover o clone após a animação
    setTimeout(() => {
        buttonClone.remove();
    }, 1000);

    // Atualizar o contador do carrinho
    const cartCount = document.getElementById('cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + quantidade;
}

// Função padrão para adicionar produto ao carrinho (sem animação)
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);
    
    if (produtoExistente) {
        // Atualizar a quantidade se o produto já estiver no carrinho
        produtoExistente.quantidade += quantidade;
    } else {
        // Adicionar o novo produto ao carrinho
        carrinho.push({ id, nome, valor, quantidade });
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

// Função para exibir o carrinho de compras
function exibirCarrinho() {
    const listaProdutos = document.getElementById('lista-produtos');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        listaProdutos.innerHTML = "Seu carrinho está vazio!";
    } else {
        listaProdutos.innerHTML = '';
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${produto.nome} - ${produto.quantidade}x R$${produto.valor.toFixed(2)}</span>
                <button onclick="removerProduto(${produto.id})">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    }
}

// Função para remover produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para permitir o arraste
function allowDrop(event) {
    event.preventDefault();
    document.querySelector('.cart-icon').classList.add('dragover'); // Adiciona estilo quando arrastado sobre o carrinho
}

// Função para capturar o início do arraste
function drag(event) {
    const produtoId = event.target.id.replace('produto', '');
    event.dataTransfer.setData('produtoId', produtoId);
}

// Função para remover o estilo de "arrastando sobre" quando o item sai do carrinho
function dropLeave(event) {
    document.querySelector('.cart-icon').classList.remove('dragover');
}

// Função que é chamada quando o item é solto no ícone do carrinho
function drop(event) {
    event.preventDefault();
    document.querySelector('.cart-icon').classList.remove('dragover'); // Remove o estilo após soltar

    const produtoId = event.dataTransfer.getData('produtoId');
    
    // Adiciona o produto ao carrinho com base no ID
    switch (produtoId) {
        case '1':
            adicionarProduto(1, 'Camiseta', 29.99, 2);
            break;
        case '2':
            adicionarProduto(2, 'Calça Jeans', 99.90, 1);
            break;
        case '3':
            adicionarProduto(3, 'Tênis', 149.90, 1);
            break;
        default:
            break;
    }

    // Atualiza o contador de itens no carrinho
    const cartCount = document.getElementById('cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1; // Atualiza conforme o produto adicionado
}

