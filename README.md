# RA2 — site

Site institucional da RA2. HTML, CSS e JS puros: sem build, sem dependências, sem node_modules.
Linguagem visual baseada em `janjanvanessche.com` e no layout do Canva da marca.

## Rodar localmente

```bash
python3 -m http.server 4321
```

Depois abra `http://localhost:4321`.

## Estrutura

```
index.html                  shell único (o site é uma SPA com rotas por #hash)
assets/css/main.css         todo o estilo
assets/js/content.js        ← TEXTOS, FOTOS E COLEÇÕES (é aqui que você mexe)
assets/js/app.js            motor: rotas, slideshow, áudio, fullscreen
assets/img/...              as fotos
assets/audio/ambient.mp3    trilha opcional do botão AUDIO
```

Rotas: `#/` (home) · `#/lab` · `#/lab/<slug>` · `#/studio` · `#/contato`

## Adicionar as fotos

Enquanto uma foto não existe, o site mostra um bloco vermelho com o caminho
esperado escrito nele. Basta salvar o arquivo naquele caminho e recarregar.

| Pasta | Onde aparece | Situação |
|---|---|---|
| `assets/img/conteudos/` | `01`–`08` no slideshow da home; `09`–`10` no fundo do contato | ✅ pronto |
| `assets/img/desfile/` | DESFILES → "Raízes" — `01.jpg` a `12.jpg`, um por look | ✅ pronto |
| `assets/img/lookbook/` | LOOKBOOK — `01.jpg` a `06.jpg` | falta |
| `assets/img/campanhas/polo/` | ARCHIVES → Polo — `01.jpg` a `06.jpg` | falta |
| `assets/img/campanhas/selecao-brasileira/` | ARCHIVES → Seleção Brasileira — `01.jpg` a `06.jpg` | falta |
| `assets/img/studio/` | Página The Studio — `01.jpg` a `05.jpg` | falta |

### Ponto focal das fotos de fundo

As fotos da home e do contato são verticais, mas a tela é larga — o navegador
corta em cima e embaixo. Em `content.js`, cada uma tem um `pos` que diz que
parte manter: `center 30%` puxa para o alto (rosto), `center 50%` fica no meio.
Se alguma foto ficar cortada errado, é esse número que se ajusta.

Recomendação: JPG, lado maior ~2000px, até ~400 KB por arquivo.
As fotos de fundo (home e contato) funcionam melhor em vertical e mais escuras,
porque o texto branco fica por cima.

## Adicionar uma coleção nova

Em `assets/js/content.js`, duplique o bloco de `raizes` dentro de `collections`,
troque `slug`, `idx`, `title`, `year` e aponte as fotos para uma pasta nova em
`assets/img/`. Ela aparece sozinha no índice do LAB.

O posicionamento das fotos usa uma grade de 12 colunas:

- `col` — coluna onde a foto começa (1 a 12)
- `span` — quantas colunas ela ocupa
- `top` — deslocamento vertical em `vh`, o que cria o efeito "espalhado"
- `ratio` — proporção da foto, ex. `"3/4"`, `"4/5"`, `"1/1"`

## Idioma

O site é bilíngue, com o seletor `PT / EN` no canto superior direito. A escolha
fica salva no navegador do visitante.

Todo texto visível em `content.js` é um objeto `{ pt: "...", en: "..." }`. Se
você escrever só o português, o site usa o português nos dois idiomas — nada
quebra, e dá para traduzir depois, aos poucos.

Os nomes do menu (RUNWAY, ARCHIVES, THE STUDIO, CONTACT) e os nomes das
coleções são iguais nos dois idiomas, de propósito.

## Áudio

O botão `SOM DESLIGADO` toca `assets/audio/ambient.m4a` em loop, com fade de
entrada e saída. Navegadores não deixam tocar áudio sem clique, então ele nunca
começa sozinho. Se o arquivo sumir, o botão vira `SOM INDISPONÍVEL` em vez de
quebrar.

A trilha atual é a `ra2ambience`, 48 segundos, que emenda sem clique no loop.
Para trocar, basta substituir o arquivo mantendo o nome `ambient.m4a`.

O volume do player está em `0.45`, definido em `assets/js/app.js` (`fadeTo`).

## Publicar

É um site estático: sobe em qualquer lugar. Arraste a pasta em
[app.netlify.com/drop](https://app.netlify.com/drop), ou use Vercel, Cloudflare
Pages ou GitHub Pages. Não há passo de build.
