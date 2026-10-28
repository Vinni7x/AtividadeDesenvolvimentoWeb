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

let marcados = carregarMarcados();