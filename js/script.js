const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.mission-card');
const dots = document.querySelectorAll('.pagination span');
let currentIndex = 0;
let autoplayInterval;

function updateActiveCard() {
  let minDiff = Infinity;
  let activeIndex = 0;
  const center = carousel.scrollLeft + carousel.offsetWidth / 2;

  cards.forEach((card, i) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const diff = Math.abs(center - cardCenter);
    if (diff < minDiff) {
      minDiff = diff;
      activeIndex = i;
    }
  });

  cards.forEach(card => card.classList.remove('active'));
  cards[activeIndex].classList.add('active');

  if (dots.length > 0) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[activeIndex]) dots[activeIndex].classList.add('active');
  }

  currentIndex = activeIndex;
}

function scrollToCard(index) {
  const targetCard = cards[index];
  carousel.scrollTo({
    left: targetCard.offsetLeft - (carousel.offsetWidth - targetCard.offsetWidth) / 2,
    behavior: 'smooth'
  });
}

function autoplayCarousel() {
  currentIndex = (currentIndex + 1) % cards.length;
  scrollToCard(currentIndex);
}

// Init listeners
carousel.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateActiveCard);
});

window.addEventListener('load', () => {
  // Dupliquer les premières et dernières cartes (optionnel si boucle naturelle)
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, cards[0]);

  // Mettre à jour les références de cartes
  updateActiveCard();
  autoplayInterval = setInterval(autoplayCarousel, 4000);
});

/*-------------------------++++++++++++++++++++++++++ */
function openNav() {
  document.querySelector('.links').classList.add('show');
  document.querySelector('.menu').classList.add('hide-logo'); // masque le logo
  document.querySelector('.openbtn').style.display = 'none';
  document.querySelector('.closebtn').style.display = 'block';
}

function closeNav() {
  document.querySelector('.links').classList.remove('show');
  document.querySelector('.menu').classList.remove('hide-logo'); // réaffiche le logo
  document.querySelector('.openbtn').style.display = 'block';
  document.querySelector('.closebtn').style.display = 'none';
} 

