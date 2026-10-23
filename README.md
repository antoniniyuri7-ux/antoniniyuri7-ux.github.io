# Portfólio — antoniniyuri7-ux

Site pessoal público de portfólio, feito em HTML, CSS e JavaScript puro e publicado no GitHub Pages.

**URL:** https://antoniniyuri7-ux.github.io/

## Stack

- HTML5 semântico
- CSS3 (tokens, grid, mobile-first)
- JavaScript (ES modules), sem build e sem dependências
- GitHub Pages (branch `main`, raiz do repositório)

## Rodar localmente

```powershell
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Editar projetos

Os cards são renderizados a partir de `assets/data/projects.json`. Cada item segue este formato:

```json
{
  "id": "nome-curto",
  "titulo": "Nome do projeto",
  "descricao": "Uma ou duas linhas sobre problema e solução.",
  "stack": ["HTML", "CSS", "JavaScript"],
  "imagem": "assets/img/projetos/nome-curto.webp",
  "imagemAlt": "Descrição objetiva da imagem",
  "repo": "https://github.com/antoniniyuri7-ux/repo",
  "demo": null,
  "destaque": true,
  "ano": 2026
}
```

- `imagem` e `demo` aceitam `null`.
- `descricao`: entre 80 e 160 caracteres.
- `stack`: no máximo 4 itens.
- `destaque: true` coloca o projeto no início da lista.

## Editar textos

Todo o conteúdo textual está em `index.html`: nome, frase de foco, seção de contato e rodapé. Ao trocar o nome, atualize também as tags de SEO (`title`, `description`, Open Graph, JSON-LD) e regenere `assets/img/og-image.png`.

## Publicar

Qualquer push na branch `main` atualiza o site em até 2 minutos:

```powershell
git add .
git commit -m "content: atualiza portfolio"
git push
```

## Estrutura

```
/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/projects.js
│   ├── data/projects.json
│   └── img/ (favicon.svg, og-image.png, projetos/)
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── AGENTS.md
├── SPECS.md
└── TODO.md
```

## Documentação do projeto

- `AGENTS.md` — regras de design e engenharia.
- `SPECS.md` — especificação completa.
- `TODO.md` — plano de execução e testes.
