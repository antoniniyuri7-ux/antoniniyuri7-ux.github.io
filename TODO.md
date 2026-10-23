# TODO.md — Plano de execução

> **Para um executor sem raciocínio:** siga as tarefas **na ordem numérica**, sem pular, sem reinterpretar e sem "melhorar" nada por conta própria. Cada tarefa tem passos exatos, verificação e o que fazer se falhar. Se uma verificação falhar duas vezes, **pare** e reporte.
>
> Fonte de verdade de escopo e valores: `SPECS.md`. Regras de conduta: `AGENTS.md`.

**Legenda:** `[ ]` pendente · `[x]` concluído · `[!]` bloqueado

**Regras invioláveis do executor**

1. Não crie arquivos fora dos caminhos listados aqui.
2. Não adicione dependências, frameworks, CDN ou build.
3. Não altere `SPECS.md` nem `AGENTS.md`.
4. Não invente nome, e-mail, LinkedIn, projetos ou links. Use exatamente os placeholders indicados.
5. Não publique, não crie repositório e não faça push antes da Fase 5.
6. Toda tarefa termina com a verificação executada e o resultado colado no relatório final.
7. Comandos são **PowerShell**, executados na raiz do projeto (`C:\Users\1140227\Desktop\Projeto Open code`).
8. Não use `file://` para validar; sempre `http://localhost:8000`.

**Regras de parada (pare e reporte imediatamente)**

- `gh auth status` não mostrar `antoniniyuri7-ux` logado.
- O repositório `antoniniyuri7-ux.github.io` já existir e não estiver vazio.
- Uma verificação falhar 2 vezes seguidas.
- Faltar conteúdo real na Fase 6 e o usuário não tiver respondido.
- Qualquer comando retornar erro de permissão ou rede.

---

## Mapa de arquivos

| Arquivo | Fase | Obrigatório |
| --- | --- | --- |
| `index.html` | 1–4 | sim |
| `assets/css/style.css` | 1–4 | sim |
| `assets/data/projects.json` | 2 | sim |
| `assets/js/projects.js` | 2 | sim |
| `assets/js/main.js` | 3 | sim |
| `assets/img/favicon.svg` | 4 | sim |
| `assets/img/og-image.png` | 4 | sim |
| `assets/img/projetos/` | 2, 6 | pasta |
| `robots.txt` | 4 | sim |
| `sitemap.xml` | 4 | sim |
| `.nojekyll` | 4 | sim |
| `README.md` | 4 | sim |
| `AGENTS.md`, `SPECS.md` | — | já existem |

**Conteúdo fixo de referência (copie literalmente quando a tarefa pedir)**

| Chave | Valor |
| --- | --- |
| Nome de exibição | `TODO: nome de exibição` |
| E-mail | `TODO: e-mail` |
| LinkedIn | `TODO: linkedin` |
| GitHub | `https://github.com/antoniniyuri7-ux` |
| URL pública | `https://antoniniyuri7-ux.github.io/` |
| Repositório | `antoniniyuri7-ux.github.io` |
| Cores | `#0A0E12` `#11171F` `#172029` `#1F2A35` `#E6EDF3` `#93A1AE` `#22D3EE` `#06B6D4` |

---

## Fase 0 — Pré-condições (não cria arquivos)

### T0.1 Verificar autenticação

**Passos**

```powershell
gh auth status
git config --global --get user.name
git config --global --get user.email
```

**Aprovado se:** `Logged in to github.com account antoniniyuri7-ux` e os dois valores do git preenchidos.

**Se falhar:** pare e peça login. Não tente autenticar sozinho.

### T0.2 Inicializar controle de versão

**Passos**

```powershell
git init
git branch -M main
```

**Aprovado se:** `git status` mostra repositório vazio em `main`.

**Se falhar:** se já existir `.git`, pule para T0.3.

### T0.3 Criar `.gitignore`

**Conteúdo exato**

```
.DS_Store
Thumbs.db
*.log
```

**Verificação**

```powershell
Test-Path .gitignore
```

**Esperado:** `True`.

---

## Fase 1 — Fundação (HTML + tokens + hero)

### T1.1 Criar `index.html` com esqueleto semântico

**Estrutura obrigatória, nesta ordem:**

