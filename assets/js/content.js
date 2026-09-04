/* ------------------------------------------------------------------
   RA2 — CONTEÚDO
   Este é o único arquivo que você precisa editar no dia a dia.

   TEXTOS BILÍNGUES
   Todo texto que aparece na tela é um objeto { pt: "...", en: "..." }.
   Se o inglês faltar, o site cai no português automaticamente.

   As fotos vivem em:
     assets/img/desfile/                        → RUNWAY
     assets/img/campanhas/<campanha>/           → ARCHIVES
     assets/img/studio/                         → THE STUDIO
     assets/img/conteudos/                      → fundos da home e do contato

   Sobre `col` e `span`: a página usa uma grade de 12 colunas.
   `col` = coluna onde a peça começa (1 a 12), `span` = quantas ocupa.
   `top` = deslocamento vertical em vh, para o efeito "espalhado".
------------------------------------------------------------------- */

window.RA2 = {

  /* --- fotos da home (troca sozinha, com fading) ------------------
     `pos` é o ponto focal do corte. As fotos são verticais e a tela é
     larga, então o navegador corta em cima e embaixo: o segundo valor
     diz que parte manter. 30% puxa para o alto (rosto), 50% é o meio. */
  home: [
    { src: "assets/img/conteudos/01.jpg", pos: "center 38%" },  /* DSC05994   */
    { src: "assets/img/conteudos/02.jpg", pos: "center 26%" },  /* DSC05848   */
    { src: "assets/img/conteudos/03.jpg", pos: "center 30%" },  /* DSC06049-2 */
    { src: "assets/img/conteudos/04.jpg", pos: "center 45%" },  /* DSC05963   */
    { src: "assets/img/conteudos/05.jpg", pos: "center 32%" },  /* DSC05972-2 */
    { src: "assets/img/conteudos/06.jpg", pos: "center 30%" },  /* IMG_0396   */
    { src: "assets/img/conteudos/07.jpg", pos: "center 36%" },  /* DSC05966-2 */
    { src: "assets/img/conteudos/08.jpg", pos: "center 30%" },  /* IMG_4464   */
    { src: "assets/img/conteudos/09.jpg", pos: "center 24%" }   /* DSC05673-2 */
  ],

  /* --- fotos de fundo da página de contato -----------------------
     reaproveitam duas das fotos da home, as mais escuras */
  contact: [
    { src: "assets/img/conteudos/02.jpg", pos: "center 26%" },
    { src: "assets/img/conteudos/03.jpg", pos: "center 30%" }
  ],

  /* --- dados de contato ------------------------------------------ */
  info: {
    office: "(11) 94534-3242",
    studio: "(11) 99983-3532",
    instagram: "@ra2_lab",
    instagramUrl: "https://www.instagram.com/ra2_lab/",
    email: "contato@ra2lab.com",
    address: { pt: "São Paulo, SP", en: "São Paulo, Brazil" },

    /* botão AGENDE AQUI — abre o WhatsApp do Studio.
       Formato do número: 55 + DDD + número, só dígitos. */
    whatsapp: "5511999833532",
    whatsappMsg: {
      pt: "Olá! Gostaria de agendar uma visita ao studio RA2.",
      en: "Hello! I'd like to book a visit to the RA2 studio."
    }
  },

  /* --- LOOKBOOK ---------------------------------------------------
     Aguardando as fotos em assets/img/lookbook/ (01.jpg … 06.jpg). */
  lookbook: {
    theme: "dark",
    /* TODO: texto do lookbook — trocar pelo real */
    lede: { pt: "", en: "" },
    pieces: [
      { img: "assets/img/lookbook/01.jpg", col: 2,  span: 4, top: 0,  ratio: "4/5" },
      { img: "assets/img/lookbook/02.jpg", col: 7,  span: 4, top: 18, ratio: "4/5" },
      { img: "assets/img/lookbook/03.jpg", col: 1,  span: 5, top: 6,  ratio: "4/5" },
      { img: "assets/img/lookbook/04.jpg", col: 8,  span: 4, top: 0,  ratio: "4/5" },
      { img: "assets/img/lookbook/05.jpg", col: 3,  span: 5, top: 10, ratio: "4/5" },
      { img: "assets/img/lookbook/06.jpg", col: 9,  span: 3, top: 4,  ratio: "4/5" }
    ]
  },

  /* --- THE STUDIO ------------------------------------------------- */
  studio: {
    theme: "light",
    lede: {
      pt:
        "A RA2 é um laboratório especializado em alfaiataria e malharia avant-garde. " +
        "O trabalho nasce no atelier: modelagem, prova, corte e desconstrução acontecem " +
        "no mesmo espaço, e cada peça é tratada como experimento antes de virar produto. " +
        "O estúdio recebe visitas com hora marcada, para prova, ajuste e desenvolvimento sob medida.",
      en:
        "RA2 is a laboratory devoted to avant-garde tailoring and knitwear. " +
        "The work begins in the atelier: pattern-making, fitting, cutting and deconstruction " +
        "all happen in the same room, and every piece is treated as an experiment before it " +
        "becomes a product. The studio receives visits by appointment, for fittings, alterations " +
        "and made-to-measure development."
    },
    pieces: [
      { img: "assets/img/studio/01.jpg", col: 1, span: 5, top: 0,  ratio: "3/4" },
      { img: "assets/img/studio/02.jpg", col: 8, span: 4, top: 14, ratio: "3/4" },
      { img: "assets/img/studio/03.jpg", col: 3, span: 3, top: 6,  ratio: "3/4" },
      { note: {
          pt: [
            "Alfaiataria e malharia dividem a mesma mesa. O que é cortado num dia é desmontado no outro.",
            "Atendimento sob agendamento — escreva para contato@ra2lab.com ou chame no WhatsApp do Studio."
          ],
          en: [
            "Tailoring and knitwear share the same table. What is cut one day is taken apart the next.",
            "By appointment only — write to contato@ra2lab.com or message the Studio on WhatsApp."
          ]
        }, col: 7, span: 4, top: 4 },
      { img: "assets/img/studio/04.jpg", col: 2, span: 6, top: 0,  ratio: "4/5" },
      { img: "assets/img/studio/05.jpg", col: 9, span: 3, top: 18, ratio: "3/4" }
    ]
  },

  /* --- RUNWAY: desfiles ------------------------------------------- */
  collections: [
    {
      slug: "raizes",
      idx: "01",
      title: "RAÍZES",
      year: { pt: "S/S 2027", en: "S/S 2027" },
      theme: "dark",
      lede: {
        pt:
          "Raízes é o desfile da RA2 para primavera/verão 2027, apresentado no Studio Ricardo Almeida. " +
          "Doze looks que partem da alfaiataria para chegar ao avesso dela: linho amassado, malha caída, " +
          "sobreposições que escondem a estrutura em vez de exibi-la.",
        en:
          "Raízes is RA2's spring/summer 2027 show, presented at Studio Ricardo Almeida. " +
          "Twelve looks that start from tailoring and arrive at its reverse: creased linen, " +
          "slouched knitwear, layers that hide the structure instead of displaying it."
      },
      pieces: [
        { img: "assets/img/desfile/01.jpg", col: 2,  span: 3, top: 0,  ratio: "4/5", caption: "Look 01" },
        { img: "assets/img/desfile/02.jpg", col: 6,  span: 3, top: 16, ratio: "4/5", caption: "Look 02" },
        { note: {
            pt: [
              "A coleção trabalha uma paleta curta — linho cru, cinza, marinho e preto — para que a leitura " +
              "aconteça na forma, não na cor.",
              "O corte parte do corpo e se afasta dele: ombro solto, cava baixa, calça que arrasta. " +
              "A alfaiataria continua ali, mas desmontada."
            ],
            en: [
              "The collection works with a short palette — raw linen, grey, navy and black — so that the " +
              "reading happens in the shape, not in the colour.",
              "The cut starts at the body and moves away from it: dropped shoulder, low armhole, trousers " +
              "that drag. The tailoring is still there, but taken apart."
            ]
          }, col: 10, span: 3, top: 2 },
        { img: "assets/img/desfile/03.jpg", col: 1,  span: 5, top: 4,  ratio: "4/5", caption: "Look 03" },
        { img: "assets/img/desfile/04.jpg", col: 7,  span: 4, top: 22, ratio: "4/5", caption: "Look 04" },
        { img: "assets/img/desfile/05.jpg", col: 3,  span: 4, top: 0,  ratio: "4/5", caption: "Look 05" },
        { img: "assets/img/desfile/06.jpg", col: 9,  span: 3, top: 10, ratio: "4/5", caption: "Look 06" },
        { img: "assets/img/desfile/07.jpg", col: 2,  span: 4, top: 6,  ratio: "4/5", caption: "Look 07" },
        { img: "assets/img/desfile/08.jpg", col: 7,  span: 5, top: 0,  ratio: "4/5", caption: "Look 08" },
        { img: "assets/img/desfile/09.jpg", col: 1,  span: 3, top: 14, ratio: "4/5", caption: "Look 09" },
        { img: "assets/img/desfile/10.jpg", col: 5,  span: 4, top: 2,  ratio: "4/5", caption: "Look 10" },
        { img: "assets/img/desfile/11.jpg", col: 10, span: 3, top: 20, ratio: "4/5", caption: "Look 11" },
        { img: "assets/img/desfile/12.jpg", col: 3,  span: 5, top: 4,  ratio: "4/5", caption: "Look 12" }
      ]
    }
    /* Para adicionar o próximo desfile, copie o bloco acima,
       troque slug/idx/title/year e aponte as fotos para
       assets/img/<nova-pasta>/ */
  ],

  /* --- ARCHIVES: campanhas ---------------------------------------- */
  campaigns: [
    {
      slug: "polo",
      idx: "01",
      title: "POLO",
      year: { pt: "CAMPANHA", en: "CAMPAIGN" },
      theme: "dark",
      /* TODO: texto da campanha — trocar pelo real */
      lede: { pt: "", en: "" },
      pieces: [
        { img: "assets/img/campanhas/polo/01.jpg", col: 2, span: 4, top: 0,  ratio: "4/5" },
        { img: "assets/img/campanhas/polo/02.jpg", col: 7, span: 4, top: 18, ratio: "4/5" },
        { img: "assets/img/campanhas/polo/03.jpg", col: 1, span: 5, top: 6,  ratio: "4/5" },
        { img: "assets/img/campanhas/polo/04.jpg", col: 8, span: 4, top: 0,  ratio: "4/5" },
        { img: "assets/img/campanhas/polo/05.jpg", col: 3, span: 5, top: 10, ratio: "4/5" },
        { img: "assets/img/campanhas/polo/06.jpg", col: 9, span: 3, top: 4,  ratio: "4/5" }
      ]
    },
    {
      slug: "selecao-brasileira",
      idx: "02",
      title: "SELEÇÃO BRASILEIRA",
      year: { pt: "", en: "" },
      theme: "dark",
      /* TODO: texto da campanha — trocar pelo real */
      lede: { pt: "", en: "" },
      pieces: [
        { img: "assets/img/campanhas/selecao-brasileira/01.jpg", col: 1, span: 5, top: 0,  ratio: "4/5" },
        { img: "assets/img/campanhas/selecao-brasileira/02.jpg", col: 7, span: 4, top: 16, ratio: "4/5" },
        { img: "assets/img/campanhas/selecao-brasileira/03.jpg", col: 2, span: 4, top: 8,  ratio: "4/5" },
        { img: "assets/img/campanhas/selecao-brasileira/04.jpg", col: 8, span: 4, top: 0,  ratio: "4/5" },
        { img: "assets/img/campanhas/selecao-brasileira/05.jpg", col: 3, span: 5, top: 12, ratio: "4/5" },
        { img: "assets/img/campanhas/selecao-brasileira/06.jpg", col: 9, span: 3, top: 2,  ratio: "4/5" }
      ]
    }
  ]
};
