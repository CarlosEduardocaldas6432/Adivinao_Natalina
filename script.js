
import dados from "./objetos.js"


// Recupera o valor do contador salvo no localStorage (se houver)
let contador = localStorage.getItem('contador');
if (contador === null) {
    contador = 0;
} else {
    contador = parseInt(contador);
}



// sons

const som_botao_tentativa = document.querySelector(".som_botao_tentativa")
const som_fim_de_jogo = document.querySelector(".som_fim_de_jogo")
const som_jogado_perdeu = document.querySelector(".som_jogado_perdeu")
const som_jogador_acertou = document.querySelector(".som_jogador_acertou")
const som_tecla_certa = document.querySelector(".som_tecla_certa")
const som_tecla_errada = document.querySelector(".som_tecla_errada")
const som_tentativa_errada = document.querySelector(".som_tentativa_errada")









const objeto = dados[contador]
let letras_gastas = 0
let tentativas = 0

document.querySelector(".foto_do_jogo").src = objeto.caminho

document.querySelector("#dica1").innerHTML = objeto.dica_1
document.querySelector("#dica2").innerHTML = objeto.dica_2

const minhaString =objeto.nome;
const meuArray = minhaString.split(" ");

criarFlipCards(meuArray)









function criarFlipCards(array) {
    // Seleciona a div onde os elementos serão inseridos
    const container = document.querySelector('.sessao_nome_da_foto');


    if (!Array.isArray(array)) {
        console.error("O parâmetro fornecido não é um array.");
        return;
    }

    // Verifica se o container existe
    if (!container) {
        console.error("A classe 'sessao_nome_da_foto' não foi encontrada no DOM.");
        return;
    }

    // Limpa o container antes de adicionar os elementos
    container.innerHTML = '';

    // Percorre o array
    array.forEach(valor => {
        // Cria a estrutura do flip card
        const flipCard = document.createElement('div');
        flipCard.className = `flip-card`; // Adiciona a segunda classe com o valor atual
        flipCard.innerHTML = `
            <div class="flip-card-inner ${valor} ">
                <div class="flip-card-front">
                </div>
                <div class="flip-card-back">
                    <p class="title">${valor}</p>
                </div>
            </div>
        `;

        // Adiciona a estrutura criada ao container
        container.appendChild(flipCard);
    });
    
}





function verificarLetra(letra, arrayDeLetras) {
    return arrayDeLetras.includes(letra);
  }






function letrasEsgotadas(){

    const teclado = document.querySelector(".sessao_teclado")
    teclado.style.display = "none"

}










function youlose(){

    som_jogado_perdeu.currentTime = 0;
    som_jogado_perdeu.play()

    const teclado = document.querySelector(".sessao_teclado")
    const lose = document.querySelector(".sessao_lose")

    teclado.style.display = "none"
    lose.style.display = "block"

    return

}


function youwin(){


    som_jogador_acertou.currentTime = 0;
    som_jogador_acertou.play()

    const cards = document.querySelectorAll(".flip-card-inner");
    cards.forEach(card => {
    card.style.transform = 'rotateY(180deg)';
});

    const teclado = document.querySelector(".sessao_teclado")
    const win = document.querySelector(".sessao_win")

    teclado.style.display = "none"
    win.style.display = "block"


    const interrogacao = document.querySelector(".foto_interrogacao")
    const foto = document.querySelector(".foto_do_jogo")

    interrogacao.style.display = "none"
    foto.style.display = "block"

    return

}












document.addEventListener('DOMContentLoaded', function() {
  // Escutando o clique nos elementos com a classe "teclas"
  document.querySelectorAll('.teclas').forEach(function(tecla) {
    tecla.addEventListener('click', function() {

      
      let letra = this.querySelector('.letras_das_teclas').textContent;

        if(verificarLetra(letra,meuArray)){

            som_tecla_certa.currentTime = 0;
            som_tecla_certa.play()

            this.className ="teclas_clicadas_corretas"
            const elemento = document.querySelectorAll(`.${letra}`)
            elemento.forEach(letra => {
                letra.style.transform = 'rotateY(180deg)';
              });

              letras_gastas++

              if(letras_gastas <= 10){
                document.querySelector(".info_letras_gastas").innerHTML =`LETRAS GASTAS:${letras_gastas}/10`
            }

            if (letras_gastas >= 10) {
                letrasEsgotadas()
            }
            

        } else{

            som_tecla_errada.currentTime = 0;
            som_tecla_errada.play()

            this.className ="teclas_clicadas_erradas"
            letras_gastas++
            
            if (letras_gastas >= 10) {
                letrasEsgotadas()
            }

            if(letras_gastas <= 10){
                document.querySelector(".info_letras_gastas").innerHTML =`LETRAS GASTAS:${letras_gastas}/10`
            }

           
            
        }


    });
  });
});

// Adiciona o evento de clique ao botão usando addEventListener
 document.querySelector(".botao").addEventListener("click", tentou);

function tentou() {

    tentativas++

    som_botao_tentativa.currentTime = 0;
    som_botao_tentativa.play()

    document.querySelector(".info_tentativas").innerHTML = `TENTATIVAS:${tentativas}/3`


    const input = document.querySelector(".input").value;
    
    
    if(tentativas === 1){

     document.querySelector("#palavras_tentadas_1").innerHTML = input
    }
    if(tentativas === 2){

     document.querySelector("#palavras_tentadas_2").innerHTML = input
    }
    if(tentativas === 3){

     document.querySelector("#palavras_tentadas_3").innerHTML = input
    }



    if(input.toUpperCase() === objeto.nome_verdadeiro){

        const sessao_info = document.querySelector(".sesao_entrada_dados")
        sessao_info.style.display = "none"

        youwin()

    }
    else{

        som_tentativa_errada.currentTime = 0;
        som_tentativa_errada.play()

        if(tentativas === 3){
            const sessao_info = document.querySelector(".sesao_entrada_dados")
            sessao_info.style.display = "none"
            youlose()

        }        

    }


}


document.querySelector(".botao_perdeu").addEventListener("click",jogaNovamente);

function jogaNovamente(){

    som_botao_tentativa.currentTime = 0;
    som_botao_tentativa.play()
    window.location.reload()

}





document.querySelector(".botao_ganhou").addEventListener("click",proximaFase);

function proximaFase(){

    som_botao_tentativa.currentTime = 0;
    som_botao_tentativa.play()

    contador++

    if(contador === 16){
        fim()
        contador = 0
        localStorage.setItem('contador', contador);
    }
    else{
        // Salva o valor do contador antes de resetar
        localStorage.setItem('contador', contador);
    
        window.location.reload()

    }
}



function fim(){

    som_fim_de_jogo.currentTime = 0;
    som_fim_de_jogo.play()

    const win = document.querySelector(".sessao_win")
    const final = document.querySelector(".sessao_fim")

    win.style.display = "none"
    final.style.display = "block"



    return

}