1. `<!DOCTYPE html>`
2. `<html lang="pt-BR">`
3. `<head>` com: `charset utf-8`, `viewport width=device-width, initial-scale=1`, `theme-color #0A0E12`, `title` provisório `TODO: nome de exibição — Portfólio | Ciência da Computação`, `link rel="icon"` → `assets/img/favicon.svg`, `link rel="stylesheet"` → `assets/css/style.css`.
4. `<body>` com:
   - `a.skip-link` com `href="#conteudo"` e texto `Ir para o conteúdo`
   - `header.site-header` > `a.brand` (texto `TODO: nome de exibição`) + `nav.nav` com dois `a.nav__link`: `#projetos` (`Projetos`) e `#contato` (`Contato`)
   - `main#conteudo`
     - `section#hero.hero` com `p.hero__eyebrow` (`Estudante de Ciência da Computação`), `h1.hero__title` (`TODO: nome de exibição`), `p.hero__lead` (`TODO: frase de foco`), `div.hero__actions` com `a.btn.btn--primary` (`Ver projetos` → `#projetos`) e `a.btn.btn--secondary` (`GitHub` → GitHub, `target="_blank"`, `rel="noopener noreferrer"`)
     - `section#projetos.section` com `h2.section__title` (`Projetos`) e `div#projects-grid.projects-grid` vazio
     - `section#contato.section` com `h2.section__title` (`Vamos conversar`), `p` de convite e `div` de links (conteúdo completo na T3.1)
   - `footer.site-footer` com `p` de copyright, `p` de tecnologia e `a` `Voltar ao topo` → `#conteudo`
   - `<script type="module" src="assets/js/main.js"></script>` e `<script type="module" src="assets/js/projects.js"></script>`

**Verificação**

```powershell
Select-String -Path index.html -Pattern 'lang="pt-BR"','skip-link','<main','<h1','assets/css/style.css'
```

**Esperado:** 5 linhas de resultado, uma por padrão.

**Se falhar:** confira se os atributos estão com aspas duplas e sem espaços extras.

### T1.2 Criar `assets/css/style.css` — camada de tokens e base

**Bloco `:root` obrigatório, com estes nomes e valores exatos:**

```css
--bg:#0A0E12; --surface:#11171F; --surface-2:#172029; --border:#1F2A35;
--text:#E6EDF3; --text-muted:#93A1AE; --accent:#22D3EE;
--accent-strong:#06B6D4; --accent-soft:rgba(34,211,238,.12);
--radius-sm:8px; --radius-md:14px; --radius-pill:999px;
--space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
--space-6:24px; --space-8:32px; --space-12:48px; --space-16:64px;
--space-24:96px; --max-width:1120px; --header-h:64px;
--font-sans:ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif;
--font-mono:ui-monospace,"Cascadia Code",Consolas,monospace;
```

**Base obrigatória:** `box-sizing:border-box` universal, `margin:0`, `html{scroll-behavior:smooth}`, `body` com fundo `--bg`, cor `--text`, `font-family:var(--font-sans)`, `line-height:1.6`, `-webkit-font-smoothing:antialiased`, `img{max-width:100%;display:block}`.

**Verificação**

```powershell
(Get-Item assets/css/style.css).Length -lt 26000
Select-String -Path assets/css/style.css -Pattern '--accent:#22D3EE'
```

**Esperado:** `True` e uma linha encontrada.

### T1.3 Estilizar header, navegação e hero

**Requisitos visuais**

- `.site-header`: `position:sticky; top:0; z-index:10; height:var(--header-h); display:flex; align-items:center; justify-content:space-between; padding-inline:var(--space-6); background:color-mix(in srgb, var(--surface) 88%, transparent); backdrop-filter:blur(8px); border-bottom:1px solid var(--border)`.
- `.brand`: cor `--text`, peso 600, sem sublinhado.
- `.nav`: `display:flex; gap:var(--space-6)`.
- `.nav__link`: cor `--text-muted`, `text-decoration:none`, `padding-block:var(--space-2)`, borda inferior 2px transparente; hover/foco: cor `--text` e borda `--accent`.
- `.hero`: `min-height:calc(85vh - var(--header-h)); display:flex; flex-direction:column; justify-content:center; gap:var(--space-4); max-width:var(--max-width); margin-inline:auto; padding:var(--space-16) var(--space-6)`.
- `.hero__title`: `font-size:clamp(2.25rem,5vw,3.5rem)`, `line-height:1.1`, `letter-spacing:-0.02em`.
- `.hero__lead`: `font-size:clamp(1rem,1.6vw,1.125rem)`, cor `--text-muted`, `max-width:56ch`.
- `.hero__eyebrow`: `font-family:var(--font-mono)`, `font-size:.75rem`, `letter-spacing:.08em`, `text-transform:uppercase`, cor `--accent`.
- `.btn`: `display:inline-flex; align-items:center; justify-content:center; min-height:44px; padding:var(--space-3) var(--space-6); border-radius:var(--radius-pill); font-weight:600; text-decoration:none; border:1px solid transparent; transition:background-color .15s ease,border-color .15s ease,color .15s ease`.
- `.btn--primary`: fundo `--accent`, texto `--bg`; hover/foco: fundo `--accent-strong`.
- `.btn--secondary`: fundo transparente, texto `--text`, borda `--border`; hover/foco: borda `--accent`, cor `--accent`.

