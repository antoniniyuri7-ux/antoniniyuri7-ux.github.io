# SPECS.md — Portfólio pessoal (GitHub Pages)

> Documento de planejamento. **Nenhum código de site foi criado ainda.** Este arquivo e `AGENTS.md` são as únicas entregas desta fase.

**Versão:** 1.0 (planejamento)
**Data:** 2026-10-23
**Responsável:** antoniniyuri7-ux
**Status:** aguardando aprovação para implementação

---

## 1. Visão geral

Site pessoal estático, público, hospedado no GitHub Pages, servindo como portfólio de projetos de um estudante de Ciência da Computação que busca oportunidades. Uma visita de 30 segundos deve responder: **quem é**, **o que sabe fazer** e **como entrar em contato**.

- **Público:** https://antoniniyuri7-ux.github.io
- **Idioma:** português (pt-BR)
- **Tema:** dark tech com destaque azul ciano
- **Stack:** HTML5 + CSS3 + JavaScript (ES modules), sem build e sem dependências

## 2. Objetivos

1. Apresentar nome, formação e foco profissional com clareza imediata.
2. Exibir de 3 a 4 projetos com problema, solução, stack e links funcionais.
3. Oferecer caminho de contato em um clique (GitHub, LinkedIn, e-mail).
4. Ser rápido, acessível e responsivo em qualquer dispositivo.
5. Ser trivial de manter: editar um JSON e um HTML, sem ferramentas de build.

### Não objetivos (v1)

- Blog, artigos ou área de escrita.
- Currículo em PDF ou download.
- Formulário de contato com backend ou serviço externo.
- Internacionalização (PT/EN) e seletor de idioma.
- Alternância de tema claro/escuro.
- CMS, banco de dados, login ou área administrativa.
- Analytics de terceiros.

## 3. Arquitetura de informação

Página única (`index.html`) com três blocos e navegação por âncoras:

```
├── header (fixo, translúcido)
│   ├── logo/marca (texto)
│   └── nav: Projetos · Contato
├── main
│   ├── #hero        → nome, formação, frase de foco, CTA principal, links
│   ├── #projetos    → grid de cards renderizados a partir de projects.json
│   └── #contato     → convite + links GitHub / LinkedIn / e-mail
└── footer           → copyright, tecnologia, link "voltar ao topo"
```

Não haverá página de detalhe de projeto na v1; os links levam ao repositório ou demo externos.

## 4. Conteúdo por seção

### 4.1 Hero

| Elemento | Conteúdo |
| --- | --- |
| Eyebrow | `Estudante de Ciência da Computação` |
| Nome (`h1`) | `TODO: nome de exibição` |
| Frase de foco (máx. 140 caracteres) | `TODO: ex.: "Construo interfaces e soluções web com foco em clareza, performance e acessibilidade."` |
| CTA primário | `Ver projetos` → `#projetos` |
| CTA secundário | `GitHub` → `https://github.com/antoniniyuri7-ux` |
| Apoio opcional | `Disponível para estágio / oportunidades` (badge com ponto pulsante estático) |

Regras de copy: primeira pessoa, frases curtas, sem adjetivos genéricos, sem emojis.

### 4.2 Projetos

- Quantidade no lançamento: **3 a 4**.
- Ordem: definida manualmente pelo campo `destaque` e depois pela data.
- Cada card contém: imagem opcional, título, descrição (1–2 linhas), stack (até 4 tags), links `Repositório` e `Demo` (quando existirem).
- Dados vêm de `assets/data/projects.json`; renderização via JS a partir de um `<template>` no HTML.
- Fallback sem JS: lista textual simples em `<noscript>` com título e link de cada projeto *não* é viável sem duplicação — portanto o HTML deve conter os projetos essenciais em `<template>` e o fallback será uma mensagem + link para o GitHub. Decisão registrada em §5.

### 4.3 Contato

- Título: `Vamos conversar` (ou equivalente aprovado).
- Texto de 1–2 linhas convidando recrutadores a entrar em contato.
- Links: GitHub, LinkedIn (`TODO`), e-mail (`TODO`).
- Ícones SVG inline (sem biblioteca), com rótulo textual ao lado.

### 4.4 Footer

- `© 2026 antoniniyuri7-ux`.
- Tecnologia: "Feito com HTML, CSS e JS puro".
- Link "Voltar ao topo".

## 5. Modelo de dados — `assets/data/projects.json`

```json
{
  "versao": 1,
  "projetos": [
    {
      "id": "nome-curto",
      "titulo": "TODO: nome do projeto",
      "descricao": "TODO: 1–2 linhas sobre problema e solução.",
      "stack": ["HTML", "CSS", "JavaScript"],
      "imagem": "assets/img/projetos/nome-curto.webp",
      "imagemAlt": "TODO: descrição objetiva da imagem",
      "repo": "https://github.com/antoniniyuri7-ux/repo",
      "demo": null,
      "destaque": true,
      "ano": 2026
    }
  ]
}
```

Regras:

