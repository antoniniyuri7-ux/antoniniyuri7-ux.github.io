const grid = document.querySelector('#projects-grid');
const errorBox = document.querySelector('#projects-error');
const template = document.querySelector('#project-card-template');

const isHttps = (value) => typeof value === 'string' && value.startsWith('https://');
const isLocalImage = (value) => typeof value === 'string' && value.startsWith('assets/');

function showError() {
  if (errorBox) errorBox.hidden = false;
}

function newTabHint() {
  const hint = document.createElement('span');
  hint.className = 'sr-only';
  hint.textContent = ' (abre em nova aba)';
  return hint;
}

function makeExternal(link, href) {
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(newTabHint());
  return link;
}

function buildLink(href, label) {
  const link = document.createElement('a');
  link.textContent = label;
  return makeExternal(link, href);
}

function createCard(projeto) {
  const fragment = template.content.cloneNode(true);
  const article = fragment.querySelector('.card');
  const titleLink = fragment.querySelector('.card__link');
  const desc = fragment.querySelector('.card__desc');
  const chips = fragment.querySelector('.chips');
  const links = fragment.querySelector('.card__links');
  const media = fragment.querySelector('.card__media');

  const titulo = String(projeto.titulo ?? 'Projeto');

  if (isHttps(projeto.repo)) {
    titleLink.textContent = titulo;
    makeExternal(titleLink, projeto.repo);
  } else {
    // Sem destino válido: título em texto puro, sem link falso.
    titleLink.replaceWith(document.createTextNode(titulo));
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
      (a, b) =>
        Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)) ||
        (Number(b.ano) || 0) - (Number(a.ano) || 0)
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

    // Links diretos (ex.: /#contato) rolam antes do render; reajusta após o conteúdo crescer.
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  } catch {
    showError();
  }
}

init();
