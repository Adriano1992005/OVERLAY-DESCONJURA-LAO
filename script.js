let players = [
  { name: "Jogador 1", hp: 100, san: 100, pe: 3, imgSrc: '' },
  { name: "Jogador 2", hp: 100, san: 100, pe: 3, imgSrc: '' },
  { name: "Jogador 3", hp: 100, san: 100, pe: 3, imgSrc: '' },
  { name: "Jogador 4", hp: 100, san: 100, pe: 3, imgSrc: '' },
  { name: "Jogador 5", hp: 100, san: 100, pe: 3, imgSrc: '' }
];

let currentPlayerIndex = 0;

function createProfileButtons() {
  const container = document.getElementById('profile-buttons');
  players.forEach((p, index) => {
    const btn = document.createElement('button');
    btn.innerText = p.name;
    btn.onclick = () => selectProfile(index);
    container.appendChild(btn);
  });
}

function selectProfile(index) {
  currentPlayerIndex = index;
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      players[index].imgSrc = ev.target.result;
      document.getElementById('profile-selection').style.display = 'none';
      document.getElementById('overlay').style.display = 'flex';
      renderPlayers();
    };
    reader.readAsDataURL(file);
  };
  fileInput.click();
}

function renderPlayers() {
  const container = document.getElementById('players-container');
  container.innerHTML = '';
  players.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('player');
    div.innerHTML = `
      <img src="${p.imgSrc || 'https://via.placeholder.com/100'}" alt="${p.name}" id="player-img-${index}">
      <div class="stats">
        <span id="hp-${index}">HP: ${p.hp}</span>
        <span id="san-${index}">SAN: ${p.san}</span>
        <span class="pe" id="pe-${index}">PE: ${p.pe}</span>
      </div>
      <input type="file" accept="image/*" onchange="updatePlayerImage(event, ${index})">
    `;
    container.appendChild(div);
  });
  renderConfigMenu();
}

function updatePlayerImage(event, index) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    players[index].imgSrc = e.target.result;
    renderPlayers();
  };
  reader.readAsDataURL(file);
}

function updateStat(index, stat, delta) {
  players[index][stat] += delta;
  if (players[index][stat] < 0) players[index][stat] = 0;
  renderPlayers();
}

function renderConfigMenu() {
  const container = document.getElementById('player-settings');
  container.innerHTML = '';
  players.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('config-player');
    div.innerHTML = `
      <strong>${p.name}</strong><br>
      <button onclick="updateStat(${index}, 'hp', 1)">+HP</button>
      <button onclick="updateStat(${index}, 'hp', -1)">-HP</button><br>
      <button onclick="updateStat(${index}, 'san', 1)">+SAN</button>
      <button onclick="updateStat(${index}, 'san', -1)">-SAN</button><br>
      <button onclick="updateStat(${index}, 'pe', 1)">+PE</button>
      <button onclick="updateStat(${index}, 'pe', -1)">-PE</button>
    `;
    container.appendChild(div);
  });
}

function toggleConfigMenu() {
  const menu = document.getElementById('config-menu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// Inicializa seleção de perfil
createProfileButtons();