**Verificação**

```powershell
Select-String -Path assets/css/style.css -Pattern '\.site-header','\.hero__title','\.btn--primary'
```

**Esperado:** 3 linhas.

### T1.4 Criar `.section`, `.skip-link` e footer

**Requisitos**

- `.section`: `max-width:var(--max-width); margin-inline:auto; padding:var(--space-24) var(--space-6)`.
- `.section__title`: `font-size:clamp(1.5rem,3vw,2rem)`, `margin-bottom:var(--space-8)`.
- `.skip-link`: fora da tela por padrão (`position:absolute; left:-9999px`); ao receber foco: `left:var(--space-4); top:var(--space-4); z-index:100; background:var(--accent); color:var(--bg); padding:var(--space-3) var(--space-4); border-radius:var(--radius-sm)`.
- `.site-footer`: `border-top:1px solid var(--border)`, `padding:var(--space-8) var(--space-6)`, `color:var(--text-muted)`, `font-size:.875rem`, `display:flex; flex-wrap:wrap; gap:var(--space-4); justify-content:space-between`, `max-width:var(--max-width); margin-inline:auto`.

**Verificação**

```powershell
Select-String -Path assets/css/style.css -Pattern '\.skip-link','\.site-footer','\.section__title'
```

**Esperado:** 3 linhas.

### T1.5 Commit da fase

```powershell
git add .
git commit -m "feat: fundacao html, tokens e hero"
```

**Aprovado se:** commit criado sem erro.

---

## Fase 2 — Projetos (dados + render)

### T2.1 Criar `assets/data/projects.json`

**Conteúdo exato (3 placeholders, sem inventar projeto real):**

```json
{
  "versao": 1,
  "projetos": [
    {
      "id": "projeto-1",
      "titulo": "TODO: titulo do projeto 1",
      "descricao": "TODO: descricao do projeto 1 em uma ou duas linhas, com problema e solucao.",
      "stack": ["HTML", "CSS", "JavaScript"],
      "imagem": null,
      "imagemAlt": "",
      "repo": "https://github.com/antoniniyuri7-ux",
      "demo": null,
      "destaque": true,
      "ano": 2026
    },
    {
      "id": "projeto-2",
      "titulo": "TODO: titulo do projeto 2",
      "descricao": "TODO: descricao do projeto 2 em uma ou duas linhas, com problema e solucao.",
      "stack": ["Python", "SQL"],
      "imagem": null,
      "imagemAlt": "",
      "repo": "https://github.com/antoniniyuri7-ux",
      "demo": null,
      "destaque": true,
      "ano": 2026
    },
    {
      "id": "projeto-3",
      "titulo": "TODO: titulo do projeto 3",
      "descricao": "TODO: descricao do projeto 3 em uma ou duas linhas, com problema e solucao.",
      "stack": ["JavaScript"],
      "imagem": null,
      "imagemAlt": "",
      "repo": "https://github.com/antoniniyuri7-ux",
      "demo": null,
      "destaque": false,
      "ano": 2026
    }
  ]
}
```

**Verificação**

```powershell
Get-Content assets/data/projects.json -Raw | ConvertFrom-Json | Select-Object -ExpandProperty projetos | Measure-Object | Select-Object -ExpandProperty Count
```

**Esperado:** `3`.

**Se falhar:** o JSON está inválido; corrija vírgulas e aspas.

### T2.2 Adicionar `<template>` e área de erro em `index.html`

**Passos**

1. Antes do fechamento de `</main>`, adicione:

