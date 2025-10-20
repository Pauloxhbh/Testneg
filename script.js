let imagemAtual = 1;
let mostrandoDepois = false;
const totalImagens = 50;

window.onload = () => {
  const galeria = document.getElementById("galeria");
  for (let i = 1; i <= totalImagens; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="antes${i}.jpg" alt="Projeto ${i}">
      <div class="hover-text">Ver Resultado</div>
    `;
    card.onclick = () => abrirModal(i);
    galeria.appendChild(card);
  }
};

function abrirModal(num) {
  imagemAtual = num;
  mostrandoDepois = false;
  document.getElementById("modal").style.display = "flex";
  atualizarImagem();
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function mostrarAntes() {
  mostrandoDepois = false;
  atualizarImagem();
}

function mostrarDepois() {
  mostrandoDepois = true;
  atualizarImagem();
}

function atualizarImagem() {
  const img = document.getElementById("imagemModal");
  const nome = mostrandoDepois ? "depois" : "antes";
  img.src = `${nome}${imagemAtual}.jpg`;
}

function proximo() {
  imagemAtual = imagemAtual === totalImagens ? 1 : imagemAtual + 1;
  atualizarImagem();
}

function anterior() {
  imagemAtual = imagemAtual === 1 ? totalImagens : imagemAtual - 1;
  atualizarImagem();
}

// botão voltar ao topo
window.onscroll = function() {
  const btn = document.getElementById("voltarTopo");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
    btn.style.display = "block";
  else btn.style.display = "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  }
