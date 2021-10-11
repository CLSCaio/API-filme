// FUNÇAO START - QUE FAZ TUDO FUNCIONAR
function start(filmes, page = 1) {
  let URL = 'https://api.themoviedb.org/3/search/movie?api_key='
  let key = '3cc36e72428bd7c96c36cd106695e7f4'
  let img = 'https://image.tmdb.org/t/p/w500/'
  // https://api.themoviedb.org/3/search/company?api_key=3cc36e72428bd7c96c36cd106695e7f4&query=filme&page=pagina
  
  // PUXANDO URL COM O AXIOS PARA TER UMA RESPOSTA DE SINCRONIZAÇAO
  axios.get(`${URL}${key}&query=${filmes}&page=${page}`)
    .then(resp => {
      let data = resp.data                  // total dos dados da API
      let results = data.results              // mostra os resultados da API
      let pages = data.total_pages          // total de paginas
      criarElem(results, pages, filmes)
      console.log(results)
    })
  .catch(e => console.log(e))
}

// ATALHO PARA LIMPEZA
let F_sobre = document.getElementById('F_sobre')

// FUNÇAO BUSCA AO CLICK
// let btn = document.getElementById('button')
//   btn.onclick = (e) => {
//   e.preventDefault()
//   let filme = document.getElementById('valor_busca').value 
//   start(filme)
//   document.getElementById('valor_busca').innerHTML = ""
//   // LIMPAR DADOS DE NAVEGAÇAO PARA GERAR NOVA
//   F_sobre.innerHTML = ''
// }

// FUNÇAO BUSCA DINAMICA
let filme = document.getElementById('valor_busca')
filme.addEventListener('keyup', procurar)
function procurar() {
  pesquisa = filme.value
  return start(pesquisa)
}

//CRIAR ELEMENTOS
function criarElem(results, pages, filmes) {
  // 1) CRIAR BOTTOM DE PAGINAS
  let N_pages = document.querySelector('#N_pages')
  N_pages.innerHTML = ""
  if (pages > 1) {
    for (let tp = 1; tp <= pages; tp++) {
      const button = document.createElement('button')
      button.className = 'button-page'
      button.value = tp
      button.innerHTML = tp
      button.style.cursor = 'pointer'
      button.onclick = function(e) {
        e.preventDefault()
        start(filmes, tp)
      }
      N_pages.append(button)
      // LIMPAR DADOS DE NAVEGAÇAO PARA GERAR NOVA
      F_sobre.innerHTML = ''
    }
  }
  
  // 2) CRIAR IMAGENS DOS FILMES
  let F_results = document.getElementById('F_results')
  F_results.innerHTML = ''
  results.forEach((e,i) => {

    // CRIANDO DIV DOS SOBRES
    let divS = document.createElement('div')
    divS.className = `divSobre div-img div-img-${i}`
    // ADICIONANDO ELEMENTOS
    let title = e.title
    let over = `Resumo: ${e.overview}`
    let date = `Data de lançamento: ${e.release_date}`
    let pop = `Popularidade: ${e.popularity}`
    
    let p = document.createElement('p')
    p.innerHTML = over

    let p2 = document.createElement('p')
    p2.innerHTML = date

    let p3 = document.createElement('p')
    p3.innerHTML = pop

    let h1 = document.createElement('h1')
    h1.innerHTML = title

    // CRIANDO ELEMENTO PARA OS FILMES
    let img = document.createElement('img')
    img.className = 'filme_img'
    // TRATAMENTO PARA CASO N HAJA IMAGEM
    if(e.poster_path == null) {
      img.alt = e.title
    } else { 
        let src = `https://image.tmdb.org/t/p/w500/${e.poster_path}`
        img.src = src
        img.alt = e.title
        img.style.cursor = 'pointer'
  
        // CRIANDO FUNÇAO QUE VAI GERAR OS SOBRES EM CADA ELEMENTO UNICO
        img.onclick = function(e) {
          e.preventDefault()
  
          // SELECIONANDO ELEMENTO PARA APARECER
          div_img = document.querySelector(`.div-img-${i}`)
          div_img.style.display = 'flex'
  
          divG = document.getElementById('F_sobreM')
          divG.style.display = 'block'
  
          // CRIANDO FUNÇAO PARA SAIR PARA A HOME PAGE
          divG.addEventListener('click', (e) => {
            if(e.target.id == 'F_sobreM') {
              div_img = document.querySelector(`.div-img-${i}`)
              div_img.style.display = 'none'
  
              divG = document.getElementById('F_sobreM')
              divG.style.display = 'none'
            }
          })
        }
      }

    // ATRIBUINDO HERENÇA
    divS.append(h1, p, p3, p2)
    F_sobre.append(divS)
    F_results.append(img)
  } ) 
}


