- `id` único, `kebab-case`, usado apenas como chave.
- `imagem` pode ser `null`; nesse caso o card usa um bloco de fallback com iniciais ou padrão gráfico em CSS.
- `descricao` entre 80 e 160 caracteres.
- `stack` com no máximo 4 itens, nomes canônicos (`JavaScript`, `Python`, `SQL`, `Figma`).
- `demo` e `repo` validados como `https` antes de renderizar; links ausentes não aparecem.
- Falha ao carregar o JSON: exibir mensagem discreta e link direto para o GitHub.

## 6. Design system

### 6.1 Tokens de cor

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#0A0E12` | fundo da página |
| `--surface` | `#11171F` | cards, header |
| `--surface-2` | `#172029` | hover, chips |
| `--border` | `#1F2A35` | divisórias e contornos |
| `--text` | `#E6EDF3` | texto principal |
| `--text-muted` | `#93A1AE` | apoio e legendas |
| `--accent` | `#22D3EE` | ações, foco, destaques |
| `--accent-strong` | `#06B6D4` | hover de botões |
| `--accent-soft` | `rgba(34, 211, 238, 0.12)` | fundos sutis, badges |

Contraste verificado: texto principal ≈ 15:1; texto de apoio ≈ 7:1; ciano sobre fundo escuro ≈ 11:1.

### 6.2 Tipografia

- **Sans:** `ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif`.
- **Mono (eyebrow, chips, código):** `ui-monospace, "Cascadia Code", Consolas, monospace`.
- Escala fluida com `clamp()`:

| Papel | Tamanho |
| --- | --- |
| `h1` | `clamp(2.25rem, 5vw, 3.5rem)` |
| `h2` | `clamp(1.5rem, 3vw, 2rem)` |
| `h3` (card) | `1.125rem` |
| Corpo | `1rem` / altura de linha 1.6 |
| Apoio | `0.875rem` / altura 1.5 |
| Eyebrow | `0.75rem`, `letter-spacing: .08em`, maiúsculas |

Pesos: 400 (corpo), 600 (títulos e botões). Máximo de duas famílias.

### 6.3 Espaçamento, raio e sombra

- Escala: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Raio: `8px` (chips), `14px` (cards), `999px` (botões e badges).
- Sombra: `0 1px 2px rgba(0,0,0,.4)` em cards; `0 0 0 1px var(--accent)` no foco.

### 6.4 Layout

- Largura máxima do conteúdo: `1120px`; gutters `24px` (mobile) / `40px` (desktop).
- Hero: coluna única, alinhamento à esquerda, altura mínima `85vh`.
- Projetos: grid `1 / 2 / 3` colunas (mobile / tablet / desktop).
- Contato: bloco centralizado com largura máxima de `640px`.
- Header: `position: sticky`, altura `64px`, fundo `--surface` com `backdrop-filter: blur(8px)` e borda inferior.

### 6.5 Breakpoints

| Nome | Largura |
| --- | --- |
| `sm` | `≥ 640px` |
| `md` | `≥ 900px` |
| `lg` | `≥ 1200px` |

Mobile-first obrigatório.

## 7. Componentes

| Componente | Estados | Observações |
| --- | --- | --- |
| `botao` | default, hover, focus-visible, active | variantes `primario` (ciano) e `secundario` (contorno) |
| `card-projeto` | default, hover, focus-within | card inteiro clicável via link do título; sem `div` clicável |
| `chip-stack` | estático | mono, fundo `--surface-2`, borda `--border` |
| `badge-disponibilidade` | estático | ponto ciano + texto de apoio |
| `link-social` | default, hover, focus-visible | ícone SVG + rótulo textual |
| `skip-link` | oculto, visível no foco | primeiro elemento focável |
| `nav-anchor` | default, ativo (seção visível), focus-visible | sublinhado animado de 2px |

## 8. Interações e movimento

- **Fade-up ao entrar na viewport:** `opacity 0→1`, `translateY 12px→0`, 250ms, `ease-out`, via `IntersectionObserver`, executado uma única vez.
- **Hover em card:** borda e sombra mudam em 150ms; sem escala.
- **Nav ativa:** seção em foco destacada por sublinhado; observer com `rootMargin`.
- **Scroll suave** para âncoras via `scroll-behavior: smooth`, desativado com `prefers-reduced-motion`.
- **Sem** parallax, glitch, typewriter, cursor piscando ou contadores animados.
- Todo efeito é **progressivo**: com JS desativado o conteúdo aparece normalmente (classe `.revelar` só é aplicada por JS).

## 9. Acessibilidade

- Meta: **WCAG 2.2 nível AA**.
- Landmarks semânticos, um `h1`, hierarquia de títulos sem saltos.
- Skip link, foco visível com contraste ≥ 3:1, ordem de tabulação natural.
- `aria-current="page"` na navegação interna não se aplica; usar `aria-current="location"` na seção ativa.
- Ícones decorativos com `aria-hidden="true"`; links sociais com texto visível.
- Imagens com `alt` real; cards sem imagem usam padrão CSS sem texto alternativo falso.
- Testes manuais: teclado, VoiceOver/NVDA, zoom 200%, `prefers-reduced-motion`.