```html
<template id="project-card-template">
  <article class="card">
    <div class="card__media" aria-hidden="true"></div>
    <h3 class="card__title"><a class="card__link" href="#"></a></h3>
    <p class="card__desc"></p>
    <ul class="chips"></ul>
    <div class="card__links"></div>
  </article>
</template>
<p id="projects-error" class="projects-error" hidden>Não foi possível carregar os projetos. <a href="https://github.com/antoniniyuri7-ux" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>.</p>
```

2. Mantenha `#projects-grid` vazio.

**Verificação**

```powershell
Select-String -Path index.html -Pattern 'project-card-template','projects-error'
```

**Esperado:** 2 linhas.

### T2.3 Criar `assets/js/projects.js`

**Comportamento obrigatório**

1. `fetch('assets/data/projects.json')` ao carregar o DOM.
2. Validar: resposta `ok` e `data.projetos` é array com ≥ 1 item. Caso contrário, mostrar `#projects-error` e encerrar.
3. Ordenar: `destaque === true` primeiro; empate mantém a ordem original.
4. Para cada projeto, clonar `#project-card-template` e preencher **com `textContent`** (nunca `innerHTML` com dados do JSON):
   - `.card__link`: `textContent = titulo`, `href = repo` se começar com `https://`; se não houver `repo` válido, usar `#` e `aria-disabled="true"`.
   - `.card__desc`: `descricao`.
   - `.chips`: um `li.chip` por item de `stack`, máximo 4.
   - `.card__links`: link `Repositório` se `repo` válido; link `Demo` se `demo` começar com `https://`. Ambos com `target="_blank"` e `rel="noopener noreferrer"`.
   - `.card__media`: se `imagem` for string iniciada em `assets/`, criar `img` com `src`, `alt = imagemAlt`, `loading="lazy"`, `decoding="async"`, `width="640"`, `height="360"`; senão manter o bloco vazio com classe `card__media--placeholder`.
5. Inserir cada card em `#projects-grid` via `append`.
6. Envolver tudo em `try/catch`; no `catch`, mostrar `#projects-error`.
7. Não usar `alert`, não usar `console.log` em produção.

**Verificação**

```powershell
Select-String -Path assets/js/projects.js -Pattern 'textContent','append','catch'
```

**Esperado:** pelo menos 3 linhas.

### T2.4 Estilizar cards e grid

**Requisitos**

- `.projects-grid`: `display:grid; gap:var(--space-6); grid-template-columns:1fr`; em `@media (min-width:640px)`: `repeat(2,1fr)`; em `@media (min-width:900px)`: `repeat(3,1fr)`.
- `.card`: fundo `--surface`, borda `1px solid var(--border)`, raio `--radius-md`, `padding:var(--space-6)`, `display:flex; flex-direction:column; gap:var(--space-3)`, `transition:border-color .15s ease,box-shadow .15s ease`.
- `.card:hover, .card:focus-within`: borda `--accent`, `box-shadow:0 0 0 1px var(--accent-soft)`.
- `.card__media`: `aspect-ratio:16/9`, `border-radius:var(--radius-sm)`, `background:var(--surface-2)`, `overflow:hidden`, `margin-bottom:var(--space-2)`.
- `.card__media--placeholder`: `background:linear-gradient(135deg,var(--surface-2),var(--surface))` com borda tracejada `1px dashed var(--border)`.
- `.card__title`: `font-size:1.125rem`; `.card__link`: cor `--text`, sem sublinhado; hover/foco: cor `--accent`.
- `.card__desc`: `color:var(--text-muted); font-size:.9375rem`.
- `.chips`: `display:flex; flex-wrap:wrap; gap:var(--space-2); list-style:none; padding:0; margin:0`.
- `.chip`: `font-family:var(--font-mono); font-size:.75rem; padding:2px var(--space-2); border:1px solid var(--border); border-radius:var(--radius-sm); color:var(--text-muted)`.
- `.card__links`: `margin-top:auto; display:flex; gap:var(--space-4)`; links com `color:var(--accent)`.
- `.projects-error`: `color:var(--text-muted)`; `a` em `--accent`.

**Verificação**

```powershell
Select-String -Path assets/css/style.css -Pattern '\.projects-grid','\.card__media','\.chip'
```

**Esperado:** 3 linhas.

### T2.5 Testar render dos projetos

**Passos**

```powershell
Start-Process python -ArgumentList '-m','http.server','8000'
```

