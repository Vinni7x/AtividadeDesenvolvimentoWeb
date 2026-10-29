
const EXERCICIOS = [
  { id: "supino-reto", nome: "Supino reto" },
  { id: "supino-inclinado", nome: "Supino inclinado" },
  { id: "supino-declinado", nome: "Supino declinado" },
  { id: "crucifixo", nome: "Crucifixo" },
  { id: "crossover", nome: "Crossover" },
  { id: "flexao", nome: "Flexão" },
  { id: "peck-deck", nome: "Peck deck" }
];

const CHAVE_STORAGE = "diaDePeito.marcados";


const listaEl = document.getElementById("lista");
const resultadoEl = document.getElementById("resultado");
const botaoNovoDia = document.getElementById("btn-novo-dia");


const statusTextoEl = document.getElementById("status-texto");
const progressoNumerosEl = document.getElementById("progresso-numeros");
const progressoPctEl = document.getElementById("progresso-pct");
const barraEl = document.getElementById("barra");
const progressoTextoEl = document.getElementById("progresso-texto");
const seloRestantesEl = document.getElementById("selo-restantes");
const faltamTituloEl = document.getElementById("faltam-titulo");

let marcados = carregarMarcados();


function existeNaLista(id) {
  for (let i = 0; i < EXERCICIOS.length; i++) {
    if (EXERCICIOS[i].id === id) {
      return true;
    }
  }
  return false;
}

function carregarMarcados() {
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE);
    if (bruto === null) {
      return [];
    }

    const dados = JSON.parse(bruto);
    if (!Array.isArray(dados)) {
      return [];
    }

    const validos = [];
    for (let i = 0; i < dados.length; i++) {
      const id = dados[i];
      if (typeof id === "string" && existeNaLista(id) && !validos.includes(id)) {
        validos.push(id);
      }
    }
    return validos;
  } catch (erro) {
    return [];
  }
}

function salvarMarcados() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(marcados));
  } catch (erro) {
    
  }
}

function alternarExercicio(id) {
  const posicao = marcados.indexOf(id);
  if (posicao === -1) {
    marcados.push(id);
  } else {
    marcados.splice(posicao, 1);
  }
  salvarMarcados();
  atualizarTela();
}

function novoDia() {
  marcados = [];
  salvarMarcados();
  atualizarTela();
}


function desenharLista() {
  listaEl.innerHTML = "";

  for (let i = 0; i < EXERCICIOS.length; i++) {
    const exercicio = EXERCICIOS[i];
    const feito = marcados.includes(exercicio.id);

    const li = document.createElement("li");
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = feito ? "item feito" : "item";
    botao.setAttribute("aria-pressed", feito ? "true" : "false");
    botao.addEventListener("click", function () {
      alternarExercicio(exercicio.id);
    });

    
    const caixa = document.createElement("span");
    caixa.className = "caixa";
    caixa.setAttribute("aria-hidden", "true");
    caixa.textContent = feito ? "✓" : "";

    
    const nome = document.createElement("span");
    nome.className = "nome";
    nome.textContent = exercicio.nome;

    botao.appendChild(caixa);
    botao.appendChild(nome);

  
    if (feito) {
      const etiqueta = document.createElement("span");
      etiqueta.className = "etiqueta-feito";
      etiqueta.textContent = "Feito";
      botao.appendChild(etiqueta);
    }

    li.appendChild(botao);
    listaEl.appendChild(li);
  }
}


function desenharBarra() {
  barraEl.innerHTML = "";

  for (let i = 0; i < EXERCICIOS.length; i++) {
    const segmento = document.createElement("span");
    segmento.className = i < marcados.length ? "segmento cheio" : "segmento";
    barraEl.appendChild(segmento);
  }
}


function mostrarResultado() {
  const total = EXERCICIOS.length;
  const feitos = marcados.length;
  const restantes = total - feitos;
  const porcentagem = Math.round((feitos / total) * 100);

  
  const faltam = [];
  for (let i = 0; i < EXERCICIOS.length; i++) {
    if (!marcados.includes(EXERCICIOS[i].id)) {
      faltam.push(EXERCICIOS[i].nome);
    }
  }

  
  progressoNumerosEl.textContent = feitos + " de " + total;
  progressoPctEl.textContent = porcentagem + "%";
  progressoTextoEl.textContent = feitos + " de " + total + " exercícios feitos (" + porcentagem + "%)";

 
  if (feitos === 0) {
    statusTextoEl.textContent = "Treino não iniciado";
  } else if (feitos === total) {
    statusTextoEl.textContent = "Treino concluído";
  } else {
    statusTextoEl.textContent = "Treino em andamento";
  }

  
  if (restantes === 0) {
    seloRestantesEl.textContent = "Completo";
  } else if (restantes === 1) {
    seloRestantesEl.textContent = "1 restante";
  } else {
    seloRestantesEl.textContent = restantes + " restantes";
  }

  
  if (faltam.length > 0) {
    faltamTituloEl.hidden = false;
    resultadoEl.textContent = faltam.join(", ") + ".";
  } else {
    faltamTituloEl.hidden = true;
    resultadoEl.textContent = "Treino de peito completo!";
  }
}


function atualizarTela() {
  desenharLista();
  desenharBarra(); 
  mostrarResultado();
}


botaoNovoDia.addEventListener("click", novoDia);
atualizarTela();