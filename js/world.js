const worldPageItems = [
  {
    title: 'Blue Tower',
    image: 'assets/image/world-01.jpg',
    quote: 'A sky-piercing tower where every door opens into a different fate.',
    body: 'The Blue Tower appears after the world fractures. Rei enters through the weakest blue door and finds a lobby where factions, relics, and lost travelers gather before climbing into unknown floors.'
  },
  {
    title: 'Entrance Lobby',
    image: 'assets/image/world-02.jpg',
    quote: 'A quiet ground floor where strangers become allies, rivals, or warnings.',
    body: 'The lobby is the first safe place inside the tower. Summoned people trade rumors, prepare decks, choose routes, and decide which faction door is worth trusting.'
  },
  {
    title: 'Faction Doors',
    image: 'assets/image/world-03.jpg',
    quote: 'Color, crest, and oath decide how a climber survives.',
    body: 'Each door represents a faction identity and battle style. Blue favors direct strength, White protects and restores, and Black spreads fear through dark summons.'
  },
  {
    title: 'Void Floors',
    image: 'assets/image/world-04.jpg',
    quote: 'Below the lobby, the tower stops pretending to be safe.',
    body: 'Every floor reshapes the arena with new rules, enemies, and hazards. A climber who survives one battle may still be broken by the next door.'
  }
];

const stage = document.querySelector('[data-world-page-stage]');
const prevCard = document.querySelector('[data-world-page-prev-card]');
const activeCard = document.querySelector('[data-world-page-active-card]');
const nextCard = document.querySelector('[data-world-page-next-card]');
const copy = document.querySelector('[data-world-page-copy]');
const dots = document.querySelector('[data-world-page-dots]');
let pageWorldIndex = 0;

function createCard(item, label) {
  return `<img src="${item.image}" alt="${item.title}"><h2>${item.title}</h2><span>${label}</span>`;
}

function renderDots() {
  dots.innerHTML = '';
  worldPageItems.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot${index === pageWorldIndex ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to world slide ${index + 1}`);
    dot.addEventListener('click', () => setWorldPage(index));
    dots.appendChild(dot);
  });
}

function renderWorldPage() {
  const current = worldPageItems[pageWorldIndex];
  const prev = worldPageItems[(pageWorldIndex - 1 + worldPageItems.length) % worldPageItems.length];
  const next = worldPageItems[(pageWorldIndex + 1) % worldPageItems.length];

  prevCard.innerHTML = createCard(prev, 'Previous');
  activeCard.innerHTML = createCard(current, 'Current');
  nextCard.innerHTML = createCard(next, 'Next');
  copy.innerHTML = `<p class="eyebrow">Blue Tower Chronicle</p><h1>${current.title}</h1><blockquote>&quot;${current.quote}&quot;</blockquote><p>${current.body}</p>`;
  renderDots();
}

function setWorldPage(index) {
  pageWorldIndex = (index + worldPageItems.length) % worldPageItems.length;
  stage.classList.add('is-changing');
  copy.classList.add('is-changing');
  window.setTimeout(() => {
    renderWorldPage();
    requestAnimationFrame(() => {
      stage.classList.remove('is-changing');
      copy.classList.remove('is-changing');
    });
  }, 220);
}

document.querySelector('[data-world-page-prev]').addEventListener('click', () => setWorldPage(pageWorldIndex - 1));
document.querySelector('[data-world-page-next]').addEventListener('click', () => setWorldPage(pageWorldIndex + 1));
renderWorldPage();
