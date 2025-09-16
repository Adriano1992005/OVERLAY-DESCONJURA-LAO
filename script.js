const players = [
  {vida: 10, sanidade: 5, pe: 2, portrait: 'default.png'},
  {vida: 10, sanidade: 5, pe: 2, portrait: 'default.png'},
  {vida: 10, sanidade: 5, pe: 2, portrait: 'default.png'},
  {vida: 10, sanidade: 5, pe: 2, portrait: 'default.png'},
  {vida: 10, sanidade: 5, pe: 2, portrait: 'default.png'},
];
let currentPlayer = 0;
const playerSelect = document.getElementById('player-select');
const portraitImg = document.getElementById('portrait');
const vidaSpan = document.getElementById('vida');
const sanidadeSpan = document.getElementById('sanidade');
const peSpan = document.getElementById('pe');
const portraitUpload = document.getElementById('portrait-upload');
function updateDisplay() {
  const player = players[currentPlayer];
  portraitImg.src = player.portrait;
  vidaSpan.textContent = player.vida;
  sanidadeSpan.textContent = player.sanidade;
  peSpan.textContent = player.pe;
}
playerSelect.addEventListener('change', () => {
  currentPlayer = parseInt(playerSelect.value);
  updateDisplay();
});
portraitUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onload = () => {
      players[currentPlayer].portrait = reader.result;
      updateDisplay();
    };
    reader.readAsDataURL(file);
  }
});
function changeStat(stat, value) {
  players[currentPlayer][stat] += value;
  if(players[currentPlayer][stat] < 0) players[currentPlayer][stat] = 0;
  updateDisplay();
}
updateDisplay();