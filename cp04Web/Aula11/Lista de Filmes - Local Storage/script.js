// Criando a base de dados de filmes  
const filmes = [
  {
  id: 0,
  nome: 'Harry Potter',
  genero: 'fantasia',
  lancamento: 2001
  },
  {
  id: 1,
  nome: 'Avatar',
  genero: 'fantasia',
  lancamento: 2010
  },
  {
   id: 2,
   nome:'O Senhor dos Anéis',
   genero: 'fantasia',
   lancamento: 2000,
  },
  {
   id: 3,
   nome: 'Branquelas',
   genero: 'comédia',
   lancamento: 2007
  },
  {
   id: 4,
   nome: 'A Lagoa Azul',
   genero: 'romance',
   lancamento: 1983
}]

// Criando um array de filmes favoritos
let filmesFavoritos = []

// Pegando Elementos HTML
const btn1 = document.querySelector('button')
const listaFilmes = document.querySelector('#listaFilmes')

// Ao carregar a página, executa a função que renderiza os elementos na tela
window.onload = () => {
  // Carrega favoritos do localStorage ao inicializar a página
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }
  renderizarLista()
}

// Função para renderizar filmes na tela
const renderizarLista = () => {
  // Limpa a tela antes de renderizar
  listaFilmes.innerHTML = ""
  // Percorre o array de filmes, inserindo um li com o nome do filme a cada volta do loop
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li')
    // Adiciona o li à lista de filmes
    listaFilmes.append(itemLista)
    // Adiciona o nome do filme à lista
    itemLista.innerHTML = `Meu filme ${filme.nome}`

    // Cria uma nova imagem
    const favorito = document.createElement('img')
    // Verifica se o filme está nos favoritos para alterar o ícone
    if (filmesFavoritos.find(f => f.id === filme.id)) {
      favorito.src = 'img/heart-fill.svg' // Ícone preenchido
    } else {
      favorito.src = 'img/heart.svg' // Ícone não preenchido
    }

    // Muda o cursor da imagem para mãozinha de clique
    favorito.style.cursor = 'pointer'
    // Adiciona evento de clique à imagem
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme)
    })
    // Adiciona a imagem ao item da lista
    itemLista.append(favorito)
  })
}

// Adiciona o evento de clique ao botão
btn1.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput')
  let id = filmes.length
  filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' })
  renderizarLista()
  inputUsuario.value = ''
})

// Função que é executada quando o botão de favorito é clicado
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  }

  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited
    saveToLocalStorage(objetoFilme)
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited
    removeFromLocalStorage(objetoFilme.id)
  }
}

// Função executada para salvar o filme no localStorage
const saveToLocalStorage = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }
  // Verifica se o filme já está nos favoritos antes de adicionar
  if (!filmesFavoritos.find(f => f.id === objetoFilme.id)) {
    filmesFavoritos.push(objetoFilme)
  }
  const moviesJSON = JSON.stringify(filmesFavoritos)
  localStorage.setItem('favoritos', moviesJSON)
}

// Função executada para remover o filme no localStorage
function removeFromLocalStorage(id) {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }
  // Filtra os filmes removendo aquele com o ID correspondente
  filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== id)
  const filmesFiltradosJSON = JSON.stringify(filmesFavoritos)
  localStorage.setItem('favoritos', filmesFiltradosJSON)
}