Depois, em uma aba de navegador, abra `http://localhost:8000` e execute:

```js
document.querySelectorAll('#projects-grid .card').length
```

**Esperado:** `3`.
Também: `document.querySelector('#projects-error').hidden` deve ser `true`.

**Se falhar:** abra o console; corrija apenas erros de sintaxe/URL. Não reescreva a lógica.

### T2.6 Commit da fase

```powershell
git add .
git commit -m "feat: secao de projetos com dados json"
```

---

## Fase 3 — Contato, movimento e acessibilidade

### T3.1 Completar a seção de contato

**Conteúdo obrigatório em `#contato`**

1. Parágrafo: `Estou aberto a oportunidades de estágio e projetos. Me encontre nas redes abaixo.`
2. `ul.social-list` com 3 `li` > `a.social-link`:
   - GitHub → `https://github.com/antoniniyuri7-ux`
   - LinkedIn → `TODO: linkedin`
   - E-mail → `mailto:TODO: e-mail`
3. Cada link: `target="_blank"` + `rel="noopener noreferrer"` (exceto `mailto:`), ícone SVG inline 20×20 com `aria-hidden="true"` e texto visível ao lado (`GitHub`, `LinkedIn`, `E-mail`).
4. Ícones: SVG simples (path), `fill="none"`, `stroke="currentColor"`, `stroke-width="1.8"`.

**Verificação**

```powershell
Select-String -Path index.html -Pattern 'social-link','mailto:','aria-hidden="true"'
```

**Esperado:** 3 linhas.

### T3.2 Estilizar contato

**Requisitos**

- `.social-list`: `list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:var(--space-4)`.
- `.social-link`: `display:inline-flex; align-items:center; gap:var(--space-2); min-height:44px; padding:var(--space-2) var(--space-4); border:1px solid var(--border); border-radius:var(--radius-pill); color:var(--text); text-decoration:none`; hover/foco: `border-color:var(--accent); color:var(--accent)`.
- `.social-link svg`: `width:20px; height:20px`.

**Verificação**

```powershell
Select-String -Path assets/css/style.css -Pattern '\.social-link','\.social-list'
```

**Esperado:** 2 linhas.

### T3.3 Criar `assets/js/main.js`

**Comportamento obrigatório**

1. **Revelar ao rolar:** selecionar `.section` e `.card`; adicionar classe `reveal` via JS; usar `IntersectionObserver` com `threshold:0.15` e `rootMargin:"0px 0px -10% 0px"`; ao intersectar, adicionar `is-visible` e `unobserve`.
2. **Respeitar movimento reduzido:** se `matchMedia('(prefers-reduced-motion: reduce)').matches` for verdadeiro, não adicionar `reveal` nem observer.
3. **Nav ativa:** `IntersectionObserver` sobre `#hero`, `#projetos`, `#contato`; ao entrar na viewport, marcar o `.nav__link` correspondente com `aria-current="location"` e remover dos demais.
4. **Ano do footer:** preencher `[data-ano]` com `new Date().getFullYear()`.
5. Sem `console.log`, sem `alert`, sem dependências.

**Verificação**

```powershell
Select-String -Path assets/js/main.js -Pattern 'IntersectionObserver','prefers-reduced-motion','aria-current'
```

**Esperado:** 3 linhas.

### T3.4 Estilizar movimento e foco

**Requisitos**

- `.reveal`: `opacity:0; transform:translateY(12px); transition:opacity .25s ease-out,transform .25s ease-out`.
- `.reveal.is-visible`: `opacity:1; transform:none`.
- `:focus-visible`: `outline:2px solid var(--accent); outline-offset:2px`.
- `@media (prefers-reduced-motion: reduce)`: `html{scroll-behavior:auto}`, `*,*::before,*::after{animation-duration:.01ms !important; transition-duration:.01ms !important}`, `.reveal{opacity:1; transform:none}`.
- Nunca usar `outline:none` sem substituto.

**Verificação**

```powershell
Select-String -Path assets/css/style.css -Pattern '\.reveal','prefers-reduced-motion','focus-visible'
```

**Esperado:** 3 linhas.

### T3.5 Testes de teclado e movimento

**Passos**

