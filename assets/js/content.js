/* ------------------------------------------------------------------
   RA2 — CONTEÚDO
   Este é o único arquivo que você precisa editar no dia a dia.

   TEXTOS BILÍNGUES
   Todo texto que aparece na tela pode ser um objeto { pt: "...", en: "..." }.
   Se o inglês faltar, o site cai no português automaticamente.

   As fotos vivem em:
     assets/img/desfiles/<desfile>/             → DESFILES
     assets/img/lookbook/<lookbook>/            → LOOKBOOK
     assets/img/campanhas/<campanha>/           → ARQUIVO
     assets/img/studio/                         → O STUDIO
     assets/img/conteudos/                      → fundos da home e do contato

   Sobre `col` e `span`: a página usa uma grade de 12 colunas.
   `col` = coluna onde a peça começa (1 a 12), `span` = quantas ocupa.
   `top` = deslocamento vertical em vh, para o efeito "espalhado".
------------------------------------------------------------------- */

/* Grade padrão de 6 fotos espalhadas, usada enquanto uma página ainda não
   tem layout próprio. Basta colocar 01.jpg … 06.jpg na pasta indicada. */
function grade6(pasta) {
  var p = "assets/img/" + pasta + "/";
  return [
    { img: p + "01.jpg", col: 2, span: 4, top: 0,  ratio: "4/5" },
    { img: p + "02.jpg", col: 7, span: 4, top: 18, ratio: "4/5" },
    { img: p + "03.jpg", col: 1, span: 5, top: 6,  ratio: "4/5" },
    { img: p + "04.jpg", col: 8, span: 4, top: 0,  ratio: "4/5" },
    { img: p + "05.jpg", col: 3, span: 5, top: 10, ratio: "4/5" },
    { img: p + "06.jpg", col: 9, span: 3, top: 4,  ratio: "4/5" }
  ];
}

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

  /* --- O STUDIO --------------------------------------------------- */
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

  /* --- DESFILES ---------------------------------------------------
     A ordem aqui é a ordem do menu. `year` aparece entre parênteses. */
  collections: [
    {
      slug: "raizes",
      title: "RAÍZES",
      year: "SS27",
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
        { img: "assets/img/desfiles/raizes/01.jpg", col: 2,  span: 3, top: 0,  ratio: "4/5", caption: "Look 01" },
        { img: "assets/img/desfiles/raizes/02.jpg", col: 6,  span: 3, top: 16, ratio: "4/5", caption: "Look 02" },
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
        { img: "assets/img/desfiles/raizes/03.jpg", col: 1,  span: 5, top: 4,  ratio: "4/5", caption: "Look 03" },
        { img: "assets/img/desfiles/raizes/04.jpg", col: 7,  span: 4, top: 22, ratio: "4/5", caption: "Look 04" },
        { img: "assets/img/desfiles/raizes/05.jpg", col: 3,  span: 4, top: 0,  ratio: "4/5", caption: "Look 05" },
        { img: "assets/img/desfiles/raizes/06.jpg", col: 9,  span: 3, top: 10, ratio: "4/5", caption: "Look 06" },
        { img: "assets/img/desfiles/raizes/07.jpg", col: 2,  span: 4, top: 6,  ratio: "4/5", caption: "Look 07" },
        { img: "assets/img/desfiles/raizes/08.jpg", col: 7,  span: 5, top: 0,  ratio: "4/5", caption: "Look 08" },
        { img: "assets/img/desfiles/raizes/09.jpg", col: 1,  span: 3, top: 14, ratio: "4/5", caption: "Look 09" },
        { img: "assets/img/desfiles/raizes/10.jpg", col: 5,  span: 4, top: 2,  ratio: "4/5", caption: "Look 10" },
        { img: "assets/img/desfiles/raizes/11.jpg", col: 10, span: 3, top: 20, ratio: "4/5", caption: "Look 11" },
        { img: "assets/img/desfiles/raizes/12.jpg", col: 3,  span: 5, top: 4,  ratio: "4/5", caption: "Look 12" }
      ]
    },
    {
      slug: "leveza",
      title: "LEVEZA",
      year: "SS26",
      theme: "dark",
      /* TODO: texto e fotos */
      lede: "",
      pieces: grade6("desfiles/leveza")
    },
    {
      slug: "40-mais-1",
      title: "40+1",
      year: "AW25",
      theme: "dark",
      /* TODO: texto e fotos */
      lede: "",
      pieces: grade6("desfiles/40-mais-1")
    }
  ],

  /* --- LOOKBOOK --------------------------------------------------- */
  lookbooks: [
    {
      slug: "polo",
      title: "POLO",
      year: "AW26",
      theme: "dark",
      /* TODO: texto do lookbook */
      lede: "",
      /* 22 fotos, na ordem dos arquivos originais (260428_PB_RA2_0115 → 1132).
         As editoriais — P&B (0286, 0328, 0632) e fundo marrom (0400, 0725, 0865) —
         ocupam mais colunas para quebrar o ritmo dos looks de corpo inteiro. */
      pieces: [
        { img: "assets/img/lookbook/polo/01.jpg", col: 2 , span: 3, top: 0 , ratio: "1200/1500" },  /* 0115 */
        { img: "assets/img/lookbook/polo/02.jpg", col: 6 , span: 3, top: 14, ratio: "1200/1600" },  /* 0177 */
        { img: "assets/img/lookbook/polo/03.jpg", col: 10, span: 3, top: 4 , ratio: "1200/1500" },  /* 0282 */
        { img: "assets/img/lookbook/polo/04.jpg", col: 1 , span: 5, top: 8 , ratio: "1200/1500" },  /* 0286 */
        { img: "assets/img/lookbook/polo/05.jpg", col: 8 , span: 3, top: 20, ratio: "1200/1500" },  /* 0317 */
        { img: "assets/img/lookbook/polo/06.jpg", col: 2 , span: 5, top: 2 , ratio: "1200/1500" },  /* 0328 */
        { img: "assets/img/lookbook/polo/07.jpg", col: 8 , span: 4, top: 16, ratio: "1200/1500" },  /* 0389 */
        { img: "assets/img/lookbook/polo/08.jpg", col: 1 , span: 5, top: 6 , ratio: "1200/1500" },  /* 0400 */
        { img: "assets/img/lookbook/polo/09.jpg", col: 7 , span: 3, top: 0 , ratio: "1200/1500" },  /* 0415 */
        { img: "assets/img/lookbook/polo/10.jpg", col: 10, span: 3, top: 18, ratio: "1200/1500" },  /* 0495 */
        { img: "assets/img/lookbook/polo/11.jpg", col: 2 , span: 3, top: 4 , ratio: "1200/1500" },  /* 0538 */
        { img: "assets/img/lookbook/polo/12.jpg", col: 6 , span: 4, top: 12, ratio: "1200/1500" },  /* 0609 */
        { img: "assets/img/lookbook/polo/13.jpg", col: 1 , span: 5, top: 0 , ratio: "1200/1500" },  /* 0632 */
        { img: "assets/img/lookbook/polo/14.jpg", col: 8 , span: 5, top: 16, ratio: "1200/1500" },  /* 0725 */
        { img: "assets/img/lookbook/polo/15.jpg", col: 1 , span: 3, top: 6 , ratio: "1200/1500" },  /* 0784 */
        { img: "assets/img/lookbook/polo/16.jpg", col: 4 , span: 3, top: 0 , ratio: "1200/1500" },  /* 0838 */
        { img: "assets/img/lookbook/polo/17.jpg", col: 8 , span: 5, top: 14, ratio: "1200/1500" },  /* 0865 */
        { img: "assets/img/lookbook/polo/18.jpg", col: 2 , span: 3, top: 4 , ratio: "1200/1500" },  /* 0880 */
        { img: "assets/img/lookbook/polo/19.jpg", col: 6 , span: 3, top: 12, ratio: "1200/1500" },  /* 0936 */
        { img: "assets/img/lookbook/polo/20.jpg", col: 10, span: 3, top: 2 , ratio: "1200/1500" },  /* 1024 */
        { img: "assets/img/lookbook/polo/21.jpg", col: 3 , span: 4, top: 8 , ratio: "1200/1500" },  /* 1077 */
        { img: "assets/img/lookbook/polo/22.jpg", col: 8 , span: 4, top: 0 , ratio: "1200/1500" }  /* 1132 */
      ]
    },
    {
      slug: "daylight",
      title: "DAYLIGHT",
      year: "SS26",
      theme: "dark",
      /* TODO: texto do lookbook */
      lede: "",
      /* 30 fotos, na ordem dos arquivos originais (251205_PB_RA2_2283 → 3624).
         Os closes e editoriais P&B ocupam mais colunas para quebrar o ritmo
         dos looks de corpo inteiro no fundo areia. */
      pieces: [
        { img: "assets/img/lookbook/daylight/01.jpg", col: 1 , span: 5, top: 0 , ratio: "1200/1601" },  /* 2283 */
        { img: "assets/img/lookbook/daylight/02.jpg", col: 8 , span: 3, top: 16, ratio: "1200/1690" },  /* 2288 */
        { img: "assets/img/lookbook/daylight/03.jpg", col: 2 , span: 3, top: 4 , ratio: "1200/1666" },  /* 2435 */
        { img: "assets/img/lookbook/daylight/04.jpg", col: 7 , span: 5, top: 10, ratio: "1200/1500" },  /* 2473 */
        { img: "assets/img/lookbook/daylight/05.jpg", col: 1 , span: 4, top: 6 , ratio: "1200/1669" },  /* 2490 */
        { img: "assets/img/lookbook/daylight/06.jpg", col: 6 , span: 3, top: 0 , ratio: "1200/1678" },  /* 2521 */
        { img: "assets/img/lookbook/daylight/07.jpg", col: 10, span: 3, top: 18, ratio: "1200/1689" },  /* 2567 */
        { img: "assets/img/lookbook/daylight/08.jpg", col: 2 , span: 5, top: 8 , ratio: "1200/1500" },  /* 2589 */
        { img: "assets/img/lookbook/daylight/09.jpg", col: 9 , span: 3, top: 0 , ratio: "1200/1647" },  /* 2620 */
        { img: "assets/img/lookbook/daylight/10.jpg", col: 1 , span: 3, top: 14, ratio: "1200/1674" },  /* 2736 */
        { img: "assets/img/lookbook/daylight/11.jpg", col: 5 , span: 3, top: 2 , ratio: "1200/1677" },  /* 2767 */
        { img: "assets/img/lookbook/daylight/12.jpg", col: 9 , span: 4, top: 10, ratio: "1200/1637" },  /* 2817 */
        { img: "assets/img/lookbook/daylight/13.jpg", col: 2 , span: 3, top: 0 , ratio: "1200/1681" },  /* 2872 */
        { img: "assets/img/lookbook/daylight/14.jpg", col: 6 , span: 3, top: 16, ratio: "1200/1662" },  /* 3004 */
        { img: "assets/img/lookbook/daylight/15.jpg", col: 10, span: 3, top: 4 , ratio: "1200/1701" },  /* 3011 */
        { img: "assets/img/lookbook/daylight/16.jpg", col: 1 , span: 4, top: 10, ratio: "1200/1670" },  /* 3048 */
        { img: "assets/img/lookbook/daylight/17.jpg", col: 6 , span: 3, top: 0 , ratio: "1200/1677" },  /* 3087 */
        { img: "assets/img/lookbook/daylight/18.jpg", col: 10, span: 3, top: 14, ratio: "1200/1656" },  /* 3128 */
        { img: "assets/img/lookbook/daylight/19.jpg", col: 2 , span: 3, top: 4 , ratio: "1200/1668" },  /* 3240 */
        { img: "assets/img/lookbook/daylight/20.jpg", col: 6 , span: 3, top: 12, ratio: "1200/1681" },  /* 3309 */
        { img: "assets/img/lookbook/daylight/21.jpg", col: 1 , span: 5, top: 8 , ratio: "1200/1500" },  /* 3376 */
        { img: "assets/img/lookbook/daylight/22.jpg", col: 8 , span: 4, top: 0 , ratio: "1200/1651" },  /* 3377 */
        { img: "assets/img/lookbook/daylight/23.jpg", col: 2 , span: 5, top: 6 , ratio: "1200/1500" },  /* 3378 */
        { img: "assets/img/lookbook/daylight/24.jpg", col: 9 , span: 3, top: 16, ratio: "1200/1629" },  /* 3472 */
        { img: "assets/img/lookbook/daylight/25.jpg", col: 1 , span: 5, top: 2 , ratio: "1200/1500" },  /* 3504 */
        { img: "assets/img/lookbook/daylight/26.jpg", col: 7 , span: 5, top: 14, ratio: "1200/1500" },  /* 3531 */
        { img: "assets/img/lookbook/daylight/27.jpg", col: 2 , span: 3, top: 6 , ratio: "1200/1685" },  /* 3550 */
        { img: "assets/img/lookbook/daylight/28.jpg", col: 6 , span: 3, top: 0 , ratio: "1200/1667" },  /* 3562 */
        { img: "assets/img/lookbook/daylight/29.jpg", col: 1 , span: 5, top: 10, ratio: "1200/1594" },  /* 3615 */
        { img: "assets/img/lookbook/daylight/30.jpg", col: 8 , span: 4, top: 2 , ratio: "1200/1629" }  /* 3624 */
      ]
    },
    {
      slug: "shadows",
      title: "SHADOWS",
      year: "AW25",
      theme: "dark",
      /* TODO: texto do lookbook */
      lede: "",
      /* 20 fotos, na ordem dos arquivos originais (RA2_LOOKBOOK16543 → 18291).
         As três em movimento (07–09) e os dois closes de capuz (15–16)
         ganham mais espaço para quebrar o ritmo dos looks de corpo inteiro. */
      pieces: [
        { img: "assets/img/lookbook/shadows/01.jpg", col: 2,  span: 3, top: 0,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/02.jpg", col: 6,  span: 3, top: 14, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/03.jpg", col: 10, span: 3, top: 4,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/04.jpg", col: 1,  span: 4, top: 8,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/05.jpg", col: 7,  span: 3, top: 20, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/06.jpg", col: 3,  span: 3, top: 2,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/07.jpg", col: 7,  span: 5, top: 6,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/08.jpg", col: 1,  span: 5, top: 10, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/09.jpg", col: 7,  span: 5, top: 18, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/10.jpg", col: 2,  span: 3, top: 4,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/11.jpg", col: 6,  span: 3, top: 16, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/12.jpg", col: 10, span: 3, top: 0,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/13.jpg", col: 1,  span: 4, top: 10, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/14.jpg", col: 7,  span: 4, top: 2,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/15.jpg", col: 2,  span: 5, top: 8,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/16.jpg", col: 8,  span: 5, top: 22, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/17.jpg", col: 1,  span: 3, top: 6,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/18.jpg", col: 5,  span: 4, top: 0,  ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/19.jpg", col: 10, span: 3, top: 14, ratio: "2/3" },
        { img: "assets/img/lookbook/shadows/20.jpg", col: 4,  span: 4, top: 6,  ratio: "2/3" }
      ]
    }
  ],

  /* --- ARQUIVO: campanhas ----------------------------------------- */
  campaigns: [
    {
      slug: "polo",
      title: { pt: "POLO CAMPANHA", en: "POLO CAMPAIGN" },
      year: "",
      theme: "dark",
      /* TODO: texto da campanha */
      lede: "",
      /* 19 fotos, na ordem dos arquivos originais (2026-03-08 RICARDO ALMEIDA 1155 → 3524).
         As horizontais ocupam 6–7 colunas; 1515 e 1516 ficam lado a lado, como díptico. */
      pieces: [
        { img: "assets/img/campanhas/polo/01.jpg", col: 2 , span: 4, top: 0 , ratio: "1200/1583" },  /* 1155 */
        { img: "assets/img/campanhas/polo/02.jpg", col: 8 , span: 4, top: 14, ratio: "1200/1799" },  /* 1271 */
        { img: "assets/img/campanhas/polo/03.jpg", col: 4 , span: 5, top: 4 , ratio: "1200/1799" },  /* 1407 */
        { img: "assets/img/campanhas/polo/04.jpg", col: 1 , span: 6, top: 6 , ratio: "1600/1067" },  /* 1515 */
        { img: "assets/img/campanhas/polo/05.jpg", col: 7 , span: 6, top: 6 , ratio: "1600/1067" },  /* 1516 */
        { img: "assets/img/campanhas/polo/06.jpg", col: 2 , span: 3, top: 10, ratio: "1200/1799" },  /* 1725 */
        { img: "assets/img/campanhas/polo/07.jpg", col: 6 , span: 3, top: 0 , ratio: "1200/1799" },  /* 1913 */
        { img: "assets/img/campanhas/polo/08.jpg", col: 10, span: 3, top: 16, ratio: "1200/1799" },  /* 1977 */
        { img: "assets/img/campanhas/polo/09.jpg", col: 1 , span: 4, top: 4 , ratio: "1200/1645" },  /* 2001 */
        { img: "assets/img/campanhas/polo/10.jpg", col: 6 , span: 3, top: 14, ratio: "1200/1799" },  /* 2061 */
        { img: "assets/img/campanhas/polo/11.jpg", col: 10, span: 3, top: 2 , ratio: "1200/1799" },  /* 2087 */
        { img: "assets/img/campanhas/polo/12.jpg", col: 1 , span: 4, top: 8 , ratio: "1200/1799" },  /* 2162 */
        { img: "assets/img/campanhas/polo/13.jpg", col: 6 , span: 7, top: 0 , ratio: "1600/1067" },  /* 2302 */
        { img: "assets/img/campanhas/polo/14.jpg", col: 4 , span: 6, top: 10, ratio: "1600/1067" },  /* 2646 */
        { img: "assets/img/campanhas/polo/15.jpg", col: 1 , span: 7, top: 6 , ratio: "1600/1067" },  /* 2759 */
        { img: "assets/img/campanhas/polo/16.jpg", col: 9 , span: 4, top: 0 , ratio: "1200/1799" },  /* 3073 */
        { img: "assets/img/campanhas/polo/17.jpg", col: 1 , span: 6, top: 4 , ratio: "1600/1067" },  /* 3399 */
        { img: "assets/img/campanhas/polo/18.jpg", col: 8 , span: 4, top: 14, ratio: "1200/1689" },  /* 3514 */
        { img: "assets/img/campanhas/polo/19.jpg", col: 4 , span: 4, top: 6 , ratio: "1200/1799" }  /* 3524 */
      ]
    },
    {
      slug: "selecao-brasileira",
      title: "SELEÇÃO BRASILEIRA",
      year: "",
      theme: "dark",
      /* TODO: texto e fotos */
      lede: "",
      pieces: grade6("campanhas/selecao-brasileira")
    }
  ]
};