## 10. Performance

- CSS final ≤ 25 KB, JS ≤ 10 KB (sem minificação), página ≤ 400 KB.
- Sem fontes web, sem ícones de biblioteca, sem polyfills.
- Imagens em WebP, `width`/`height` declarados, `loading="lazy"` e `decoding="async"` abaixo da dobra.
- `projects.json` pequeno e cacheável; falha de rede não bloqueia o restante da página.
- Meta Lighthouse: Performance ≥ 95, Acessibilidade 100, Boas práticas 100, SEO ≥ 95.

## 11. SEO e compartilhamento

- `<title>Nome — Portfólio | Ciência da Computação</title>`.
- `meta description` de 120–155 caracteres.
- Open Graph + Twitter Card com `assets/img/og-image.png` (1200×630).
- `canonical`: `https://antoniniyuri7-ux.github.io/`.
- `lang="pt-BR"`, `theme-color: #0A0E12`.
- `favicon.svg` + `apple-touch-icon.png`.
- JSON-LD `Person` com `name`, `jobTitle`, `alumniOf` (se aplicável) e `sameAs`.
- `robots.txt` permitindo tudo e referência ao sitemap; `sitemap.xml` com a home.

## 12. Hospedagem e deploy

| Item | Decisão |
| --- | --- |
| Repositório | `antoniniyuri7-ux.github.io` (**a criar**, pendente de aprovação) |
| Visibilidade | Público |
| Branch | `main` |
| Fonte do Pages | Deploy from branch → `main` → `/ (root)` |
| Build | Nenhum; arquivos servidos como estão |
| `.nojekyll` | Sim, na raiz, para desativar processamento do Jekyll |
| HTTPS | Forçado (Enforce HTTPS) |
| Domínio customizado | Não na v1 |
| URL final | `https://antoniniyuri7-ux.github.io/` |

Observação: o repositório `projeto-open-code` já criado permanece vazio e **não** será usado por este site.

## 13. Estrutura de arquivos prevista

```
/
├── AGENTS.md
├── SPECS.md
├── README.md                 (instruções de edição e deploy)
├── index.html
├── .nojekyll
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js           (nav ativa, revelar, ano do footer)
    │   └── projects.js       (fetch + render do JSON)
    ├── data/
    │   └── projects.json
    └── img/
        ├── favicon.svg
        ├── og-image.png
        └── projetos/
            └── .gitkeep
```

## 14. Fases de implementação

| Fase | Entrega | Critério de conclusão |
| --- | --- | --- |
| 0 | Planejamento (`AGENTS.md`, `SPECS.md`) | Revisado e aprovado |
| 1 | Fundação: HTML semântico, tokens, layout do hero e footer | Responsivo 360/768/1280, sem JS |
| 2 | Projetos: JSON, template, render, estados de erro | Cards acessíveis e grid responsivo |
| 3 | Contato + refinamento de movimento e foco | Navegação por teclado completa |
| 4 | SEO, OG image, favicon, robots/sitemap | Preview de link correto |
| 5 | Criação do repo e publicação no Pages | URL pública respondendo com HTTPS |
| 6 | Conteúdo real (nome, textos, projetos) | Zero `TODO` pendente |

Cada fase termina com relatório curto: o que mudou, o que foi testado, pendências.

## 15. Critérios de aceite (v1)

1. `https://antoniniyuri7-ux.github.io/` carrega em menos de 2s em 4G simulado.
2. Hero comunica nome, formação e foco sem rolagem em telas ≥ 768px.
3. Três a quatro projetos visíveis, cada um com link funcional.
4. Todos os links de contato abrem corretamente em nova aba.
5. Navegação completa por teclado, foco sempre visível.
6. Sem scroll horizontal entre 320px e 1920px.
7. Lighthouse dentro das metas de §10.
8. HTML válido (W3C), sem erros no console.
9. Nenhum texto `TODO` ou Lorem ipsum.
10. `prefers-reduced-motion` desativa todas as animações.

## 16. Riscos e mitigação

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Conteúdo real atrasar | Site fica com placeholders | Fase 6 separada; placeholders explícitos e visíveis |
| Projetos sem imagem | Cards desiguais | Fallback gráfico em CSS, proporção fixa 16:9 |
| Excesso de animação | Prejudica legibilidade | Lista fechada de efeitos em §8 |
| Falha de fetch do JSON | Seção vazia | Mensagem de erro + link para o GitHub |
| Nome do repo especial | URL errada | Confirmar `antoniniyuri7-ux.github.io` antes de criar |

## 17. Decisões em aberto

1. Nome de exibição no `h1` (nome completo, primeiro + último, ou apelido).
2. E-mail público e URL do LinkedIn.
3. Lista dos 3–4 projetos: título, descrição, stack, repo e demo.
4. Texto definitivo da frase de foco do hero.
5. Manter o badge "disponível para oportunidades"? (sim/não)
6. Usar o repositório `projeto-open-code` para outra finalidade ou excluí-lo.

---

**Próximo passo:** aprovar este planejamento e responder às decisões em aberto (§17). Só então inicia a Fase 1.