1. Recarregue `http://localhost:8000`.
2. Pressione `Tab` repetidamente do início: a ordem deve ser skip link → brand → Projetos → Contato → CTAs → cards → links sociais → voltar ao topo.
3. Confirme que **todo** elemento focado tem contorno ciano visível.
4. Em DevTools, emule `prefers-reduced-motion: reduce` (Rendering → Emulate CSS media feature) e recarregue: nenhum elemento deve animar.
5. Execute:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

**Esperado:** `true` em 360px, 768px e 1280px.

**Se falhar:** identifique o elemento que causa overflow; ajuste apenas `max-width`, `overflow` ou padding desse componente.

### T3.6 Commit da fase

```powershell
git add .
git commit -m "feat: contato, movimento sutil e foco acessivel"
```

---

## Fase 4 — SEO, assets e arquivos de publicação

### T4.1 Criar `assets/img/favicon.svg`

**Conteúdo exato**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Portfólio">
  <rect width="64" height="64" rx="14" fill="#11171F"/>
  <path d="M20 22l-8 10 8 10" fill="none" stroke="#22D3EE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M44 22l8 10-8 10" fill="none" stroke="#22D3EE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M36 18l-8 28" fill="none" stroke="#E6EDF3" stroke-width="4" stroke-linecap="round"/>
