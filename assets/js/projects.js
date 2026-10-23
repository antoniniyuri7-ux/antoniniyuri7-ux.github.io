const grid = document.querySelector('#projects-grid');
const errorBox = document.querySelector('#projects-error');
const template = document.querySelector('#project-card-template');

const isHttps = (value) => typeof value === 'string' && value.startsWith('https://');
const isLocalImage = (value) => typeof value === 'string' && value.startsWith('assets/');

function showError() {
  if (errorBox) errorBox.hidden = false;
}

function buildLink(href, label) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function createCard(projeto) {
  const fragment = template.content.cloneNode(true);
  const article = fragment.querySelector('.card');
  const titleLink = fragment.querySelector('.card__link');
  const desc = fragment.querySelector('.card__desc');
  const chips = fragment.querySelector('.chips');
  const links = fragment.querySelector('.card__links');
  const media = fragment.querySelector('.card__media');

  titleLink.textContent = String(projeto.titulo ?? 'Projeto');

  if (isHttps(projeto.repo)) {
    titleLink.href = projeto.repo;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
  } else {
    titleLink.href = '#';
    titleLink.setAttribute('aria-disabled', 'true');
  }

  desc.textContent = String(projeto.descricao ?? '');

  const stack = Array.isArray(projeto.stack) ? projeto.stack.slice(0, 4) : [];
  for (const item of stack) {
    const chip = document.createElement('li');
    chip.className = 'chip';
    chip.textContent = String(item);
    chips.append(chip);
  }
  if (stack.length === 0) chips.remove();

  if (isHttps(projeto.repo)) links.append(buildLink(projeto.repo, 'Repositório'));
  if (isHttps(projeto.demo)) links.append(buildLink(projeto.demo, 'Demo'));
  if (links.children.length === 0) links.remove();

  if (isLocalImage(projeto.imagem)) {
    const img = document.createElement('img');
    img.src = projeto.imagem;
    img.alt = String(projeto.imagemAlt ?? '');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 640;
    img.height = 360;
    media.append(img);
    media.removeAttribute('aria-hidden');
  } else {
    media.classList.add('card__media--placeholder');
  }

  article.dataset.id = String(projeto.id ?? '');
  return { fragment, article };
}

async function init() {
  if (!grid || !template) return;

  if (errorBox) errorBox.hidden = true;

  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) throw new Error('Falha ao carregar projetos');

    const data = await response.json();
    if (!data || !Array.isArray(data.projetos) || data.projetos.length === 0) {
      throw new Error('Lista de projetos vazia');
    }

    const ordered = [...data.projetos].sort(
      (a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque))
    );

    const cards = [];
    for (const projeto of ordered) {
      const { fragment, article } = createCard(projeto);
      grid.append(fragment);
      cards.push(article);
    }

    document.dispatchEvent(
      new CustomEvent('projetos:renderizados', { detail: { cards } })
    );
  } catch {
    showError();
  }
}

init();