</svg>
```

**Verificação**

```powershell
Test-Path assets/img/favicon.svg
```

**Esperado:** `True`.

### T4.2 Gerar `assets/img/og-image.png` (1200×630)

**Passos**

```powershell
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 1200,630
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.ColorTranslator]::FromHtml('#0A0E12'))
$f1 = New-Object System.Drawing.Font('Segoe UI',22,[System.Drawing.FontStyle]::Regular)
$f2 = New-Object System.Drawing.Font('Segoe UI',58,[System.Drawing.FontStyle]::Bold)
$b1 = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#22D3EE'))
$b2 = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#E6EDF3'))
$g.DrawString('PORTFOLIO', $f1, $b1, 80, 230)
$g.DrawString('TODO: nome de exibicao', $f2, $b2, 80, 280)
$g.DrawString('Ciencia da Computacao', $f1, $b1, 80, 380)
$g.Dispose(); $bmp.Save('assets/img/og-image.png',[System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
```

**Verificação**

```powershell
Add-Type -AssemblyName System.Drawing
$i = [System.Drawing.Image]::FromFile((Resolve-Path assets/img/og-image.png))
"$($i.Width)x$($i.Height)"; $i.Dispose()
```

**Esperado:** `1200x630`.

**Se falhar:** garanta que a pasta `assets/img` existe (`New-Item -ItemType Directory -Force assets/img`).

### T4.3 Adicionar metadados em `index.html`

**Tags obrigatórias no `<head>`** (substitua `TODO: nome de exibição` literalmente):

```html
<title>TODO: nome de exibição — Portfólio | Ciência da Computação</title>
<meta name="description" content="Portfólio de TODO: nome de exibição, estudante de Ciência da Computação. Projetos em desenvolvimento web, com foco em clareza, performance e acessibilidade.">
<link rel="canonical" href="https://antoniniyuri7-ux.github.io/">
<meta property="og:type" content="website">
<meta property="og:title" content="TODO: nome de exibição — Portfólio">
<meta property="og:description" content="Projetos de um estudante de Ciência da Computação.">
<meta property="og:url" content="https://antoniniyuri7-ux.github.io/">
<meta property="og:image" content="https://antoniniyuri7-ux.github.io/assets/img/og-image.png">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="TODO: nome de exibição — Portfólio">
<meta name="twitter:description" content="Projetos de um estudante de Ciência da Computação.">
<meta name="twitter:image" content="https://antoniniyuri7-ux.github.io/assets/img/og-image.png">
```

**JSON-LD antes de `</head>`:**

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Person","name":"TODO: nome de exibição","jobTitle":"Estudante de Ciência da Computação","url":"https://antoniniyuri7-ux.github.io/","sameAs":["https://github.com/antoniniyuri7-ux"]}
</script>
```

**Verificação**

```powershell
Select-String -Path index.html -Pattern 'og:image','twitter:card','application/ld+json','canonical'
```

**Esperado:** 4 linhas.

### T4.4 Criar `robots.txt`

**Conteúdo exato**

```
User-agent: *
Allow: /

Sitemap: https://antoniniyuri7-ux.github.io/sitemap.xml
```

### T4.5 Criar `sitemap.xml`

**Conteúdo exato**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://antoniniyuri7-ux.github.io/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### T4.6 Criar `.nojekyll`

**Passos**

```powershell
New-Item -ItemType File -Force .nojekyll
```

**Verificação**

```powershell
Test-Path .nojekyll
```

**Esperado:** `True`.

### T4.7 Criar `README.md`

**Seções obrigatórias:** nome do projeto, URL pública, stack, como rodar localmente (`python -m http.server 8000`), como editar projetos (`assets/data/projects.json`), como editar textos (`index.html`), como publicar (push em `main`), estrutura de pastas, créditos.

### T4.8 Testar SEO e console

**Passos**

1. Recarregue `http://localhost:8000`.
2. Verifique no console: **zero** erros e zero avisos de recurso 404.
3. Execute:

```js
[document.title, document.querySelector('meta[name=description]').content.length]
```

**Esperado:** título com `— Portfólio | Ciência da Computação` e segundo valor entre `120` e `155`.

**Se falhar:** ajuste apenas a `meta description`.

### T4.9 Commit da fase

```powershell
git add .
git commit -m "feat: seo, assets e arquivos de publicacao"
```

---

## Fase 5 — Repositório e GitHub Pages

> **Só execute após aprovação explícita do usuário.**

### T5.1 Criar o repositório público

```powershell
gh api -X POST user/repos -f name=antoniniyuri7-ux.github.io -F private=false --jq '.full_name'
```

**Esperado:** `antoniniyuri7-ux/antoniniyuri7-ux.github.io`.

**Se falhar com `422`:** o repositório já existe; **pare** e reporte.

### T5.2 Enviar o código

```powershell
git remote add origin https://github.com/antoniniyuri7-ux/antoniniyuri7-ux.github.io.git
git push -u origin main
```

**Esperado:** push aceito, branch `main` criada no remoto.

### T5.3 Ativar o GitHub Pages

```powershell
'{"source":{"branch":"main","path":"/"}}' | gh api -X POST repos/antoniniyuri7-ux/antoniniyuri7-ux.github.io/pages --input -
gh api -X PUT repos/antoniniyuri7-ux/antoniniyuri7-ux.github.io/pages -F https_enforced=true
```

**Esperado:** JSON com `"html_url":"https://antoniniyuri7-ux.github.io/"`.

### T5.4 Verificar publicação

**Passos**

1. Aguarde até 2 minutos.
2. Execute:

```powershell
(Invoke-WebRequest https://antoniniyuri7-ux.github.io/ -UseBasicParsing).StatusCode
```

**Esperado:** `200`.

**Se falhar:** verifique `gh api repos/antoniniyuri7-ux/antoniniyuri7-ux.github.io/pages` e o status do build. Não altere código.

### T5.5 Verificar HTTPS

```powershell
(Invoke-WebRequest https://antoniniyuri7-ux.github.io/ -UseBasicParsing).BaseResponse.ResponseUri.AbsoluteUri
```

**Esperado:** URL iniciando com `https://`.

---

## Fase 6 — Conteúdo real

> Execute apenas quando o usuário fornecer os dados. **Nunca invente.**

### T6.1 Substituir identidade

**Passos**

1. Substituir **todas** as ocorrências de `TODO: nome de exibição` por `<nome real>` em `index.html`, `SPECS.md` (somente leitura — não alterar) e `assets/img/og-image.png` (regerar com T4.2 usando o nome real).
2. Substituir `TODO: frase de foco` pela frase aprovada (máx. 140 caracteres).
3. Substituir `TODO: e-mail` em `mailto:` e no texto do link.
4. Substituir `TODO: linkedin` pela URL completa.

**Verificação**

```powershell
Select-String -Path index.html -Pattern 'TODO:'
```

**Esperado:** nenhuma linha (ou apenas `TODO:` em comentários internos justificados).

### T6.2 Substituir projetos reais

**Passos**

1. Para cada projeto real, editar `assets/data/projects.json` mantendo o schema.
2. `descricao` entre 80 e 160 caracteres.
3. `stack` com no máximo 4 itens.
4. `repo` e `demo` devem começar com `https://`; use `null` quando não existir.
5. Imagens em `assets/img/projetos/<id>.webp`, com `width` 1280, `height` 720, e `imagemAlt` descritivo.

**Verificação**

```powershell
$p = Get-Content assets/data/projects.json -Raw | ConvertFrom-Json
$p.projetos | ForEach-Object { "{0} | {1} chars | {2} itens" -f $_.id, $_.descricao.Length, $_.stack.Count }
```

**Esperado:** 3 a 4 linhas, cada descrição entre 80 e 160 e stack ≤ 4.

### T6.3 Publicar atualização

```powershell
git add .
git commit -m "content: dados reais do portfolio"
git push
```

---

## Testes finais (obrigatórios, nesta ordem)

### T-F1 — Estrutura e semântica

```powershell
Select-String -Path index.html -Pattern '<h1' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path index.html -Pattern 'lang="pt-BR"','<main','<header','<footer','<nav'
```

**Aprovado se:** exatamente `1` ocorrência de `<h1>` e todos os landmarks presentes.

### T-F2 — Placeholders eliminados

```powershell
Select-String -Path index.html,assets/data/projects.json,README.md -Pattern 'TODO:|Lorem ipsum'
```

**Aprovado se:** nenhum resultado.

### T-F3 — Links externos seguros

```powershell
Select-String -Path index.html -Pattern 'target="_blank"' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path index.html -Pattern 'rel="noopener noreferrer"' | Measure-Object | Select-Object -ExpandProperty Count
```

**Aprovado se:** os dois números forem iguais.

### T-F4 — Orçamento de performance

```powershell
"{0} KB CSS" -f [math]::Round((Get-Item assets/css/style.css).Length/1KB,1)
"{0} KB JS" -f [math]::Round(((Get-Item assets/js/main.js).Length + (Get-Item assets/js/projects.js).Length)/1KB,1)
```

**Aprovado se:** CSS ≤ 25 KB e JS ≤ 10 KB.

### T-F5 — Responsividade sem overflow

Em `http://localhost:8000`, para cada largura 360, 768 e 1280:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

**Aprovado se:** `true` nas três.

### T-F6 — Teclado

**Passos:** `Tab` do início ao fim.

**Aprovado se:** foco visível em todos os elementos, ordem lógica, skip link funcional, nenhum elemento inalcançável.

### T-F7 — Movimento reduzido

**Passos:** emular `prefers-reduced-motion: reduce` e recarregar.

**Aprovado se:** conteúdo aparece imediatamente, sem transições e sem scroll suave.

### T-F8 — JavaScript desativado

**Passos:** desativar JS no DevTools e recarregar.

**Aprovado se:** hero, contato, footer e navegação funcionam; a seção de projetos exibe `#projects-error` com link para o GitHub.

### T-F9 — Console limpo

**Aprovado se:** nenhum erro e nenhum 404 na aba Network.

### T-F10 — HTML válido

**Passos:** abrir `https://validator.w3.org/nu/?doc=https%3A%2F%2Fantoniniyuri7-ux.github.io%2F` após o deploy.

**Aprovado se:** zero erros (avisos são aceitáveis).

### T-F11 — Lighthouse

**Passos:** DevTools → Lighthouse → Mobile → todas as categorias.

**Aprovado se:** Performance ≥ 95, Acessibilidade 100, Boas práticas 100, SEO ≥ 95.

**Se falhar:** registre a categoria e a métrica exata; **não** refaça o site. Ajuste apenas o item apontado.

### T-F12 — Deploy público

```powershell
(Invoke-WebRequest https://antoniniyuri7-ux.github.io/ -UseBasicParsing).StatusCode
(Invoke-WebRequest https://antoniniyuri7-ux.github.io/assets/css/style.css -UseBasicParsing).StatusCode
```

**Aprovado se:** ambos `200`.

### T-F13 — Preview de compartilhamento

**Passos:** validar as tags com `https://www.opengraph.xyz/` ou inspecionar o HTML publicado.

**Aprovado se:** título, descrição e imagem 1200×630 aparecem corretamente.

---

## Relatório final de execução

Ao concluir, entregue **exatamente** este formato:

```
FASE 1: [x]
FASE 2: [x]
FASE 3: [x]
FASE 4: [x]
FASE 5: [x]
FASE 6: [x ou ! com motivo]
TESTES: F1 [x] F2 [x] F3 [x] F4 [x] F5 [x] F6 [x] F7 [x] F8 [x] F9 [x] F10 [x] F11 [x] F12 [x] F13 [x]
URL: https://antoniniyuri7-ux.github.io/
PENDENCIAS: <lista ou "nenhuma">
COMMITS: <hash curto + mensagem, um por linha>
```

**Não declare sucesso sem ter executado cada verificação e colado o resultado.**
