import type { ArticleCopy } from './articles';

/**
 * Brazilian Portuguese articles.
 *
 * Brazil, Indonesia and the Philippines outrank most of Europe in this site's
 * impressions, and pt-BR is the largest language after English. Until this file
 * existed those readers were served English prose under a pt-BR hreflang.
 *
 * Terminology: "mapa astral" is what Brazilians actually search for, so it leads
 * and "mapa natal" follows as the synonym — the reverse of the English, where
 * "natal chart" is primary and "birth chart" the alias.
 */
export const ptBRArticles: Record<string, ArticleCopy> = {
  'what-is-a-natal-chart': {
    title: 'O que é um mapa astral?',
    excerpt:
      'O mapa astral é o desenho do céu a partir da sua data, hora e local de nascimento: planetas, Ascendente e doze casas. Não é o horóscopo diário do signo solar nem um teste de personalidade.',
    sections: [
      {
        heading: 'O que é um mapa astral?',
        paragraphs: [
          'O mapa astral — também chamado de mapa natal — é o desenho do Sistema Solar visto de um lugar em um instante. Você informa três dados: a data de nascimento, a hora do relógio e o local geográfico. A partir disso o calculador deriva a longitude eclíptica de cada planeta, o grau que subia no horizonte leste (o Ascendente) e a divisão do céu local em doze casas. O SideraChart é esse calculador: zodíaco tropical, casas de Placidus por padrão, posições vindas de uma efeméride de classe VSOP87 através da astronomy-engine.',
          'O mapa é um diagrama de ênfases, não um veredito. Cada planeta é uma função. Cada signo é um estilo dessa função. Cada casa é o setor da vida onde a função aparece. Os aspectos são as distâncias angulares entre essas funções. Lidos em conjunto, mostram quais partes do mapa falam mais alto. Não dizem se você deve trocar de emprego, terminar um relacionamento ou tomar uma decisão médica.',
        ],
      },
      {
        heading: 'O que é preciso: data, hora e local de nascimento',
        paragraphs: [
          'A data define em que dia da órbita da Terra você nasceu, o que já basta para o Sol e os planetas lentos caírem no signo certo. A hora converte o horário civil em Tempo Universal usando as regras de fuso da IANA vigentes naquela data, incluindo horários de verão históricos. O local fornece latitude e longitude para que o horizonte daquele ponto — e portanto o Ascendente e as cúspides das casas — possa ser calculado.',
          'Sem a hora você ainda tem os signos dos planetas. O que você não tem é um Ascendente confiável nem um sistema de casas. O SideraChart permite marcar a hora como desconhecida e então desenha apenas os planetas. Chutar meio-dia e tratar as casas como fato é pior do que uma lacuna honesta. Se a certidão de nascimento traz a hora, use-a; se os parentes divergem em meia hora, trate o Ascendente como provisório.',
        ],
      },
      {
        heading: 'Planetas, signos, casas e aspectos',
        paragraphs: [
          'Os planetas (do Sol a Plutão, mais a Lua) ficam sobre a eclíptica. O signo é a fatia de 30° do zodíaco tropical em que essa longitude cai. A casa é o setor local em que essa longitude cai depois que o Ascendente é conhecido. Um planeta em Áries na décima casa não diz a mesma coisa que um planeta em Áries na quarta: mesmo estilo, setor diferente.',
          'Aspectos são os ângulos com nome entre duas longitudes: conjunção (0°), sextil (60°), quadratura (90°), trígono (120°), oposição (180°). O SideraChart desenha esses cinco com orbes de 8° para conjunção e oposição, 6° para quadratura e trígono e 4° para sextil. Orbes mais fechados falam mais alto. As linhas coloridas da roda e a tabela abaixo dela mostram os mesmos contatos.',
        ],
      },
      {
        heading: 'O que o mapa astral não é',
        paragraphs: [
          'O mapa astral não é a coluna de horóscopo diário escrita para doze signos solares. Não é astrologia védica ou sideral, que mede a partir de um ponto zero estelar hoje afastado uns 24° do equinócio tropical. Não é astrologia chinesa. O SideraChart não calcula esses sistemas e não usa o Swiss Ephemeris.',
          'Também não é um teste de personalidade que devolve um tipo. Duas pessoas com o mesmo signo solar podem ter Luas diferentes, ascendentes diferentes, ênfase de casas diferente e padrões de aspectos diferentes. Se você só conhece o Sol, tem uma coordenada. O mapa é o resto do sistema de coordenadas.',
        ],
      },
      {
        heading: 'Como o SideraChart calcula o mapa',
        paragraphs: [
          'O SideraChart resolve o local de nascimento em latitude e longitude, converte a hora civil em Tempo Universal e então lê as longitudes tropicais aparentes na astronomy-engine (classe VSOP87). O zodíaco tropical começa no equinócio de março, que é a convenção ocidental. Longitudes siderais não são exibidas. As casas são Placidus por padrão porque a maior parte da bibliografia ocidental publicada pressupõe esse sistema; Signos Inteiros está disponível quando você precisa de signos iguais a partir do signo do Ascendente.',
          'Placidus divide tempo de ascensão, então as casas ficam desiguais e o sistema perde confiabilidade acima de cerca de 66° de latitude. Para nascimentos polares, Signos Inteiros é a grade mais honesta. As longitudes planetárias são calculadas de qualquer modo. Salve o mapa se quiser o relatório escrito e o painel diário; os calculadores públicos continuam gratuitos sem conta.',
        ],
      },
      {
        heading: 'Como usar o mapa depois de tê-lo',
        paragraphs: [
          'Comece pelo trio principal: Sol, Lua e Ascendente. Depois leia as casas ocupadas, depois os aspectos mais fechados. Casas vazias são cômodos sem ninguém sentado dentro, não órgãos ausentes. O PNG da roda é um instantâneo; as tabelas são o instrumento. Primeiro os números, depois a camada escrita.',
          'Se mais tarde você comparar o mapa astral com o céu de hoje, isso é trânsito — assunto de outro artigo. O painel do SideraChart guarda essas sobreposições diárias ao meio-dia do fuso natal, para que a nota do dia permaneça estável. Nada disso reescreve o mapa astral. O mapa astral é a linha de base que fica; os trânsitos são o clima que passa sobre ela.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mapa astral e horóscopo são a mesma coisa?',
        a: 'Não. O mapa astral é um desenho calculado a partir da sua data, hora e local de nascimento. Horóscopo, na fala do dia a dia, costuma ser a coluna do signo solar para o dia, a semana ou o ano. O mapa é a linha de base; o horóscopo é uma leitura posterior e muito mais rasa.',
      },
      {
        q: 'Preciso da hora exata de nascimento para o mapa astral?',
        a: 'Você precisa dela para o Ascendente e para as casas. Sem a hora, os signos dos planetas continuam utilizáveis. O SideraChart calcula os planetas e omite o signo ascendente se você marcar a hora como desconhecida.',
      },
      {
        q: 'Que zodíaco o mapa astral usa?',
        a: 'Os mapas ocidentais, o do SideraChart incluído, usam o zodíaco tropical medido a partir do equinócio da primavera. Mapas siderais (védicos) usam um ponto zero estelar e hoje aparecem cerca de um signo deslocados em muitas posições.',
      },
      {
        q: 'Duas pessoas nascidas no mesmo dia podem ter mapas diferentes?',
        a: 'Podem. Hora e local mudam o Ascendente, as casas e o grau da Lua. Até o mesmo hospital com uma hora de diferença pode produzir outro signo ascendente.',
      },
    ],
  },
  'natal-chart-vs-horoscope': {
    title: 'Mapa astral ou horóscopo?',
    excerpt:
      'O mapa astral é o desenho do seu céu de nascimento a partir de data, hora e local. O horóscopo costuma ser uma coluna de signo solar. São leituras diferentes e não devem ser trocadas uma pela outra.',
    sections: [
      {
        heading: 'Mapa astral ou horóscopo?',
        paragraphs: [
          'As pessoas digitam "mapa astral ou horóscopo" porque as duas palavras são usadas para dizer "astrologia", e elas não nomeiam a mesma coisa. O mapa astral é um diagrama calculado do céu a partir da sua data, hora e local de nascimento: planetas sobre a eclíptica, um Ascendente se a hora for conhecida, casas e aspectos. Horóscopo, no sentido que a maioria dos resultados de busca tem em mente, é uma previsão curta escrita para um signo solar — de Áries a Peixes — para um dia, uma semana ou um mês.',
          'Dá para extrair um parágrafo em estilo de horóscopo a partir de um mapa astral. Não dá para reconstruir um mapa astral a partir de uma coluna de horóscopo. Um é um desenho com coordenadas. O outro é um texto dirigido a doze públicos. O SideraChart calcula o desenho. Não publica colunas de signo solar, semanais ou de qualquer outro tipo.',
        ],
      },
      {
        heading: 'O que "horóscopo" normalmente quer dizer',
        paragraphs: [
          'Em jornais e aplicativos, o horóscopo é indexado pelo signo solar. Quem escreve pode olhar a Lua, Mercúrio ou um trânsito àquele signo e então redigir doze textinhos. O textinho não conhece a sua Lua, o seu Ascendente, as cúspides das suas casas, nem se o seu Sol está na primeira ou na décima casa. Não tem como. Esses dados exigem hora e local de nascimento.',
          'No uso astronômico antigo, "horóscopo" designava o próprio Ascendente — o marcador da hora. Esse sentido sobrevive dentro da palavra, e é por isso que a confusão gruda. Se alguém pede "o seu horóscopo", pode estar falando do signo solar, do ascendente ou da roda inteira. Pergunte qual. Depois calcule o mapa astral se quiser o céu de verdade.',
        ],
      },
      {
        heading: 'O que o mapa astral traz e o horóscopo não',
        paragraphs: [
          'O mapa astral lista todos os corpos principais: Sol, Lua, Mercúrio, Vênus, Marte, Júpiter, Saturno, Urano, Netuno, Plutão. Coloca cada um em um signo tropical. Com a hora de nascimento, também os coloca em casas e fixa o Ascendente e o Meio do Céu. Depois lista os aspectos maiores dentro de orbes de 8° / 6° / 4°. É bastante estrutura em comparação com "Touro, esta semana".',
          'Duas pessoas do mesmo signo solar podem ter Luas opostas, ascendentes diferentes e nenhum aspecto em comum. A coluna de horóscopo trata as duas como o mesmo leitor. O mapa astral não. Se você só leu horóscopos de signo solar até hoje, o mapa vai parecer detalhado demais. Esse detalhe é justamente o motivo de calcular um.',
        ],
      },
      {
        heading: 'Coluna de signo solar contra a roda completa',
        paragraphs: [
          'Seu signo solar é uma coordenada: o signo tropical que o Sol ocupava na sua data de nascimento. É o dado mais fácil de saber, porque o Sol fica cerca de um mês em cada signo e raramente exige relógio preciso. Também é o dado que os horóscopos usam como índice. Não é o mapa.',
          'A roda acrescenta a Lua (que troca de signo a cada dois dias e meio), o ascendente (que exige o minuto) e o resto dos planetas. O calculador de mapa astral do SideraChart desenha essa roda no zodíaco tropical com casas de Placidus por padrão. Compare com um horóscopo de revista e você verá por que as duas palavras não deveriam ser usadas como sinônimos.',
        ],
      },
      {
        heading: 'Por que os dois se confundem',
        paragraphs: [
          'A linguagem de propaganda mistura tudo. "Horóscopo grátis" muitas vezes significa "mapa astral grátis", ou o contrário. Nas redes se pergunta "qual é o seu horóscopo?" querendo dizer signo solar. Os buscadores herdam essa mistura. Se você chegou aqui por "mapa astral ou horóscopo", guarde a distinção: mapa = desenho calculado a partir dos dados de nascimento; horóscopo = normalmente um texto de signo solar.',
          'Uma leitura de trânsitos sobre o seu mapa salvo está mais perto de um horóscopo pessoal do que uma coluna de jornal, porque usa as suas posições reais. O painel diário do SideraChart guarda esses trânsitos ao meio-dia do fuso natal. Ainda assim, isso não é o mapa astral. O mapa astral não muda; o céu acima dele, sim.',
        ],
      },
      {
        heading: 'O que o SideraChart calcula',
        paragraphs: [
          'O SideraChart calcula mapas astrais, ferramentas de planeta por signo, sinastria e mapas compostos. As posições vêm da astronomy-engine (VSOP87), não do Swiss Ephemeris. O zodíaco é tropical, não sideral nem chinês. As casas são Placidus, a menos que você troque para Signos Inteiros. Hora de nascimento desconhecida: planetas sim, casas não.',
          'Se você quer um horóscopo de signo solar para a semana, este site é o instrumento errado. Se você quer o desenho que essas colunas vagamente fingem descrever, use o calculador de mapa astral com data, hora e local. Leia o mapa como uma descrição estruturada de ênfases. Não trate nenhum dos dois produtos como orientação médica, jurídica ou financeira.',
        ],
      },
    ],
    faq: [
      {
        q: 'Meu horóscopo é o meu signo solar?',
        a: 'No uso popular, sim: os horóscopos são arquivados por signo solar. Seu mapa astral inclui o signo solar mais Lua, ascendente, casas e aspectos. Eles respondem perguntas diferentes.',
      },
      {
        q: 'O horóscopo pode substituir o mapa astral?',
        a: 'Não. Uma coluna para doze signos não tem como codificar a sua hora, o seu local, a sua Lua ou as cúspides das suas casas. Calcule um mapa astral se quiser essas coordenadas.',
      },
      {
        q: 'O mapa astral prevê a minha semana?',
        a: 'O mapa astral é a linha de base. A linguagem de semana a semana pertence aos trânsitos sobre essa linha de base. O SideraChart guarda os trânsitos diários ao meio-dia do fuso natal; ainda assim, isso não é um horóscopo de jornal.',
      },
      {
        q: 'Por que alguns sites chamam o mapa astral de horóscopo?',
        a: 'O jargão antigo usava "horóscopo" para o Ascendente ou para a figura inteira. O marketing moderno reciclou a palavra para textos de signo solar. Veja se a página pede a hora de nascimento. Se pedir, está calculando um mapa.',
      },
    ],
  },
  'what-is-my-sun-sign': {
    title: 'Qual é o meu signo solar?',
    excerpt:
      'Seu signo solar é o signo do zodíaco tropical que o Sol ocupava na sua data de nascimento. Em geral você não precisa da hora. É uma posição, não o mapa astral inteiro.',
    sections: [
      {
        heading: 'Qual é o meu signo solar?',
        paragraphs: [
          'Seu signo solar é a fatia tropical de 30° que continha o Sol no seu nascimento. As pessoas perguntam "qual é o meu signo?" porque esse é o único dado astrológico que jornais, aplicativos e conversa de mesa têm em comum. Ele sai da data de nascimento. O Sol anda cerca de um grau por dia e troca de signo mais ou menos nas mesmas datas todo ano, com uma pequena variação perto das cúspides.',
          'O SideraChart mede o Sol no zodíaco tropical, a partir do equinócio de março, usando a astronomy-engine (VSOP87). É a prática ocidental. Um signo solar sideral (védico) pode hoje diferir em cerca de um signo, porque o ponto zero estelar precessou. Se um amigo em um aplicativo sideral relata outro Sol, vocês não estão olhando o mesmo sistema de coordenadas.',
        ],
      },
      {
        heading: 'Como o signo solar é calculado',
        paragraphs: [
          'O calculador converte a sua data e hora civis em Tempo Universal e então lê a longitude eclíptica aparente do Sol. O signo é essa longitude dividida em doze blocos de 30° a partir de 0° de Áries (o equinócio). Num dia de cúspide — quando o Sol troca de signo — a hora do relógio e o fuso decidem de que lado você está. Esses são os únicos dias em que "eu sou de cúspide" é uma questão de cálculo e não de estilo.',
          'O local quase não importa para o signo do Sol. A hora importa na cúspide e para o grau e a casa do Sol. Se você só quer o signo e não nasceu em data de troca, o aniversário basta. Se nasceu na virada, informe a hora real ou marque-a como desconhecida e trate o resultado como pendente até conseguir o horário.',
        ],
      },
      {
        heading: 'Por que o signo solar não é o mapa inteiro',
        paragraphs: [
          'O Sol é um corpo. O mapa astral tem ainda a Lua, Mercúrio, Vênus, Marte e os planetas exteriores, mais o Ascendente se você tiver a hora. Dois leoninos podem dividir o mesmo mês solar e mesmo assim não dividir Lua, ascendente ou padrão de casas. As descrições de signo solar sobrevivem porque são fáceis de indexar, não porque esgotam o céu.',
          'Leia o Sol como a trama diurna: o que você está fazendo quando é mais obviamente você mesmo no tempo público. Depois leia o resto. Um mapa que lista só o Sol é a manchete. As tabelas abaixo da roda do SideraChart são a matéria.',
        ],
      },
      {
        heading: 'Signo solar, signo lunar e ascendente',
        paragraphs: [
          'A Lua troca de signo a cada dois dias e meio, então muita gente nascida no mesmo mês solar não divide a Lua. O ascendente muda mais ou menos a cada duas horas e exige a hora e o local de nascimento. Juntos, os três formam o trio principal. Se você só conhece o Sol, conhece o mais lento dos três.',
          'Você não precisa da hora para um signo solar comum. Muitas vezes também não precisa dela para a Lua, a menos que ela tenha trocado de signo naquele dia. Para o ascendente, precisa sempre. As ferramentas específicas de Sol, Lua e ascendente do SideraChart são filtros sobre o mesmo motor do mapa astral completo. Use o mapa completo quando quiser também casas e aspectos.',
        ],
      },
      {
        heading: 'Cúspides, fusos e "eu sou de dois signos"',
        paragraphs: [
          'Não existe um décimo terceiro signo na prática tropical, e não existe dupla cidadania oficial na fronteira. No minuto do nascimento o Sol está em um signo ou no outro. Se você não tem a hora em uma data de cúspide, diga isso. Não faça a média de dois signos para montar uma identidade personalizada e depois tratá-la como fato calculado.',
          'O histórico de fusos importa mais do que se imagina. Um nascimento registrado às 23:40 numa cidade que ainda estava no horário de verão dá um Tempo Universal diferente da mesma leitura de relógio no inverno. O SideraChart usa as regras da IANA para aquela data. Se um papel antigo usou outro deslocamento, o grau do Sol pode mudar; numa cúspide, o signo também.',
        ],
      },
      {
        heading: 'Descobrindo o seu signo solar no SideraChart',
        paragraphs: [
          'Informe a data de nascimento e acrescente hora e local se os tiver. A linha do Sol na tabela traz o signo e o grau. A roda coloca o glifo solar naquela longitude. Os aspectos ao Sol usam os mesmos orbes do resto do mapa: 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil.',
          'Salve o mapa astral se quiser o relatório escrito e o painel diário. Os trânsitos ao seu Sol natal são clima posterior, guardado ao meio-dia do fuso natal. Eles não mudam o signo solar natal. O signo solar é um fato de nascimento. Todo o resto é leitura.',
        ],
      },
    ],
    faq: [
      {
        q: 'Dá para saber meu signo solar sem a hora de nascimento?',
        a: 'Em geral, sim. O Sol fica cerca de um mês em cada signo. Você só precisa da hora no dia do calendário em que ele troca de signo, ou se quiser a casa do Sol.',
      },
      {
        q: 'Por que meu signo solar é outro num aplicativo védico?',
        a: 'Aplicativos védicos normalmente usam o zodíaco sideral. O SideraChart usa longitudes tropicais a partir do equinócio. A diferença hoje é de cerca de 24°, o que muitas vezes joga o Sol para o signo anterior.',
      },
      {
        q: 'E se eu nasci na cúspide?',
        a: 'No minuto do nascimento o Sol ainda está em um único signo tropical. Informe uma hora precisa. Se a hora for desconhecida, o signo não está resolvido e não deve ser forçado.',
      },
      {
        q: 'O signo solar é a posição mais importante?',
        a: 'É a mais famosa, não automaticamente a mais alta. Uma Lua bem fechada ou uma casa lotada podem dominar um mapa cujo Sol é discreto.',
      },
    ],
  },
  'sun-moon-rising': {
    title: 'Sol, Lua e ascendente: o trio principal',
    excerpt:
      'O trio principal é Sol, Lua e ascendente. O Sol vem da data, a Lua da data mais uma conferida na hora, o ascendente só com hora e local de nascimento. Leia os três juntos.',
    sections: [
      {
        heading: 'Sol, Lua e ascendente: o trio principal',
        paragraphs: [
          'Sol, Lua e ascendente são chamados de trio principal porque são as três posições que as pessoas de fato usam quando conversam, e porque cada uma corre em um relógio diferente. O Sol precisa de uma data. A Lua precisa de uma data e, em dias rápidos, de uma hora. O ascendente precisa de data, hora e local. Se você tem só um dos três, não tem o conjunto.',
          'Não é um ranking de importância espiritual. São três coordenadas que descrevem andamentos diferentes: o percurso anual do Sol, o percurso mensal da Lua e a rotação diária da Terra sob a eclíptica. O SideraChart calcula os três com o mesmo motor tropical baseado em VSOP87. O ascendente é omitido quando a hora de nascimento é desconhecida.',
        ],
      },
      {
        heading: 'O Sol: a coordenada lenta e pública',
        paragraphs: [
          'O signo do Sol é a fatia tropical que ele ocupava no nascimento. Muda cerca de uma vez por mês. É o índice dos horóscopos de jornal e a resposta a "qual é o seu signo?" na conversa informal. No mapa astral continua sendo apenas uma longitude. Diz o estilo da função solar — como você ocupa o tempo diurno — e não o resto do céu.',
          'Você raramente precisa de relógio preciso para o signo do Sol. Precisa dele para a casa do Sol e, em datas de cúspide, para o próprio signo. Se estiver montando o trio principal, informe a hora real de qualquer forma, para que o grau do Sol se alinhe com os aspectos à Lua e ao Ascendente.',
        ],
      },
      {
        heading: 'A Lua: o corpo rápido',
        paragraphs: [
          'A Lua anda cerca de 13° por dia e troca de signo a cada dois dias e meio. É por isso que duas pessoas nascidas no mesmo mês de signo solar muitas vezes não dividem a Lua. O signo lunar descreve o clima mais veloz do mapa: apetite, sono, as horas em que ninguém está avaliando. Não é diagnóstico médico nem rótulo de transtorno de humor.',
          'Sem hora de nascimento, o signo da Lua costuma continuar correto. O grau e a casa, não. Se a Lua trocou de signo no seu aniversário, uma hora desconhecida deixa a própria Lua sem resolver. Marque a hora como desconhecida no SideraChart em vez de inventar meio-dia e defender o grau.',
        ],
      },
      {
        heading: 'O ascendente: o horizonte leste',
        paragraphs: [
          'O ascendente, ou Ascendente, é o grau do zodíaco que subia no horizonte leste no minuto do nascimento. É um ângulo local, não um planeta. Depende de latitude, longitude e hora do relógio. O Ascendente anda cerca de um grau a cada quatro minutos, então um erro de vinte minutos pode trocar o signo.',
          'As casas em Placidus (padrão do SideraChart) começam nesse ângulo. Sem ascendente confiável não há casas confiáveis. Se você não tem a hora, deixe o Ascendente de fora. Um ascendente chutado desloca todas as linhas de "planeta na casa" que vêm depois dele.',
        ],
      },
      {
        heading: 'Por que se leem os três juntos',
        paragraphs: [
          'Uma leitura só do Sol é a manchete. Acrescentar a Lua diz o que o mapa faz quando ninguém está dando nota. Acrescentar o ascendente diz por que porta o mapa entra — primeiras impressões, o corpo no espaço, a grade das casas. Os três podem rimar (tudo fogo) ou discutir (Sol em Capricórnio, Lua em Áries, ascendente em Gêmeos). A discussão é informação.',
          'Os aspectos entre o trio principal importam mais do que a química de slogan. Uma quadratura Sol-Lua dentro de um orbe de 6° é uma afirmação mais fechada do que "fogo e água". Os orbes do SideraChart são 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Olhe a tabela, não a compatibilidade de meme.',
        ],
      },
      {
        heading: 'Como calcular o trio principal',
        paragraphs: [
          'Use o calculador de mapa astral com data, hora e local. Leia primeiro as linhas do Sol, da Lua e do Ascendente, depois o resto. As ferramentas específicas de Sol, Lua e ascendente do SideraChart são o mesmo motor com uma exibição mais estreita. Só zodíaco tropical; nem sideral, nem chinês. Hora desconhecida: você ainda consegue listar Sol e, em geral, Lua; ascendente, não.',
          'Depois que o mapa astral está salvo, o painel diário sobrepõe os trânsitos ao meio-dia do fuso natal. Esses trânsitos conversam com o trio principal, entre outros pontos. Não o substituem. O trio principal é fato de nascimento. Os trânsitos são o céu posterior.',
          'Se as três posições discordarem, não escolha uma favorita e descarte as outras. Escreva as três em uma frase: Sol neste signo, Lua naquele signo, este signo ascendendo. Depois abra a tabela de aspectos. Essa frase mais o orbe mais fechado já são mais mapa astral do que qualquer coluna de signo solar.',
        ],
      },
    ],
    faq: [
      {
        q: 'O que é o trio principal na astrologia?',
        a: 'Signo solar, signo lunar e ascendente (Ascendente). Eles correm em relógios anual, mensal e diário. Para o ascendente você precisa de hora e local de nascimento.',
      },
      {
        q: 'Qual dos três é o mais importante?',
        a: 'Nenhum vem em primeiro por decreto. O Sol é o mais famoso. A Lua é mais rápida. O ascendente define as casas. Leia os aspectos mais fechados entre eles antes de fazer ranking.',
      },
      {
        q: 'Dá para saber meu trio principal sem a hora de nascimento?',
        a: 'Sol, em geral sim; Lua, em geral sim, exceto em dias de troca de signo; ascendente, não. O SideraChart omite o Ascendente quando a hora é marcada como desconhecida.',
      },
      {
        q: 'O ascendente é a mesma coisa que o signo solar?',
        a: 'Não. O Sol é a longitude de um corpo. O ascendente é o grau da eclíptica no horizonte leste. Só coincidem por acaso, e mesmo assim são objetos diferentes.',
      },
    ],
  },
  'rising-sign': {
    title: 'Qual é o meu ascendente?',
    excerpt:
      'Seu ascendente é o grau do zodíaco no horizonte leste no nascimento — o Ascendente. Ele exige hora e local de nascimento precisos. Sem a hora de nascimento, deixe-o de fora.',
    sections: [
      {
        heading: 'Qual é o meu ascendente?',
        paragraphs: [
          'Seu ascendente, ou Ascendente, é o grau do zodíaco tropical que subia a leste no minuto em que você nasceu. Não é um planeta. É um ângulo local formado pela rotação da Terra, pela sua latitude e longitude e pelo relógio. Duas pessoas nascidas na mesma hora em cidades diferentes não dividem o Ascendente. Duas pessoas nascidas na mesma cidade com uma hora de diferença também costumam não dividir.',
          'As pessoas buscam "qual é o meu ascendente?" porque a astrologia das redes o trata como uma segunda identidade ao lado do Sol. No instrumento ele é mais específico do que isso: é o tiro de largada do sistema de casas e o grau que descreve como o mapa encontra o mundo primeiro — corpo, entrada, primeira impressão. Não é uma máscara que se veste para estranhos, e não é mais importante que o Sol por decreto.',
        ],
      },
      {
        heading: 'Por que o Ascendente exige a hora de nascimento',
        paragraphs: [
          'O Ascendente anda cerca de um grau a cada quatro minutos. Um erro de vinte minutos são cinco graus e pode trocar o signo, principalmente perto de uma fronteira. Um chute de duas horas dá outro ascendente na maior parte das vezes. O local também pesa: o mesmo Tempo Universal produz horizontes locais diferentes em Londres e em Kiev.',
          'O SideraChart converte a hora civil em Tempo Universal com as regras de fuso da IANA daquela data, depois calcula o tempo sideral local e o grau da eclíptica que o cruza. Se você marcar a hora como desconhecida, o calculador ainda devolve as longitudes planetárias e omite o Ascendente. Essa é a saída honesta. Inventar 12:00 e publicar um ascendente é outro produto, pior.',
        ],
      },
      {
        heading: 'Ascendente e signo solar',
        paragraphs: [
          'O signo solar vem da longitude eclíptica do Sol e é estável ao longo de um dia. O ascendente vem do horizonte e não é. Você pode saber seu Sol por um bolo de aniversário. Seu ascendente, não. Se um aplicativo lhe deu um ascendente sem pedir a hora, ele chutou, geralmente meio-dia, e não merece confiança.',
          'Quando os dois são conhecidos, leia-os como objetos diferentes. Sol em Virgem com ascendente em Escorpião é um padrão comum, não uma contradição. Um é a trama solar; o outro é a porta leste e a grade das casas. O calculador de ascendente do SideraChart é o motor natal filtrado nesse ângulo. O mapa completo ainda mostra por que o resto do céu está onde está.',
        ],
      },
      {
        heading: 'As casas começam no Ascendente',
        paragraphs: [
          'Em Placidus, o padrão do SideraChart, a casa I começa no Ascendente. As demais cúspides decorrem do tempo de ascensão, então as casas ficam desiguais. Signos Inteiros atribui a casa I ao signo inteiro que contém o Ascendente e depois conta os signos. De um jeito ou de outro, sem Ascendente não há casas honestas.',
          'Toda linha de "planeta na sétima casa" depende disso. Se o ascendente estiver errado, essas linhas estão erradas mesmo quando os signos dos planetas estão certos. É por isso que hora desconhecida significa planetas sim, casas não — e não "casas aproximadas". Latitudes polares acima de uns 66° também forçam o Placidus; ali, troque para Signos Inteiros em vez de insistir em cúspides quebradas.',
        ],
      },
      {
        heading: 'Horas aproximadas e mapas de meio-dia',
        paragraphs: [
          'Uma hora registrada como 04:00 pode querer dizer "por volta das quatro" ou "quatro em ponto". Trate horas redondas como um intervalo. Recalcule vinte minutos para cada lado e veja se o Ascendente permanece no mesmo signo. Se virar, você ainda não tem um ascendente; tem dois candidatos. Retificação — inventar uma hora que combine com a biografia — é outro ofício, fácil de abusar. O SideraChart não faz isso por você.',
          'A memória da família é mais frágil que uma certidão. Se os parentes discordam, prefira o documento. Se não houver documento, deixe a hora como desconhecida. Você ainda pode ler Sol, Lua (em geral), Mercúrio, Vênus, Marte e os planetas exteriores em signos, além dos aspectos entre eles. Isso já é um mapa astral menos o enquadramento local.',
        ],
      },
      {
        heading: 'Como calcular o seu ascendente',
        paragraphs: [
          'Use o calculador de ascendente do SideraChart ou o calculador completo de mapa astral. Informe data, hora e local. A linha do Ascendente traz o signo e o grau. As posições são tropicais, vindas da astronomy-engine (VSOP87), não do Swiss Ephemeris e não siderais. Os aspectos dos planetas ao Ascendente usam os mesmos orbes dos contatos entre planetas: 8° / 6° / 4°.',
          'Salve o mapa se quiser as casas, o relatório escrito e, mais tarde, os trânsitos no painel ao meio-dia do horário natal. Um ascendente sem o resto da roda continua sendo apenas um ângulo. Calcule-o com cuidado e devolva-o ao mapa a que pertence.',
        ],
      },
    ],
    faq: [
      {
        q: 'Dá para descobrir meu ascendente sem a hora de nascimento?',
        a: 'Não. O Ascendente é um grau do horizonte. Sem relógio e sem local, qualquer ascendente é chute. O SideraChart o omite quando a hora é desconhecida.',
      },
      {
        q: 'De quanto em quanto tempo o ascendente muda?',
        a: 'A cada duas horas, mais ou menos, um novo signo ascende, e o próprio grau anda cerca de 1° a cada quatro minutos. É por isso que os minutos importam.',
      },
      {
        q: 'Ascendente e Ascendente são a mesma coisa?',
        a: 'Sim. Ascendente costuma designar o signo do Ascendente. O Ascendente é o grau exato; o ascendente é o signo tropical em que esse grau cai.',
      },
      {
        q: 'Por que meu ascendente é outro em outro site?',
        a: 'Confira fuso, horário de verão, coordenadas e se o outro site é sideral. O SideraChart é tropical com Placidus por padrão. Um meio-dia de reserva também produz um Ascendente falso.',
      },
    ],
  },
  'moon-sign': {
    title: 'O que é o signo lunar?',
    excerpt:
      'Seu signo lunar é o signo tropical que a Lua ocupava no nascimento. Ele muda a cada dois dias e meio. A hora ainda importa para o grau, a casa e os dias de cúspide.',
    sections: [
      {
        heading: 'O que é o signo lunar?',
        paragraphs: [
          'Seu signo lunar é o signo do zodíaco tropical que continha a Lua quando você nasceu. As pessoas o procuram porque é a segunda posição mais famosa depois do Sol, e porque ele se move rápido o bastante para que duas pessoas com o mesmo Sol muitas vezes não o dividam. A Lua é uma longitude como a de qualquer outro planeta no mapa astral, só que mais veloz: cerca de 13° por dia, um signo novo a cada dois dias e meio.',
          'Na linguagem do mapa, a Lua descreve as horas em que ninguém está dando nota: apetite, sono, o que você faz quando não há plateia. Isso é uma função, não uma anotação médica nem um salvo-conduto. O SideraChart posiciona a Lua com o mesmo motor de classe VSOP87 (astronomy-engine) usado para o Sol, no zodíaco tropical, não no sideral.',
        ],
      },
      {
        heading: 'Quão rápido a Lua anda',
        paragraphs: [
          'Como a Lua é rápida, a hora de nascimento vale a pena mesmo quando o signo parece óbvio. O grau muda cerca de meio grau por hora. Os aspectos à Lua se fecham ou se abrem ao longo de uma manhã. A casa da Lua — quando você tem um Ascendente — sai errada se o relógio estiver errado, mesmo com o signo certo.',
          'Num dia de troca de signo, o relógio decide o próprio signo. Se você nasceu no dia em que a Lua deixou Touro e entrou em Gêmeos, uma hora desconhecida significa que você ainda não tem signo lunar. Não escolha o que preferir. Calcule, ou registre a lacuna.',
        ],
      },
      {
        heading: 'Signo lunar sem hora de nascimento',
        paragraphs: [
          'Se você tem a data e não a hora, o signo da Lua costuma continuar correto. O grau, não. A casa, também não, porque casas exigem o Ascendente e o Ascendente exige o minuto. A regra do SideraChart é a mesma do resto do mapa: hora desconhecida = planetas sim, casas não. Nessa frase, a Lua é um planeta.',
          'Um meio-dia de reserva é uma estimativa. Serve para uma primeira olhada no signo num dia calmo. Não é um fato do qual se deva argumentar quando o grau, a casa ou uma cúspide estão em jogo. Prefira a hora da certidão. Se não houver, diga que a hora é desconhecida e leia a Lua só em signo.',
        ],
      },
      {
        heading: 'Lua e Sol no mesmo mapa',
        paragraphs: [
          'O Sol é o índice mensal que todo mundo já conhece. A Lua é o clima interno mais rápido. Podem ocupar o mesmo signo (nascimento de Lua Nova), signos opostos (nascimento de Lua Cheia) ou qualquer coisa no meio. Os aspectos Sol-Lua usam os orbes do SideraChart: 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Uma quadratura Sol-Lua fechada fala mais alto do que dois memes de signo empilhados.',
          'O trio principal coloca a Lua entre Sol e ascendente. Você pode conhecer Sol e Lua (em geral) sem a hora. Não pode completar o trio sem ela. Se você veio só pelo signo lunar, ainda assim informe hora e local quando os tiver, para que o grau e os aspectos sejam honestos.',
        ],
      },
      {
        heading: 'Grau, casa e aspectos',
        paragraphs: [
          'O grau diz quão cedo ou tarde a Lua está no signo e quão perto está de um aspecto. A casa, com um Ascendente conhecido, diz qual setor da vida carrega essa função lunar. Outras casas vazias não anulam a Lua; apenas significam que a Lua não está sentada naqueles cômodos.',
          'O calculador de signo lunar do SideraChart é o motor natal filtrado em um corpo. O mapa astral completo acrescenta as casas (Placidus por padrão), o Ascendente e a tabela de aspectos. Os trânsitos diários à sua Lua natal ficam guardados no painel ao meio-dia do fuso natal. São céu posterior, não uma reescrita da Lua natal.',
        ],
      },
      {
        heading: 'Como calcular o seu signo lunar',
        paragraphs: [
          'Informe a data de nascimento, a hora se você a tiver, e o local. Leia a linha da Lua: signo, grau, casa se o relógio for conhecido. As posições são tropicais. Se outro aplicativo for sideral, a Lua pode aparecer no signo anterior; isso é a diferença do ayanamsha, não um defeito da astronomy-engine.',
          'Não trate o signo lunar como orientação financeira, jurídica ou médica. Use-o como coordenada. Se a hora estiver faltando, mantenha a coordenada grossa: só o signo. Se a hora estiver presente, use o grau e os aspectos. O método é esse.',
          'Compare com o Sol antes de parar. Sol e Lua no mesmo signo (nascimento de Lua Nova) tem outra textura que uma oposição de Lua Cheia. Ambos são astronomia comum. O SideraChart mostra o orbe; você decide se 6° ainda conta como alto. Os trânsitos lunares posteriores no painel são clima, guardados ao meio-dia do horário natal, não um novo signo lunar.',
        ],
      },
    ],
    faq: [
      {
        q: 'Como descubro meu signo lunar?',
        a: 'Calcule um mapa astral a partir de data, hora e local de nascimento. A linha da Lua traz o signo tropical. O calculador de signo lunar do SideraChart usa o mesmo motor do mapa completo.',
      },
      {
        q: 'Preciso da hora de nascimento para o signo lunar?',
        a: 'Em geral não para o signo. Você precisa da hora para o grau, para a casa e para qualquer aniversário em que a Lua tenha trocado de signo.',
      },
      {
        q: 'De quanto em quanto tempo a Lua troca de signo?',
        a: 'Mais ou menos a cada dois dias e meio. É por isso que pessoas nascidas no mesmo mês de signo solar costumam ter Luas diferentes.',
      },
      {
        q: 'Por que meu signo lunar é outro num site védico?',
        a: 'Os zodíacos siderais medem a partir de um ponto zero estelar hoje a cerca de 24° do equinócio tropical. O SideraChart é apenas tropical.',
      },
    ],
  },
  'venus-sign': {
    title: 'O que é o signo de Vênus?',
    excerpt:
      'Seu signo de Vênus é o signo tropical que Vênus ocupava no nascimento. Descreve estilo na atração, gosto e valores — uma coordenada natal, não um veredito amoroso.',
    sections: [
      {
        heading: 'O que é o signo de Vênus?',
        paragraphs: [
          'Seu signo de Vênus é o signo do zodíaco tropical que continha Vênus no seu nascimento. As pessoas buscam "o que é o signo de Vênus?" porque a astrologia popular usa Vênus como atalho para gosto, atração e o modo como você atribui preço ao que não vem em nota fiscal — arte, modos, as pessoas que você mantém por perto. No instrumento é uma longitude planetária, calculada como as outras a partir de data, hora e local de nascimento.',
          'O SideraChart posiciona Vênus no zodíaco tropical com a astronomy-engine (VSOP87). Não é uma Vênus sideral nem uma hora chinesa. O signo é a fatia de 30°. A casa, se você tiver a hora de nascimento, é o setor local. Os aspectos a Vênus usam orbes de 8° / 6° / 4°. Nada disso é um veredito sobre continuar ou não um relacionamento.',
        ],
      },
      {
        heading: 'O que Vênus mede no mapa astral',
        paragraphs: [
          'Vênus é o apetite do mapa por harmonia, valor e contato. Na prática, você a lê como o modo que gosta que um ambiente tenha, o que chama de bonito o bastante e como negocia proximidade. Isso é descritivo. Não diz com quem sair, se deve gastar dinheiro ou como resolver uma disputa jurídica. Fique com a função; largue a adivinhação.',
          'Vênus nunca se afasta muito do Sol, então o seu signo de Vênus costuma ser o mesmo do Sol ou um vizinho. Isso é astronomia, não destino. Sol em Gêmeos com Vênus em Touro é uma divisão comum: a trama solar em um estilo, Vênus no anterior. Leia os dois em vez de forçá-los num slogan só.',
        ],
      },
      {
        heading: 'Velocidade, retrogradação e trocas de signo',
        paragraphs: [
          'Vênus passa algumas semanas em um signo em movimento direto, e mais tempo quando estaciona ou fica retrógrada. Vênus retrógrada no nascimento é um fato natal sobre o movimento aparente, não uma maldição nem um transtorno de personalidade. Significa que naquele dia a longitude andava para trás ao longo da eclíptica. Calcule; não dramatize.',
          'Como Vênus é mais lenta que a Lua, em geral a data sozinha já dá o signo certo. A hora ainda define o grau, a casa e de que lado de uma cúspide você está. Hora desconhecida: planetas sim, casas não. Não invente meio-dia para colocar Vênus na sétima casa e depois usar essa casa como prova.',
        ],
      },
      {
        heading: 'Vênus e o trio principal',
        paragraphs: [
          'Sol, Lua e ascendente continuam sendo a primeira passada. Vênus é uma coordenada de especialista, lida depois dos três — a não ser que Vênus esteja empilhada sobre um ângulo ou travada num aspecto fechado com eles. Uma conjunção Vênus-Saturno dentro de 8° fala mais alto do que um texto de signo de Vênus. Olhe a tabela de aspectos.',
          'O ascendente continua exigindo o relógio. Se você veio só por Vênus e tem a hora, informe-a assim mesmo, para que casa e aspectos sejam reais. O calculador de signo de Vênus do SideraChart é o motor natal filtrado em um glifo. O mapa completo é o contexto que impede Vênus de engolir a leitura inteira.',
        ],
      },
      {
        heading: 'Casas e aspectos a Vênus',
        paragraphs: [
          'Com um Ascendente conhecido, Vênus em uma casa nomeia o setor da vida em que essa função de valorar fica evidente — quarta, sétima, décima e assim por diante. Casas vazias em outros lugares não são órgãos ausentes. Placidus é o padrão do SideraChart; Signos Inteiros é a alternativa quando você quer signos iguais ou está em latitude alta.',
          'Os aspectos maiores a Vênus são conjunção, sextil, quadratura, trígono e oposição. Orbes mais fechados se leem primeiro. Os trânsitos à Vênus natal aparecem depois no painel diário, guardados ao meio-dia do fuso natal. Esses trânsitos não mudam o signo natal de Vênus. São clima sobre um ponto fixo.',
        ],
      },
      {
        heading: 'Como descobrir o seu signo de Vênus',
        paragraphs: [
          'Informe data, hora e local de nascimento no SideraChart. Leia a linha de Vênus. Compare com o Sol: muitas vezes perto, às vezes igual. Se um aplicativo sideral discordar, você está olhando outro ponto zero, a cerca de 24° de distância. Coloque aquele aplicativo em tropical se quiser bater com este site.',
          'Use a posição como coordenada de um mapa astral, não como conselho amoroso. Se a hora for desconhecida, fique com Vênus em signo e pule a casa. Se a hora for conhecida, leia grau, casa e aspectos. Depois devolva Vênus ao lado do resto da roda.',
          'Se mais tarde você rodar uma sinastria, os contatos de Vênus entre dois mapas são outro desenho. Calcule primeiro a sua Vênus natal para saber que longitude as outras pessoas estão tocando. Os pontos médios de um mapa composto que incluem Vênus são um terceiro desenho ainda. Uma coordenada, três instrumentos — não misture as impressões.',
        ],
      },
    ],
    faq: [
      {
        q: 'Como descubro meu signo de Vênus?',
        a: 'Rode um mapa astral ou o calculador de signo de Vênus do SideraChart com a sua data de nascimento, e acrescente hora e local se os tiver. A linha de Vênus traz o signo tropical e o grau.',
      },
      {
        q: 'Vênus exige hora de nascimento exata?',
        a: 'Em geral não para o signo. Você precisa da hora para a casa, para o grau exato numa cúspide e para aspectos que se fecham ao longo do dia.',
      },
      {
        q: 'O que significa Vênus retrógrada no mapa astral?',
        a: 'Significa que a longitude eclíptica aparente de Vênus andava para trás no nascimento. Trate como um fato de movimento. Não é um veredito médico nem sobre relacionamentos.',
      },
      {
        q: 'Por que minha Vênus fica ao lado do meu signo solar?',
        a: 'Vênus permanece perto do Sol no céu, então os signos natais costumam ser iguais ou vizinhos. É geometria orbital, não um destino especial.',
      },
    ],
  },
  'mercury-sign': {
    title: 'O que é o signo de Mercúrio?',
    excerpt:
      'Seu signo de Mercúrio é o signo tropical que Mercúrio ocupava no nascimento. Mercúrio fica perto do Sol, então os signos coincidem ou são vizinhos. A hora ainda define casa e grau.',
    sections: [
      {
        heading: 'O que é o signo de Mercúrio?',
        paragraphs: [
          'Seu signo de Mercúrio é o signo do zodíaco tropical que continha Mercúrio no seu nascimento. As pessoas o consultam porque Mercúrio é a função de linguagem e trânsito do mapa: como você organiza informação, fala, se desloca e muda de ideia. É uma longitude no mapa astral, não uma medida de inteligência nem um diagnóstico de atenção.',
          'O SideraChart calcula Mercúrio no zodíaco tropical a partir da astronomy-engine (VSOP87), com casas de Placidus quando há hora de nascimento. Não usa o Swiss Ephemeris e não oferece um Mercúrio sideral ou védico. Se outro aplicativo discordar em cerca de um signo, verifique se ele é sideral antes de supor um erro.',
        ],
      },
      {
        heading: 'Mercúrio nunca longe do Sol',
        paragraphs: [
          'A órbita de Mercúrio o mantém perto do Sol no céu, então o seu signo de Mercúrio costuma ser o mesmo do Sol ou o vizinho. Sol em Leão com Mercúrio em Virgem é geometria comum. Aproveite essa divisão: a trama solar em um estilo, a função de falar e organizar no seguinte. Não comprima as duas num único meme.',
          'Como Mercúrio não é tão rápido quanto a Lua, a data muitas vezes resolve o signo. A hora ainda importa para o grau, para os aspectos que se formam durante o dia e para a casa. Hora desconhecida: você pode ficar com o signo de Mercúrio; não pode ficar com uma afirmação de Mercúrio em casa.',
        ],
      },
      {
        heading: 'Mercúrio retrógrado no nascimento',
        paragraphs: [
          'Mercúrio estaciona e fica retrógrado três ou quatro vezes por ano. Um Mercúrio retrógrado natal significa que a longitude aparente andava para trás na eclíptica no nascimento. É uma marca de movimento, não uma maldição sobre os seus e-mails nem um rótulo de dificuldade de aprendizagem. Calcule, anote, leia o signo e os aspectos ao redor.',
          'Períodos de retrogradação também fazem Mercúrio passar mais tempo em um signo ou voltar ao anterior. Dias de cúspide perto de estações merecem um relógio de verdade. Se a hora for desconhecida nessas datas, deixe o signo em aberto em vez de escolher a história que agrada.',
        ],
      },
      {
        heading: 'Mercúrio, casas e o trio principal',
        paragraphs: [
          'Leia Sol, Lua e ascendente primeiro, a menos que Mercúrio esteja em conjunção com um deles ou empilhado sobre um ângulo. Uma conjunção Mercúrio-Lua dentro de 8° vai tingir as duas funções. O ascendente continua exigindo a hora de nascimento; sem ela, pule as casas por completo.',
          'Mercúrio em uma casa (padrão Placidus) nomeia onde a função de organizar fica evidente — terceira, sexta, décima e assim por diante. Casas vazias estão vazias de planetas, não vazias de vida. Signos Inteiros está disponível quando você quer que cada casa seja um signo inteiro a partir do signo do Ascendente, ou quando o Placidus se comporta mal em latitude alta.',
        ],
      },
      {
        heading: 'Aspectos a Mercúrio',
        paragraphs: [
          'Os aspectos maiores são conjunção, sextil, quadratura, trígono e oposição. Os orbes do SideraChart são 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Contatos fechados de Mercúrio com Saturno ou Urano dizem mais do que o texto do signo. Use a tabela abaixo da roda.',
          'Os trânsitos ao Mercúrio natal aparecem depois no painel diário, guardados ao meio-dia do fuso natal, para que a nota do dia não escorregue se você atualizar às 23:00. Esses trânsitos não reescrevem o signo natal de Mercúrio. A posição natal é a linha de base.',
          'Um Mercúrio retrógrado em trânsito sobre o Mercúrio natal é uma sobreposição temporária, popular nas manchetes e fácil de superinterpretar. Anote o orbe, veja se é aplicativo, depois olhe o resto dos contatos lentos do dia. Clima rápido de Mercúrio não deveria superar um trânsito de Saturno que está de fato fechado.',
        ],
      },
      {
        heading: 'Como calcular o seu signo de Mercúrio',
        paragraphs: [
          'Use o calculador de signo de Mercúrio do SideraChart ou o mapa astral completo. Informe data, hora e local. Leia a linha de Mercúrio e depois dê uma olhada no Sol para ver se dividem o signo. Só tropical. Se precisar de casas, precisa do relógio; se não tiver o relógio, pare no signo.',
          'Não trate Mercúrio como conselho de carreira, jurídico ou médico. É uma coordenada de como o mapa fala e organiza. Devolva-o à roda junto de Vênus, Marte e o trio principal antes de concluir que o mapa tem um tema único.',
          'Ao comparar com outro site, ajuste zodíaco tropical e o mesmo fuso de nascimento. Um signo de Mercúrio que pula normalmente é sideral, um erro de relógio em dia de estação ou um deslize de histórico de fuso — não uma falha da astronomy-engine. As casas ainda vão divergir se um site usou Signos Inteiros e você deixou o SideraChart em Placidus.',
        ],
      },
    ],
    faq: [
      {
        q: 'Como descubro meu signo de Mercúrio?',
        a: 'Calcule um mapa astral a partir de data, hora e local de nascimento, ou use o calculador de signo de Mercúrio do SideraChart. A linha de Mercúrio traz o signo tropical e o grau.',
      },
      {
        q: 'Por que meu Mercúrio está no mesmo signo do meu Sol?',
        a: 'Mercúrio nunca se afasta muito do Sol, então os signos natais costumam coincidir ou ficar ao lado. Confira os graus; eles ainda podem aspectar outros planetas de modo diferente.',
      },
      {
        q: 'Preciso da hora de nascimento para Mercúrio?',
        a: 'Em geral não para o signo. Você precisa da hora para a casa e para dias de cúspide ou de estação, quando o signo de Mercúrio pode virar.',
      },
      {
        q: 'Mercúrio retrógrado natal é ruim?',
        a: 'É um fato de movimento aparente, não um veredito. Leia signo, casa e aspectos. Não é uma afirmação sobre inteligência ou saúde.',
      },
    ],
  },
  'mars-sign': {
    title: 'O que é o signo de Marte?',
    excerpt:
      'Seu signo de Marte é o signo tropical que Marte ocupava no nascimento. Descreve como o mapa começa, discute e persegue — uma coordenada natal, não uma licença para o conflito.',
    sections: [
      {
        heading: 'O que é o signo de Marte?',
        paragraphs: [
          'Seu signo de Marte é o signo do zodíaco tropical que continha Marte no seu nascimento. As pessoas buscam "o que é o signo de Marte?" porque os textos populares tratam Marte como combustível: como você começa, compete, deseja e se irrita. No instrumento é uma longitude planetária num mapa astral, calculada a partir de data, hora e local de nascimento. Não é um salvo-conduto para a crueldade nem uma leitura médica de sangue ou músculos.',
          'O SideraChart posiciona Marte no zodíaco tropical usando a astronomy-engine (VSOP87). As casas, quando o relógio é conhecido, são Placidus por padrão. Sistemas siderais e chineses estão fora do escopo. Se um aplicativo védico mostra outro signo de Marte, você está olhando outro ponto zero, não outro planeta.',
        ],
      },
      {
        heading: 'O que Marte descreve no mapa',
        paragraphs: [
          'Marte é a função de iniciar e combater: calor, perseguição, o primeiro movimento num conflito, a vontade de abrir caminho. Você lê o signo como o estilo desse calor — direto, lento, tático, teatral — e a casa como o setor em que ele aparece. Mantenha descritivo. Não o use para justificar dano nem para prever violência.',
          'Marte pode ficar longe do Sol, ao contrário de Mercúrio e Vênus, então o seu signo de Marte muitas vezes difere do signo solar. Essa divisão é comum. Sol em Touro com Marte em Áries não é contradição. São duas funções com dois estilos. Leia as duas e depois confira a tabela de aspectos antes de dar nota a qualquer uma.',
        ],
      },
      {
        heading: 'Velocidade, retrogradação e hora de nascimento',
        paragraphs: [
          'Marte passa cerca de seis a sete semanas em um signo quando direto, e mais tempo em torno da retrogradação. Marte retrógrado natal significa que a longitude aparente andava para trás no nascimento. Anote como movimento. Não trate como defeito de caráter.',
          'A data em geral resolve o signo. A hora ainda define o grau, os aspectos ao longo do dia e a casa. Hora desconhecida: planetas sim, casas não. Um mapa de meio-dia que estaciona Marte sobre um ângulo é um chute. Se você se importa com "Marte na primeira casa", precisa de um Ascendente de verdade, o que significa um relógio de verdade.',
        ],
      },
      {
        heading: 'Marte, o trio principal e os outros planetas',
        paragraphs: [
          'Leia Sol, Lua e ascendente primeiro, a menos que Marte esteja em conjunção com um deles ou pousado sobre o Ascendente ou o Meio do Céu. Uma quadratura Marte-Lua dentro de 6° fala mais alto que um parágrafo de signo de Marte. O ascendente continua exigindo hora e local de nascimento.',
          'Contatos Marte-Vênus e Marte-Saturno são fáceis de narrar demais. Use a tabela de aspectos do SideraChart e os orbes declarados: 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Os fechados primeiro. Contatos largos, na borda do orbe, são mais discretos. As linhas coloridas da roda coincidem com a tabela.',
        ],
      },
      {
        heading: 'Casas e trânsitos posteriores',
        paragraphs: [
          'Com um Ascendente conhecido, Marte em uma casa nomeia onde a função de iniciar fica evidente. Casas vazias não significam que falta aquela área da vida; significam que nenhum planeta está sentado naquele cômodo. Placidus é o padrão porque a maior parte da bibliografia ocidental o pressupõe. Signos Inteiros é mais limpo em latitudes altas e quando você quer signo = casa.',
          'Os trânsitos ao Marte natal são clima posterior. O painel do SideraChart guarda a sobreposição do dia ao meio-dia do fuso natal. Um Marte em trânsito em quadratura ao Marte natal é um contato temporário, não uma reescrita do signo natal de Marte. Mantenha a linha de base e o clima em gavetas diferentes.',
          'O retorno de Marte — Marte em trânsito de volta ao grau natal — é um ciclo de cerca de dois anos, não um reset de personalidade. Se você o acompanha no painel, está acompanhando um contato que se repete, não um novo mapa astral. Dias perdidos ficam perdidos; o produto não inventa um retorno que você não abriu.',
        ],
      },
      {
        heading: 'Como descobrir o seu signo de Marte',
        paragraphs: [
          'Use o calculador de signo de Marte ou o mapa astral completo do SideraChart. Informe data, hora e local. Leia a linha de Marte e depois os aspectos. Só tropical. Para bater com outros sites, ajuste-os para tropical mais Placidus se quiser as mesmas casas.',
          'Devolva Marte ao mapa. Um signo de Marte sem Sol, Lua, ascendente e o resto é uma nota de especialista. Calcule com cuidado e leia como uma função entre dez corpos, não como a pessoa inteira.',
          'Se a hora for desconhecida, você ainda pode citar o signo de Marte e os aspectos entre planetas. Não pode citar Marte no Ascendente nem na décima casa. Escreva o limite na mesma página do signo, para não contrabandear a linguagem de casas de volta mais tarde.',
        ],
      },
    ],
    faq: [
      {
        q: 'Como descubro meu signo de Marte?',
        a: 'Calcule um mapa astral ou use o calculador de signo de Marte do SideraChart com data, hora e local de nascimento. A linha de Marte traz o signo tropical e o grau.',
      },
      {
        q: 'Preciso da hora de nascimento para o signo de Marte?',
        a: 'Em geral não para o signo. Você precisa da hora para a casa, para uma cúspide e para qualquer afirmação de que Marte está sobre um ângulo.',
      },
      {
        q: 'O que significa Marte retrógrado natal?',
        a: 'Movimento aparente para trás ao longo da eclíptica no nascimento. Registre como marca de movimento e leia o signo e os aspectos. Não é um veredito sobre raiva ou saúde.',
      },
      {
        q: 'Por que meu signo de Marte é diferente do meu signo solar?',
        a: 'Marte pode estar em qualquer ponto da eclíptica em relação ao Sol ao longo do seu ciclo de dois anos. Signos diferentes são normais. Leia as duas posições.',
      },
    ],
  },
  'why-birth-time-matters': {
    title: 'Por que a hora de nascimento importa no mapa astral?',
    excerpt:
      'A hora de nascimento define o Ascendente, as casas e o grau da Lua. Um erro de vinte minutos pode trocar o ascendente. Sem a hora você tem signos dos planetas, não casas.',
    sections: [
      {
        heading: 'Por que a hora de nascimento importa no mapa astral?',
        paragraphs: [
          'A hora de nascimento importa porque há dois relógios escondidos dentro de um mesmo horário civil. O primeiro converte a sua hora local em Tempo Universal, para que as longitudes planetárias saiam corretas. O segundo, junto de latitude e longitude, define o tempo sideral local — que grau da eclíptica estava subindo, qual culminava e onde caem as cúspides das casas. As pessoas perguntam "por que a hora importa?" quando têm o aniversário mas não o minuto. Resposta curta: os planetas em geral sobrevivem; o enquadramento local, não.',
          'O SideraChart usa as regras de fuso da IANA vigentes naquela data, inclusive horários de verão históricos, e depois lê as posições tropicais na astronomy-engine (VSOP87). Um fuso errado faz tanto estrago quanto um minuto errado. Um nascimento registrado às 14:00 no deslocamento errado é outro céu e outro Tempo Universal.',
        ],
      },
      {
        heading: 'O Ascendente anda cerca de um grau a cada quatro minutos',
        paragraphs: [
          'O ascendente é um grau do horizonte. Ele percorre mais ou menos 1° em quatro minutos, um signo novo a cada duas horas. Um erro de vinte minutos são uns cinco graus e pode virar o signo perto de uma fronteira. Isso não é sensibilidade mística. É a Terra girando.',
          'Se o seu ascendente está errado, as casas de Placidus estão erradas junto, porque a casa I começa no Ascendente. Toda frase de planeta em casa se desloca. Esse é o principal motivo para se importar com o relógio, mesmo quando o signo solar é óbvio.',
        ],
      },
      {
        heading: 'As casas dependem do tempo sideral local',
        paragraphs: [
          'Casas são setores do céu local, não signos. Signos são 30° do zodíaco tropical. Casas são o que se obtém ao dividir o espaço em torno do horizonte e do meridiano. Placidus, o padrão do SideraChart, divide tempo de ascensão, então as casas ficam desiguais. Signos Inteiros dá a cada casa um signo completo a partir do signo do Ascendente.',
          'Sem hora de nascimento não há Ascendente honesto e, portanto, não há casas honestas. Hora desconhecida = planetas sim, casas não. O SideraChart segue essa regra em vez de estacionar você em silêncio no meio-dia. Meio-dia é uma convenção para alguns mapas históricos; não é o seu Ascendente.',
        ],
      },
      {
        heading: 'O grau da Lua e outros dados rápidos',
        paragraphs: [
          'A Lua anda cerca de meio grau por hora. Ao longo de um dia são vários graus — o bastante para mudar aspectos e, num dia de troca de signo, o próprio signo lunar. Mercúrio, Vênus e o Sol também podem cair sobre uma cúspide. Os planetas exteriores quase não se movem em um dia; os signos deles estão seguros sem hora.',
          'Os aspectos entre planetas continuam existindo sem casas. O SideraChart lista os aspectos maiores dentro de orbes de 8° / 6° / 4° a partir das longitudes planetárias mesmo quando o Ascendente é omitido. O que se perde é tudo o que depende de um ângulo: ascendente, cúspides de casas, planetas no Meio do Céu.',
        ],
      },
      {
        heading: 'Certidões, memória e horas arredondadas',
        paragraphs: [
          'Prefira uma certidão de nascimento ou registro hospitalar a uma história de família. Parentes arredondam. "Umas seis" pode significar 17:40. Recalcule um intervalo se a hora for aproximada e veja se o Ascendente fica no lugar. Se não ficar, você ainda não tem um ascendente.',
          'Não retifique uma hora para combinar com a biografia dentro deste calculador. O SideraChart não vai inventar um minuto para fazer a décima casa parecer o seu cargo. Se a hora é desconhecida, marque como desconhecida. Leia planetas em signos e aspectos. Deixe as casas para o dia em que houver relógio.',
          'Registro hospitalar vale mais que palpite de batismo. Uma hora escrita como 16h30 é melhor que "fim da tarde". Se o documento usa uma hora média local antiga, diga isso ao comparar com outro site; a conversão IANA pressupõe o fuso civil daquela data, que é o que o SideraChart aplica.',
        ],
      },
      {
        heading: 'O que informar no SideraChart',
        paragraphs: [
          'Data, hora, local. O local é buscado como coordenadas; a hora é convertida com IANA; os planetas vêm de efemérides de classe VSOP87; as casas são Placidus por padrão. Se a hora estiver faltando, use a opção de hora desconhecida. Você ainda recebe um mapa planetário utilizável. O que não recebe é um ascendente.',
          'Mais tarde, o painel diário guarda os trânsitos ao meio-dia do fuso natal. Esse meio-dia é um instantâneo estável para trânsitos, não um substituto de hora de nascimento ausente. O seu Ascendente natal continua exigindo o minuto real. Não misture os dois meios-dias.',
          'Se os parentes derem duas horas com uma hora de diferença, calcule as duas e compare os Ascendentes. Se o signo se mantiver, você tem um ascendente utilizável com um intervalo de graus. Se virar, ainda não tem um. Publique o intervalo, não uma precisão falsa de 14:00:00.',
        ],
      },
    ],
    faq: [
      {
        q: 'O que acontece se minha hora de nascimento estiver errada?',
        a: 'Os signos dos planetas em geral sobrevivem. O Ascendente, as casas e o grau da Lua podem não sobreviver. Um erro de vinte minutos pode trocar o ascendente perto de uma cúspide.',
      },
      {
        q: 'Um mapa astral de meio-dia é preciso?',
        a: 'Ele pode estimar os signos dos planetas em um dia calmo. Não é um Ascendente nem um sistema de casas preciso. O SideraChart trata hora desconhecida como planetas apenas.',
      },
      {
        q: 'O local de nascimento importa tanto quanto a hora?',
        a: 'Para o Ascendente e as casas, sim: latitude e longitude definem o horizonte. Para os signos dos planetas, o local quase não pesa. Erros de fuso pesam nos dois casos.',
      },
      {
        q: 'Posso usar 12:00 se não sei a hora?',
        a: 'Pode, como rascunho para os signos. Não leia casas nem ascendente a partir disso. Marque a hora como desconhecida no SideraChart em vez de fingir que meio-dia é um fato.',
      },
    ],
  },
  'birth-chart-without-time': {
    title: 'Dá para fazer o mapa astral sem a hora de nascimento?',
    excerpt:
      'Dá: os signos dos planetas e os aspectos continuam sendo calculados sem a hora. O Ascendente e as casas, não. Não trate um mapa de meio-dia como um mapa completo de casas.',
    sections: [
      {
        heading: 'Dá para fazer o mapa astral sem a hora de nascimento?',
        paragraphs: [
          'Dá, com um limite claro. Sem a hora de nascimento você ainda calcula as longitudes planetárias a partir da data (mais um fuso ou local para o Tempo Universal). Isso lhe dá do Sol a Plutão em signos tropicais e os aspectos maiores entre eles. O que você não calcula é um Ascendente, um Meio do Céu ou cúspides de casas confiáveis. O mapa astral honesto sem hora é um mapa planetário, não uma roda completa de casas.',
          'O SideraChart permite marcar a hora como desconhecida e então devolve os planetas omitindo o ascendente. Esse é o produto correto. Muitos sites usam 12:00 em silêncio e desenham as casas assim mesmo. Essas casas pertencem a quem nasceu ao meio-dia, o que não é um fato sobre você.',
        ],
      },
      {
        heading: 'O que você ainda tem: os signos dos planetas',
        paragraphs: [
          'O Sol, Mercúrio, Vênus, Marte e os planetas exteriores se movem devagar o bastante para que a data do calendário normalmente fixe o signo. Os aspectos entre esses corpos também são utilizáveis, com os orbes do SideraChart de 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Dá para ler bastante coisa assim: equilíbrio de elementos, um stellium em um signo, uma quadratura fechada de Saturno ao Sol.',
          'O local ainda ajuda, porque fuso e horário de verão convertem a data em Tempo Universal. Um nascimento perto da meia-noite pode tecnicamente cair na data vizinha em TU. Se você sabe a cidade mas não o minuto, informe o local e marque hora desconhecida em vez de inventar um relógio.',
        ],
      },
      {
        heading: 'O que você perde: Ascendente e casas',
        paragraphs: [
          'O Ascendente é um grau do horizonte. Ele exige o minuto. As casas em Placidus começam ali. As casas de Signos Inteiros também precisam do signo do Ascendente. Sem hora, sem casas — e não "casas aproximadas". Hora desconhecida = planetas sim, casas não. Internalize essa frase e você evita o mapa astral ruim mais comum da internet.',
          'Sem casas você não pode dizer honestamente que um planeta está na décima casa, nem que você tem uma sétima vazia. Essas afirmações são locais. Você ainda pode dizer que o planeta está em Capricórnio, ou que dois planetas estão em oposição. Fique na eclíptica até ter um relógio.',
        ],
      },
      {
        heading: 'A Lua em dia de troca de signo',
        paragraphs: [
          'A Lua é a exceção que morde. Ela troca de signo a cada dois dias e meio. Se não trocou no seu aniversário, o signo costuma estar seguro sem a hora. Se trocou, você não tem signo lunar até ter um relógio. Não escolha a Lua de que gosta mais.',
          'Mesmo num dia lunar tranquilo, o grau fica incerto em vários graus ao longo de vinte e quatro horas. Aspectos que ficam perto da borda do orbe — 8°, 6°, 4° — podem estar dentro ou fora dependendo da hora. Trate aspectos lunares de borda como provisórios quando a hora for desconhecida.',
        ],
      },
      {
        heading: 'Por que meio-dia é um chute, não um mapa',
        paragraphs: [
          'Meio-dia é popular porque é o centro do dia civil e porque algumas efemérides históricas listavam as posições diárias ao meio-dia. Ainda assim é uma hora específica. Ela produz um Ascendente específico para aquela latitude. Usá-la como substituta de "desconhecido" esconde a incerteza em vez de rotulá-la.',
          'Se precisar rascunhar, calcule os planetas ao meio-dia e ignore a roda de casas. O caminho de hora desconhecida do SideraChart faz essa rotulagem por você. Nascimentos polares têm um segundo problema: as cúspides de Placidus falham acima de uns 66° de latitude mesmo com hora perfeita. Isso é um limite do sistema de casas, não um motivo para forjar um relógio.',
        ],
      },
      {
        heading: 'Como usar o SideraChart sem a hora',
        paragraphs: [
          'Informe data e local, marque a hora como desconhecida, leia a tabela de planetas. Pule as ferramentas de ascendente. Pule qualquer frase que dependa de uma casa. Você ainda pode usar os calculadores de planeta em signo para Sol, Lua (em geral), Mercúrio, Vênus e Marte. Zodíaco tropical, VSOP87 pela astronomy-engine, não Swiss Ephemeris, não sideral.',
          'Os aspectos entre os planetas continuam valendo. Ordene-os por orbe do mesmo jeito: 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Uma quadratura Sol-Saturno fechada sem casas continua sendo uma quadratura Sol-Saturno fechada. O que não se pode fazer é grudá-la em "carreira na décima casa" antes de o Ascendente existir.',
          'Se a hora aparecer depois — uma certidão, uma anotação de parteira — recalcule e só então leia as casas. O instantâneo de meio-dia do painel diário é outro meio-dia: ele guarda o céu de hoje contra um mapa astral salvo. Não preenche um minuto de nascimento ausente. Mantenha as duas tarefas separadas.',
          'Você ainda pode salvar um mapa só de planetas. A camada escrita virá mais fina porque as frases de casa somem. Isso é preferível a um relatório grosso construído sobre cúspides de meio-dia. Quando o relógio chegar, recalcule uma vez e substitua o mapa salvo, em vez de empilhar duas rodas em conflito.',
        ],
      },
    ],
    faq: [
      {
        q: 'Dá para levantar um mapa astral só com a data de nascimento?',
        a: 'Dá para levantar signos de planetas e aspectos. Não dá para levantar um Ascendente ou casas confiáveis. O SideraChart marca esse limite quando a hora é desconhecida.',
      },
      {
        q: 'Usar 12:00 serve se eu não sei a hora real?',
        a: 'Só como rascunho para os planetas lentos. Não leia o ascendente nem as casas a partir do meio-dia. Prefira a opção de hora desconhecida.',
      },
      {
        q: 'Meu signo lunar sai correto sem a hora?',
        a: 'Em geral sim, a menos que a Lua tenha trocado de signo no seu aniversário. O grau e a casa não saem corretos sem relógio.',
      },
      {
        q: 'O que devo ler primeiro se não tenho a hora de nascimento?',
        a: 'Os signos dos planetas, principalmente Sol, Lua se for seguro, Mercúrio, Vênus, Marte, e os aspectos mais fechados. Deixe as casas para quando tiver a hora.',
      },
    ],
  },
  'how-to-read-a-natal-chart': {
    title: 'Como ler um mapa astral',
    excerpt:
      'Leia o mapa astral em ordem: trio principal, casas ocupadas e depois os aspectos mais fechados. Use as tabelas como instrumento. Hora desconhecida significa pular casas e Ascendente.',
    sections: [
      {
        heading: 'Como ler um mapa astral',
        paragraphs: [
          'O mapa astral fica mais fácil se você se recusar a ler tudo de uma vez. Comece pelo trio principal — Sol, Lua, ascendente — depois as casas que de fato contêm planetas, depois os aspectos maiores mais fechados. A roda é um desenho. As tabelas são o instrumento. Números primeiro: signo, grau, casa, orbe. Texto depois. Essa ordem evita que você se afogue em doze ensaios de signo antes de saber quais cômodos estão ocupados.',
          'Você precisa de data, hora e local de nascimento para o método completo. Se a hora for desconhecida, largue ascendente e casas e leia planetas em signos mais aspectos. O SideraChart segue essa divisão. Não tente "como ler um mapa astral" contornando um relógio ausente e fingindo que meio-dia é dado. Escreva a lacuna na página.',
        ],
      },
      {
        heading: 'Comece por Sol, Lua e ascendente',
        paragraphs: [
          'O Sol é a trama diurna, vinda da data. A Lua é o clima interno mais rápido; confira se ela trocou de signo naquele dia. O ascendente é o horizonte leste e só existe com a hora. Veja se os três rimam ou discutem. Depois olhe os aspectos entre eles com orbes de 8° / 6° / 4°.',
          'Se você tem só o Sol, ainda não sabe ler o mapa; sabe uma coordenada. A roda do SideraChart coloca esses três glifos onde você pode vê-los antes de sair caçando asteroides ou pontos hipotéticos que este site não usa.',
        ],
      },
      {
        heading: 'Depois leia as casas ocupadas',
        paragraphs: [
          'Casas são setores locais. Um planeta na décima não é o mesmo planeta na quarta, mesmo no mesmo signo. Liste as casas que contêm corpos. São os cômodos barulhentos. Casas vazias não são defeitos; são cômodos sem planeta sentado dentro. Há um artigo separado sobre isso.',
          'O SideraChart usa Placidus por padrão porque a maior parte da bibliografia ocidental o pressupõe. Signos Inteiros é a outra grade. Latitudes polares acima de uns 66° não deveriam forçar cúspides quebradas de Placidus. Se a hora for desconhecida, pule esta etapa inteira. Linguagem de planeta em casa sem Ascendente é ficção.',
        ],
      },
      {
        heading: 'Depois leia os aspectos mais fechados',
        paragraphs: [
          'Aspectos são ângulos com nome: conjunção, sextil, quadratura, trígono, oposição. Ordene por orbe, do mais fechado ao mais largo. Uma conjunção Sol-Saturno de 0,4° vale mais que um trígono de Marte de 7,8°. O SideraChart desenha os cinco maiores e indica na tabela se são aplicativos ou separativos. Esconda as linhas na roda se o desenho ficar carregado; a tabela permanece.',
          'Não moralize os aspectos. Quadraturas são atrito que constrói habilidade quando você as trabalha; não são maldições. Trígonos são facilidade que pode virar preguiça. Conjunções fundem funções. Oposições polarizam. Fique com a geometria. Largue o "o universo quer".',
        ],
      },
      {
        heading: 'Roda, tabelas e camada escrita',
        paragraphs: [
          'O anel externo são os signos. As divisões internas são as casas. Os glifos ficam sobre longitudes. As linhas coloridas são aspectos. Abra uma linha da tabela para ver signo, casa e grau exatos. Os cartões escritos sob um mapa salvo são uma camada de interpretação em cache, não um modelo de linguagem inventando física nova.',
          'Um PNG exportado é um instantâneo para compartilhar. As tabelas ao vivo são o que você relê. Se outro site discordar, iguale zodíaco tropical, Placidus e o mesmo fuso de nascimento antes de culpar as efemérides. O SideraChart usa a astronomy-engine (VSOP87), não o Swiss Ephemeris. Diferenças de alguns minutos de arco são esperadas; um signo inteiro costuma significar um ajuste sideral ou um relógio errado.',
        ],
      },
      {
        heading: 'Uma ordem de trabalho no SideraChart',
        paragraphs: [
          'Calcule o mapa. Confirme data, hora, local, tropical, Placidus. Leia Sol, Lua, Ascendente. Passe os olhos nas casas ocupadas. Ordene os aspectos por orbe. Só então abra os textos signo a signo. Salve o mapa se quiser o relatório e o painel diário. Os trânsitos no painel ficam guardados ao meio-dia do horário natal; são uma etapa posterior, não o passo um da leitura natal.',
          'No começo, mantenha uma anotação de apenas três fatos: o trio principal, a casa mais ocupada, o aspecto mais fechado. Isso é uma leitura de mapa astral que você consegue de fato terminar. Expanda para regentes de casas vazias e trânsitos lentos depois que esses três fatos estiverem estáveis.',
          'Pare antes de conclusões médicas, jurídicas ou financeiras. O método é: coordenadas, depois estrutura, depois linguagem cautelosa. Se você pula as coordenadas, está lendo uma coluna de horóscopo, não um mapa astral.',
          'Releia o mesmo mapa uma semana depois na mesma ordem. A roda não muda; o seu olho, sim. Se um detalhe novo aparecer, confira contra a tabela. Se ele não existe nos números, não está no mapa astral, por mais bonita que seja a frase.',
        ],
      },
    ],
    faq: [
      {
        q: 'O que devo olhar primeiro em um mapa astral?',
        a: 'Sol, Lua e ascendente, depois as casas ocupadas, depois os aspectos mais fechados. Deixe casas vazias e pontos menores para depois.',
      },
      {
        q: 'Como leio um mapa astral sem a hora de nascimento?',
        a: 'Leia apenas signos de planetas e aspectos. Pule o Ascendente e toda afirmação de casa. O SideraChart omite o ascendente quando a hora é desconhecida.',
      },
      {
        q: 'Leio signos ou casas primeiro?',
        a: 'Os signos dizem o estilo; as casas dizem o setor. Depois do trio principal, liste as casas ocupadas e então combine: "Marte em Áries na décima" é as duas coisas.',
      },
      {
        q: 'Que orbes devo usar ao ler aspectos?',
        a: 'O SideraChart usa 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Os mais fechados primeiro.',
      },
    ],
  },
  'houses-in-a-birth-chart': {
    title: 'O que são as casas no mapa astral?',
    excerpt:
      'As casas são doze setores locais do céu de nascimento, não signos do zodíaco. Elas exigem hora de nascimento. O SideraChart usa Placidus por padrão; hora desconhecida significa nenhuma casa honesta.',
    sections: [
      {
        heading: 'O que são as casas no mapa astral?',
        paragraphs: [
          'As casas são doze setores do céu vistos do local de nascimento no momento do nascimento. Não são signos. Signos são fatias de 30° do zodíaco tropical ao longo da eclíptica. Casas são um enquadramento local: que parte daquele céu estava subindo, culminando, se pondo. O signo de um planeta é o seu estilo. A casa de um planeta é o setor da vida em que esse estilo fica fácil de notar.',
          'Não é possível ter casas sem hora de nascimento, porque o enquadramento está preso ao horizonte. Hora desconhecida = planetas sim, casas não. Quem publica leituras de casas a partir de um meio-dia de reserva está descrevendo o meio-dia, não um minuto desconhecido. O SideraChart não faz isso por padrão.',
        ],
      },
      {
        heading: 'As casas são locais; os signos são zodiacais',
        paragraphs: [
          'Duas pessoas podem dividir um Sol em Capricórnio e não dividir a décima casa. A casa do Sol depende do Ascendente, que depende de hora e local. É por isso que a conversa sobre casas soa mais "biográfica" que a conversa sobre signos, e por isso ela é mais frágil. Se o relógio estiver errado, a biografia que você acabou de escrever está grudada nos cômodos errados.',
          'Leia os dois juntos quando tiver ambos: "Vênus em Touro na segunda" é uma frase diferente de "Vênus em Touro na oitava". Mesmo signo, setor diferente. Se você só tem o signo, pare no signo.',
        ],
      },
      {
        heading: 'Placidus é o padrão no SideraChart',
        paragraphs: [
          'Placidus divide tempo de ascensão em vez de fatias iguais de espaço, então as casas ficam desiguais. O SideraChart o adota por padrão porque a maior parte das interpretações ocidentais publicadas pressupõe Placidus. Signos Inteiros está disponível: a casa I é o signo inteiro que contém o Ascendente, e depois os signos seguintes em ordem. Nenhum dos dois é prática sideral védica; ambos aqui repousam sobre longitudes tropicais da astronomy-engine (VSOP87).',
          'Acima de uns 66° de latitude as cúspides de Placidus podem falhar. Para esses nascimentos, Signos Inteiros é a grade mais honesta. As posições planetárias são calculadas de qualquer forma. Se um site discordar das suas casas, confira o sistema de casas antes da efeméride. O Swiss Ephemeris não está nesta pilha; uma divergência de sistema é o culpado de sempre.',
        ],
      },
      {
        heading: 'Angulares, sucedentes e cadentes',
        paragraphs: [
          'As casas 1, 4, 7 e 10 são angulares — ligadas ao horizonte e ao meridiano, historicamente as mais altas. As 2, 5, 8 e 11 são sucedentes. As 3, 6, 9 e 12 são cadentes. Isso é uma pista de volume, não um ranking moral. Um monte de planetas na décima segunda fala alto mesmo que os manuais chamem a décima segunda de cadente.',
          'Os temas tradicionais das casas (o eu, o dinheiro, os irmãos, o lar e assim por diante) são um vocabulário, não um contrato. Use-os como rótulos de setores e depois veja quais planetas de fato os ocupam. Não invente acontecimentos para preencher uma casa que por acaso está vazia.',
        ],
      },
      {
        heading: 'Cúspides, interceptações e latitudes altas',
        paragraphs: [
          'Em Placidus a cúspide de uma casa é o grau de fronteira. Um planeta perto de uma cúspide é uma decisão de leitura; este site não o move em segredo para a casa seguinte. Signos interceptados — um signo engolido dentro de uma casa sem cúspide — acontecem em latitudes mais altas, quando as casas se esticam. Signos Inteiros evita essa geometria ao amarrar casas a signos.',
          'Se o seu nascimento for polar, não torture o Placidus. Troque de sistema. Se a sua hora de nascimento for arredondada, recalcule um intervalo e veja se os planetas mudam de casa. Se mudarem, essas afirmações de casa são provisórias.',
          'O OpenStreetMap Nominatim fornece as coordenadas que o SideraChart usa para o local. Um alfinete no centro da cidade não é um alfinete no hospital; para as casas a diferença costuma ser pequena, mas em latitude alta ou perto de uma cúspide pode pesar. Prefira a cidade real de nascimento à cidade onde você cresceu depois.',
        ],
      },
      {
        heading: 'Como ler as casas na roda',
        paragraphs: [
          'No SideraChart as divisões internas são as casas, contadas a partir do Ascendente, à esquerda. Os glifos ficam sobre a longitude eclíptica; a tabela diz em que número de casa aquela longitude caiu. Os aspectos permanecem na eclíptica (orbes 8° / 6° / 4°) e não ligam para paredes de casas. As paredes das casas é que ligam para o relógio.',
          'Salve o mapa para guardar o sistema de casas junto do relatório. Os trânsitos diários do painel são calculados ao meio-dia do horário natal contra esse enquadramento natal. Planetas em trânsito pelas casas só fazem sentido se as casas natais eram reais desde o início — o que, de novo, significa que você tinha a hora de nascimento.',
          'Se você trocar de Placidus para Signos Inteiros depois de salvar, recalcule em vez de arrastar glifos mentalmente. O planeta não se moveu; as paredes, sim. Anote o sistema em qualquer captura de tela que compartilhar, para que uma comparação futura não vire uma discordância falsa.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é a diferença entre signos e casas?',
        a: 'Signos são 30° do zodíaco tropical. Casas são doze setores locais a partir do seu horizonte de nascimento. Signos precisam de data; casas precisam de hora e local.',
      },
      {
        q: 'Que sistema de casas devo usar?',
        a: 'Placidus é o padrão do SideraChart e combina com a maior parte dos textos ocidentais. Use Signos Inteiros em latitudes altas ou se quiser um signo por casa.',
      },
      {
        q: 'Dá para ler as casas sem a hora de nascimento?',
        a: 'Não. Sem Ascendente o enquadramento das casas não está definido. Você ainda pode ler signos de planetas e aspectos.',
      },
      {
        q: 'Por que minhas casas são diferentes em outro site?',
        a: 'Outro sistema de casas, outro fuso ou zodíaco sideral. Ajuste o outro site para tropical com Placidus e as mesmas coordenadas antes de comparar.',
      },
    ],
  },
  'empty-houses': {
    title: 'O que são casas vazias no mapa astral?',
    excerpt:
      'Uma casa vazia é uma casa sem planeta dentro. Não é uma área da vida que falta. Você ainda precisa da hora de nascimento para saber quais casas estão vazias; mapas de meio-dia forjam as lacunas.',
    sections: [
      {
        heading: 'O que são casas vazias no mapa astral?',
        paragraphs: [
          'Uma casa vazia é uma casa sem nenhum planeta natal dentro dela. A definição é essa. Não é um buraco na sua vida, não é um órgão ausente e não é a previsão de que nada vai acontecer naquele setor. Dez corpos (do Sol a Plutão mais a Lua) não conseguem ocupar doze cômodos ao mesmo tempo. A maioria dos mapas tem casas vazias. Se o seu não tivesse, você teria uma roda bem apertada.',
          'Você só sabe quais casas estão vazias se conhece o enquadramento das casas, o que significa conhecer a hora de nascimento. Hora desconhecida = planetas sim, casas não — e isso inclui conversa sobre casas vazias. Um mapa de meio-dia pode mostrar casas "vazias" que encheriam ou esvaziariam às 04:00. Não interprete lacunas falsas.',
        ],
      },
      {
        heading: 'Vazia não quer dizer inativa',
        paragraphs: [
          'A vida continua em temas que não têm planeta na cúspide. A leitura tradicional ainda olha o signo na cúspide da casa e o planeta que rege esse signo. É um método mais longo. O método curto deste site é: casas ocupadas falam mais alto porque há um planeta sentado ali; casas vazias são mais discretas na roda, não ausentes da biografia.',
          'Não preencha uma casa vazia com medo. As pessoas buscam "o que são casas vazias no mapa astral?" porque os textos on-line as tratam como defeitos. Elas são um problema de aglomeração nos outros cômodos, não uma maldição sobre os vazios.',
        ],
      },
      {
        heading: 'A regência continua contando',
        paragraphs: [
          'Se a sétima casa está vazia mas a cúspide dela está em Libra, Vênus ainda tem voz como regente tradicional. Você vai encontrar Vênus em outro ponto do mapa — talvez na segunda, talvez em conjunção com Saturno. Essa posição é como a casa vazia "fala" sem morador. Isso é estrutura, não misticismo.',
          'As tabelas do SideraChart listam planetas em casas. Elas não escondem casas vazias; simplesmente não há glifo ali. Olhe o signo da cúspide na roda se quiser o regente. Os aspectos (orbes 8° / 6° / 4°) também podem ligar um planeta a temas associados a uma casa que ele não ocupa, porque aspectos são ângulos na eclíptica, não atribuições de cômodo.',
        ],
      },
      {
        heading: 'Stelliums e casas lotadas',
        paragraphs: [
          'O contrário das casas vazias é o stellium: vários planetas em um signo ou em uma casa. Aquele cômodo fica com o volume. As casas vizinhas podem estar vazias porque os corpos se aglomeraram. Leia o aglomerado primeiro. Depois anote os cômodos vazios sem escrever obituários para eles.',
          'O sistema de casas muda quais cômodos parecem vazios. Placidus (padrão) e Signos Inteiros podem mover um planeta através de uma fronteira, principalmente em latitude alta ou com um planeta perto de uma cúspide. Se uma "sétima vazia" aparece em um sistema e não no outro, você está olhando para uma fronteira, não para um destino.',
        ],
      },
      {
        heading: 'Hora desconhecida e casas vazias falsas',
        paragraphs: [
          'Sem hora de nascimento, toda afirmação sobre casa vazia é inválida, porque as paredes são inválidas. Não use um mapa de 12:00 para anunciar que a sua quarta casa está vazia. Marque a hora como desconhecida no SideraChart e pule as casas. Você ainda pode falar de signos vazios — nenhum planeta em Escorpião, por exemplo — porque signos não precisam do horizonte.',
          'Se a hora for aproximada, recalcule um intervalo. Planetas que pulam de casa criam e destroem "vazio" em vinte minutos. Trate essas casas como não resolvidas. O movimento do Ascendente de um grau a cada quatro minutos é o mesmo relógio que torna frágeis as listas de casas vazias.',
          'Signos Inteiros pode esvaziar e encher cômodos diferentes do Placidus com os mesmos planetas. Se você troca de sistema para "consertar" uma casa vazia de que não gosta, está editando a grade, não o céu. Escolha um sistema e leia a aglomeração que você de fato tem.',
        ],
      },
      {
        heading: 'Como lê-las no SideraChart',
        paragraphs: [
          'Calcule com data, hora e local, tropical, Placidus a não ser que tenha um motivo para trocar. Liste as casas ocupadas. As demais estão vazias. Leia primeiro as ocupadas. Use os regentes das cúspides se precisar de uma segunda passada. Não classifique áreas da vida pelo vazio.',
          'Os trânsitos por uma casa natal vazia continuam sendo trânsitos por aquele setor do enquadramento natal. O painel diário os guarda ao meio-dia do fuso natal. Um trânsito não "preenche" permanentemente uma casa natal vazia. É clima naquele cômodo por um tempo. A casa natal continua vazia de planetas natais.',
          'Se você chegou aqui vindo de um meme que numerava as suas casas vazias como fracassos de vida, descarte-o. Conte as casas ocupadas, nomeie o stellium se houver um, e pare. O vazio é um fato do desenho. Não é previsão, diagnóstico nem motivo para chutar uma hora de nascimento só para a sétima casa parecer habitada.',
        ],
      },
    ],
    faq: [
      {
        q: 'Casas vazias no mapa astral são ruins?',
        a: 'Não. Significam que nenhum planeta natal está naquela casa. A maioria dos mapas tem várias. Não são partes que faltam em uma vida.',
      },
      {
        q: 'Quantas casas vazias são normais?',
        a: 'Com dez corpos e doze casas, várias casas vazias são o comum. Um stellium em uma casa praticamente garante vazio em outro lugar.',
      },
      {
        q: 'Dá para saber minhas casas vazias sem a hora de nascimento?',
        a: 'Não. As casas exigem o Ascendente. Sem a hora você pode anotar signos vazios, não casas vazias.',
      },
      {
        q: 'Sétima casa vazia significa que não vou ter relacionamentos?',
        a: 'Não. Essa é a história do defeito. Leia o regente da sétima e o resto do mapa. Não trate o vazio como previsão.',
      },
    ],
  },
  'aspects-in-astrology': {
    title: 'O que são aspectos na astrologia?',
    excerpt:
      'Aspectos são ângulos com nome entre planetas ao longo da eclíptica: conjunção, sextil, quadratura, trígono, oposição. O SideraChart usa orbes de 8°, 6° e 4° para esses cinco.',
    sections: [
      {
        heading: 'O que são aspectos na astrologia?',
        paragraphs: [
          'Aspectos são distâncias angulares ao longo da eclíptica entre duas longitudes natais. São geometria, não linhas do destino. Se dois planetas estão a 90° um do outro, isso é uma quadratura. Se estão a 120°, é um trígono. O mapa astral lista aqueles que estão dentro de um orbe permitido. As pessoas buscam "o que são aspectos na astrologia?" porque as linhas coloridas da roda parecem uma língua secreta. São um transferidor.',
          'O SideraChart desenha cinco aspectos maiores: conjunção (0°), sextil (60°), quadratura (90°), trígono (120°), oposição (180°). Os orbes são 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Orbes mais fechados falam mais alto. A tabela abaixo da roda traz a mesma lista das linhas, com o movimento aplicativo ou separativo.',
        ],
      },
      {
        heading: 'Os cinco aspectos maiores',
        paragraphs: [
          'A conjunção funde duas funções no mesmo trecho do zodíaco. O sextil é 60° — uma porta que você ainda precisa atravessar. A quadratura é 90° — atrito que tende a produzir habilidade se você persistir, ou ruído se não persistir. O trígono é 120° — facilidade que pode ficar sem uso. A oposição é 180° — dois polos, muitas vezes projetados em outra pessoa ou numa agenda que puxa para os dois lados.',
          'Mantenha os verbos concretos. Não promova uma quadratura a maldição nem um trígono a bênção vinda de fora. Você está lendo como duas funções do mapa dividem trabalho. O resto do mapa — signos, casas, o trio principal — diz em que setores esse trabalho cai.',
        ],
      },
      {
        heading: 'Orbes: 8°, 6° e 4°',
        paragraphs: [
          'O orbe é o quanto o contato pode se afastar do exato e ainda contar. A configuração do SideraChart é 8° / 6° / 4°, como acima. Uma conjunção Sol-Lua a 7,2° conta; um sextil de Mercúrio a 4,5° não conta. Outros programas usam orbes diferentes, e é por isso que listas de aspectos discordam mesmo quando as longitudes coincidem.',
          'Ordene por fechamento. Um aspecto de 0,3° vale mais que um aspecto de 7,9° do mesmo tipo. Se você está aprendendo, ignore tudo o que estiver perto da borda até que os fechados fiquem claros. Exatidão não é pureza moral; é volume no instrumento.',
        ],
      },
      {
        heading: 'Aplicativo, separativo e hora de nascimento',
        paragraphs: [
          'Aplicativo significa que o aspecto estava se fechando no nascimento; separativo significa que ele já tinha atingido o pico e estava se abrindo. O SideraChart marca isso na tabela natal. É uma nuance de tempo dentro do momento do nascimento, não uma previsão. Você ainda precisa de longitudes decentes, o que significa um Tempo Universal decente.',
          'Sem hora de nascimento, os aspectos entre planetas continuam existindo. Os aspectos ao Ascendente, não, porque não há Ascendente. Os aspectos da Lua perto de uma borda de orbe podem virar ao longo de um dia. Hora desconhecida: planetas sim, casas não; aspectos lunares perto de 8°/6°/4°, talvez. Não brigue com um mapa de meio-dia por causa de uma quadratura lunar de 5,9°.',
        ],
      },
      {
        heading: 'O que os aspectos não são',
        paragraphs: [
          'Sozinhos, não são sinastria — sinastria são aspectos entre dois mapas. Não são trânsitos — trânsitos são os planetas de hoje aos planetas natais. Não são conselho médico, jurídico ou financeiro. Uma quadratura Marte-Saturno não prescreve um treino nem um processo. Ela descreve atrito entre calor iniciante e estrutura.',
          'Aspectos menores (quincunce, semiquadratura e os demais) não são desenhados aqui. Se outro site mostra mais linhas, ele usa um catálogo mais largo, não um céu mais preciso. O SideraChart fica com os cinco maiores sobre longitudes tropicais da astronomy-engine (VSOP87), não do Swiss Ephemeris.',
          'Stelliums produzem pilhas de conjunções. Leia primeiro o par mais fechado em vez de declarar a pilha inteira um humor só. Uma casa vazia não anula um aspecto que envolva um planeta em outra casa; os aspectos ignoram paredes. As casas precisam da hora de nascimento; os aspectos entre planetas não precisam.',
        ],
      },
      {
        heading: 'Como o SideraChart mostra os aspectos',
        paragraphs: [
          'Linhas coloridas dentro da roda; uma tabela ordenável abaixo dela. Esconda as linhas se o desenho ficar carregado. A sinastria usa os mesmos orbes entre os planetas de duas pessoas. Os mapas compostos têm seus próprios pontos médios e depois os seus próprios aspectos internos. Os trânsitos diários do painel ficam guardados ao meio-dia do horário natal e usam os mesmos nomes de aspecto contra a linha de base natal.',
          'Ao comparar com o astro-seek ou similares, ajuste tropical, o mesmo fuso e orbes comparáveis. Um aspecto ausente costuma ser questão de orbe ou de ajuste sideral. Placidus contra Signos Inteiros não altera os aspectos eclípticos entre planetas; altera frases baseadas em casas que você pode misturar por engano.',
          'Leia aplicativo contra separativo como uma nota do momento do nascimento e siga em frente. Isso não diz quando um acontecimento virá anos depois. Os trânsitos reaproveitam os mesmos nomes de aspecto contra um céu em movimento, guardados ao meio-dia do horário natal no painel. É outro relógio, diferente da marca de aplicativo natal.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quais são os aspectos maiores na astrologia?',
        a: 'Conjunção, sextil, quadratura, trígono e oposição. São os cinco que o SideraChart desenha. Os orbes são 8°, 6° e 4°, conforme o aspecto.',
      },
      {
        q: 'O que quer dizer orbe na astrologia?',
        a: 'Quantos graus um aspecto pode se afastar do exato e ainda contar. Orbes mais fechados são mais fortes no instrumento. O conjunto do SideraChart é 8° / 6° / 4°.',
      },
      {
        q: 'Quadraturas são ruins?',
        a: 'São atrito, não maldição. Leia-as como trabalho entre duas funções. Não as trate como vereditos médicos ou morais.',
      },
      {
        q: 'Preciso da hora de nascimento para ver aspectos?',
        a: 'Não para os aspectos entre planetas. Você precisa da hora para os aspectos ao Ascendente e para aspectos lunares que ficam perto de uma borda de orbe.',
      },
    ],
  },
  'tropical-vs-sidereal': {
    title: 'Zodíaco tropical ou sideral',
    excerpt:
      'O zodíaco tropical começa no equinócio de março. O sideral usa um ponto zero estelar, hoje a cerca de 24° de distância. O SideraChart é só tropical — não védico, não Swiss Ephemeris.',
    sections: [
      {
        heading: 'Zodíaco tropical ou sideral',
        paragraphs: [
          'Tropical contra sideral é uma discussão sobre o ponto zero. Os dois zodíacos dividem a eclíptica em doze signos de 30° com os mesmos nomes. Eles não começam no mesmo lugar. O 0° de Áries tropical é o equinócio de março — a passagem do Sol pelo equador celeste. O 0° de Áries sideral está preso a uma referência estelar (um ayanamsha). Como o eixo da Terra precessa, esses dois zeros hoje se afastaram cerca de 24°.',
          'Essa diferença é o motivo de o seu signo solar em um aplicativo védico ser muitas vezes o signo anterior em relação ao SideraChart. Nenhum dos dois calculadores está "errado sobre o céu". Eles usam origens diferentes para a mesma faixa de nomes. O SideraChart é tropical: convenção ocidental, baseada no equinócio, astronomy-engine (VSOP87). Não calcula sistemas siderais, védicos ou chineses.',
        ],
      },
      {
        heading: 'O que o zodíaco tropical mede',
        paragraphs: [
          'Os signos tropicais são estações da órbita da Terra, não fotografias de constelações. As constelações são desiguais e precessam. Áries tropical começa quando dia e noite se igualam em março (no sentido do equinócio no calendário do hemisfério norte), independentemente de que campo de estrelas esteja hoje atrás desse ponto. A astrologia natal ocidental — este site incluído — lê esses signos sazonais.',
          'Os seus planetas natais no SideraChart são longitudes tropicais aparentes da data. As casas (Placidus por padrão) repousam sobre essa eclíptica tropical. Data, hora e local de nascimento continuam importando do jeito de sempre: a hora para o Ascendente, hora desconhecida = planetas sim, casas não. Trocar de zodíaco é um botão separado de trocar de sistema de casas.',
        ],
      },
      {
        heading: 'O que o zodíaco sideral mede',
        paragraphs: [
          'A prática sideral busca manter os signos alinhados a um referencial estelar. Ayanamshas diferentes (Lahiri e outros) escolhem deslocamentos ligeiramente diferentes. A astrologia natal indiana costuma ser sideral e frequentemente usa signos inteiros ou outros métodos de casas que não são os padrões deste site. Se você quer esse mapa, precisa daquele motor. O SideraChart não vai fingir que é ele.',
          'Os sistemas natais chineses são outra pilha ainda — não tropical, não a mesma roda de doze signos. Não cole um animal do ano chinês em um Sol tropical e chame de mesma coordenada. Se você chegou aqui vindo de uma busca misturada, escolha um sistema e permaneça nele enquanto aprende.',
        ],
      },
      {
        heading: 'A diferença de cerca de 24° e o ayanamsha',
        paragraphs: [
          'Vinte e quatro graus são cerca de quatro quintos de um signo. Por isso muitas posições caem no signo tropical anterior quando você troca para sideral. Um Sol tropical em Gêmeos vira, com frequência, um Sol sideral em Touro. Luas perto de uma fronteira viram mais vezes, porque a Lua é rápida. Os ascendentes também viram, porque o Ascendente é um grau.',
          'Se você compara dois sites tropicais e eles já discordam em um signo, olhe primeiro a hora de nascimento e o fuso, não o ayanamsha. O sideral é a explicação quando um site é explicitamente védico ou "sideral" e o outro é ocidental tropical. O SideraChart não vai bater com uma impressão Lahiri. Isso é esperado.',
        ],
      },
      {
        heading: 'Por que o SideraChart é só tropical',
        paragraphs: [
          'O produto é um calculador ocidental de mapa astral: zodíaco tropical, Placidus por padrão, Signos Inteiros opcional, aspectos maiores em 8° / 6° / 4°, posições de classe VSOP87 pela astronomy-engine, fusos IANA. Não é Swiss Ephemeris. Não é um botão sideral. Manter um único ponto zero evita um erro silencioso de 24° quando você pensa estar olhando "o mesmo mapa".',
          'Use tropical se quiser ler textos ocidentais, a maior parte dos manuais natais em inglês e a camada escrita deste site. Use um especialista sideral se essa for a sua tradição. Não faça a média dos dois Sóis. Não trate a discordância como crise de identidade. É um choque de sistemas de coordenadas.',
        ],
      },
      {
        heading: 'Batendo com outros sites',
        paragraphs: [
          'No astro-seek, no astro.com e similares, ajuste tropical + Placidus (ou Signos Inteiros, se foi o que você usou) e a mesma hora de nascimento. Você deve cair a uma fração de grau nos planetas. Se estiver fora por um signo, você está em sideral ou com o relógio errado. Se as casas diferem mas os planetas coincidem, há divergência de sistema de casas.',
          'Os trânsitos do painel do SideraChart são trânsitos tropicais guardados ao meio-dia do fuso natal. Misturar natal tropical com trânsitos siderais é o mesmo erro de 24°, em movimento. Mantenha o zodíaco consistente. O mapa astral é a linha de base; os trânsitos são clima sobre essa linha, no mesmo sistema de coordenadas.',
          'Se você publicar um mapa, nomeie o zodíaco na legenda: tropical, Placidus, hora de nascimento conhecida ou desconhecida. Essa única linha evita a maioria das discussões do tipo "seu calculador está errado". A legenda do SideraChart já mostra tropical e Placidus quando a roda está completa.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é a diferença entre zodíaco tropical e sideral?',
        a: 'O tropical mede a partir do equinócio da primavera. O sideral mede a partir de um ponto zero estelar. Hoje eles diferem em cerca de 24°, muitas vezes um signo inteiro.',
      },
      {
        q: 'Que zodíaco o SideraChart usa?',
        a: 'Só o tropical, com posições da astronomy-engine (VSOP87). Ele não calcula mapas siderais, védicos ou chineses e não usa o Swiss Ephemeris.',
      },
      {
        q: 'Por que meu signo solar é diferente na astrologia védica?',
        a: 'A prática védica costuma ser sideral. O seu Sol tropical continua sendo a longitude baseada no equinócio. O nome do signo mudou porque o ponto zero mudou.',
      },
      {
        q: 'Devo usar tropical ou sideral?',
        a: 'Use tropical para bater com os textos natais ocidentais e com este calculador. Use sideral se você trabalha nessa tradição. Não misture os dois numa mesma leitura.',
      },
    ],
  },
  'synastry-vs-composite': {
    title: 'Sinastria ou mapa composto',
    excerpt:
      'A sinastria sobrepõe dois mapas astrais e lista os aspectos entre eles. O mapa composto tira a média das longitudes e forma uma terceira roda. Eles respondem perguntas diferentes.',
    sections: [
      {
        heading: 'Sinastria ou mapa composto',
        paragraphs: [
          'Sinastria e mapa composto são dois desenhos de relacionamento diferentes, não dois nomes para o mesmo desenho. A sinastria mantém as duas pessoas. Você calcula dois mapas astrais, sobrepõe os planetas e lista os aspectos da pessoa A à pessoa B. O mapa composto descarta as duas rodas como pessoas separadas e constrói um terceiro mapa a partir de pontos médios. As pessoas buscam a comparação porque os aplicativos usam as palavras como se fossem intercambiáveis. Não são.',
          'O SideraChart oferece os dois como calculadores separados. Cada mapa natal é tropical, Placidus por padrão, VSOP87 pela astronomy-engine. Os aspectos de sinastria usam os mesmos orbes da tabela natal: 8° para conjunção e oposição, 6° para quadratura e trígono, 4° para sextil. Nenhuma das rodas é um veredito sobre ficar junto, casar ou dividir bens. São diagramas.',
        ],
      },
      {
        heading: 'O que a sinastria faz',
        paragraphs: [
          'A sinastria deixa os dois mapas intactos. No SideraChart, um conjunto de glifos é a pessoa A e o outro é a pessoa B. A tabela lista os aspectos entre os mapas, não os aspectos internos de um mapa natal. Você está perguntando o que acontece quando dois céus dividem a mesma cozinha: o Saturno dela sobre a Lua dele, o Marte dele sobre o Ascendente dela, um trígono Sol-Sol.',
          'Cada pessoa continua precisando da própria data, hora e local de nascimento. Se uma das horas for desconhecida, o Ascendente e as casas daquela pessoa caem fora. Você ainda pode fazer sinastria de planeta a planeta. O que não pode, honestamente, é falar de "os planetas dele na sua sétima casa" sem o ascendente daquela pessoa. Hora desconhecida = planetas sim, casas não — por mapa.',
        ],
      },
      {
        heading: 'O que o mapa composto faz',
        paragraphs: [
          'O composto pega cada par de planetas natais (o Sol de A e o Sol de B, a Lua de A e a Lua de B, e assim por diante), encontra o ponto médio pelo arco menor e desenha uma roda nova. O resultado é o relacionamento como terceira entidade, não uma das duas pessoas. Não é um mapa Davison, que tira o ponto médio no tempo e no espaço para um nascimento hipotético do relacionamento.',
          'As casas do composto ainda dependem de uma convenção de lugar e, na prática, de um modo de definir os ângulos. Leia o composto como um instrumento à parte. Não misture os significados das casas natais de uma pessoa nos pontos médios do composto sem perceber que você trocou de desenho. O calculador de composto do SideraChart é essa terceira roda, não uma sobreposição de sinastria.',
        ],
      },
      {
        heading: 'Duas pessoas, duas entradas completas',
        paragraphs: [
          'Lixo na entrada, lixo na saída, duas vezes. Um fuso errado na pessoa B desloca a Lua e o Ascendente dela, o que ou aspecta a pessoa A de forma errada na sinastria ou puxa todos os pontos médios do composto. Prefira certidões. Se falta um relógio, diga isso e deixe fora da mesa as frases de sinastria baseadas em casas.',
          'Não se tira a média de dois ascendentes para obter um "ascendente do casal" na sinastria. Esse instinto pertence aos pontos médios do composto, e mesmo ali é um ângulo construído, não um bebê. Mantenha os métodos em abas separadas e deixe claro qual roda você está lendo.',
        ],
      },
      {
        heading: 'O que nenhum dos dois decide',
        paragraphs: [
          'Nem a sinastria nem o composto dizem para você se comprometer, ir embora, ter um filho ou assinar um contrato. Eles descrevem padrões de contato e uma atmosfera de ponto médio. Contatos fáceis de Vênus não são um estado civil. Contatos de Saturno não são uma pena de prisão. Se você precisa de conselhos desse tipo, precisa de outro profissional.',
          'Leia primeiro os mapas astrais, separadamente. Duas pessoas sem relação nenhuma com as próprias Luas não serão salvas por um trígono bonito de sinastria. O trio principal de cada mapa natal continua vindo primeiro. Depois sobreponha. Depois, se quiser a visão de terceira entidade, o composto.',
        ],
      },
      {
        heading: 'Como rodá-los no SideraChart',
        paragraphs: [
          'Use o calculador de sinastria para sobreposições e aspectos entre mapas. Use o calculador de composto para pontos médios. O mesmo motor tropical, não sideral, não Swiss Ephemeris. Uma rodada de relacionamento gratuita sem conta; depois é preciso entrar. Salve os mapas natais individuais se também quiser os trânsitos diários em cada painel ao meio-dia do horário natal — esses trânsitos são clima pessoal, não previsão de casal, a menos que você monte isso à parte.',
          'Ao comparar com outros sites, iguale tropical, Placidus, orbes e se eles falam de sinastria ou de composto. Um site que "combina mapas" sem dizer se é ponto médio ou sobreposição é a razão de este artigo existir. Olhe a roda: dois conjuntos de planetas significam sinastria; um conjunto de pontos médios misturados significa composto.',
          'As sobreposições de casas na sinastria exigem os dois relógios. Se a pessoa B não tem hora, você ainda tem os aspectos de planeta a planeta com orbes 8° / 6° / 4°. O que você não tem é "a Vênus dela na sua sétima". Escreva esse limite ao lado da tabela, para que a sobreposição não crie casas que não possui.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é a diferença entre sinastria e mapa composto?',
        a: 'A sinastria sobrepõe dois mapas astrais e os aspecta um ao outro. O composto constrói um terceiro mapa a partir de pontos médios planetários. Sobreposição contra média.',
      },
      {
        q: 'Qual é melhor para astrologia de relacionamento?',
        a: 'Eles respondem perguntas diferentes. Sinastria: como duas pessoas interagem. Composto: o relacionamento como um terceiro mapa. De todo modo, rode primeiro os mapas astrais.',
      },
      {
        q: 'As duas pessoas precisam da hora de nascimento?',
        a: 'Para sinastria baseada em casas e para os ângulos do composto, sim. A sinastria de planeta a planeta pode seguir só com as datas se faltarem as horas, com a cautela habitual quanto à cúspide lunar.',
      },
      {
        q: 'Mapa composto é a mesma coisa que mapa Davison?',
        a: 'Não. O composto usa pontos médios planetários. O Davison tira o ponto médio das duas horas e locais de nascimento, formando um evento hipotético. O composto do SideraChart é a roda de pontos médios.',
      },
    ],
  },
  'what-are-transits': {
    title: 'O que são trânsitos na astrologia?',
    excerpt:
      'Trânsitos são as posições de hoje comparadas ao seu mapa astral. São clima sobre uma linha de base fixa, não um mapa astral novo. O SideraChart os guarda ao meio-dia.',
    sections: [
      {
        heading: 'O que são trânsitos na astrologia?',
        paragraphs: [
          'Trânsitos são os planetas que estão no céu agora (ou numa data escolhida) medidos contra os planetas do seu mapa astral. O mapa astral fica parado: é a linha de base vinda da sua data, hora e local de nascimento. Os trânsitos se movem. Um Saturno em trânsito em quadratura ao seu Sol natal é um contato temporário entre o Saturno de hoje e o Sol com que você nasceu. As pessoas buscam "o que são trânsitos na astrologia?" quando querem saber se o mapa astral muda. Ele não muda. O clima sobre ele, sim.',
          'O SideraChart calcula os trânsitos com o mesmo motor tropical do mapa natal: astronomy-engine (VSOP87), aspectos maiores em 8° / 6° / 4°. O painel diário guarda uma sobreposição por data de calendário ao meio-dia do fuso natal, para que a nota do dia permaneça estável se você atualizar às 23:00. Datas perdidas não são preenchidas depois.',
        ],
      },
      {
        heading: 'Trânsitos e posições natais',
        paragraphs: [
          'As posições natais são um instantâneo. Os trânsitos são um segundo instantâneo comparado ao primeiro. Você precisa de um mapa astral salvo para fazer isso honestamente. Sem longitudes natais você está apenas listando o céu de hoje, o que é astronomia, não uma leitura pessoal de trânsitos.',
          'Se a hora de nascimento natal era desconhecida, as casas natais já estão fora de discussão. Planetas em trânsito "pela sua sétima casa" então não têm parede honesta por onde passar. Você ainda pode transitar aos planetas natais (Sol, Lua se o signo era seguro, Mercúrio e os demais). Hora desconhecida = planetas natais sim, casas natais não — os trânsitos herdam esse limite.',
        ],
      },
      {
        heading: 'Trânsitos rápidos e trânsitos lentos',
        paragraphs: [
          'A Lua transita um planeta natal em horas. O Sol, Mercúrio, Vênus e Marte levam de dias a semanas para cruzar um ponto natal. Júpiter e Saturno demoram mais. Urano, Netuno e Plutão podem ficar sobre um grau natal por meses, com as retrogradações esticando a história. Trânsitos rápidos são tempo do dia. Trânsitos lentos são clima. Nenhum dos dois é instrução médica ou financeira.',
          'Os nomes dos aspectos continuam os mesmos: conjunção, sextil, quadratura, trígono, oposição. Uma conjunção em trânsito à Vênus natal dentro de 8° é a mesma geometria de uma conjunção natal, só que uma ponta do aspecto está em movimento. Trânsitos aplicativos e fechados são os que valem ser listados primeiro numa nota diária.',
        ],
      },
      {
        heading: 'Por que o SideraChart usa meio-dia do fuso natal',
        paragraphs: [
          'Um "dia" de trânsitos precisa escolher um instante. Se o painel recalculasse a cada carregamento de página, a Lua vagaria e a nota não bateria com a captura de tela de ontem. Meio-dia no fuso natal é um instantâneo civil estável para aquela data. Não é a sua hora de nascimento, e não é a afirmação de que os trânsitos só importam na hora do almoço.',
          'O painel grava uma linha por data de calendário quando você o abre. Amanhã, a linha de ontem permanece. Uma semana pulada continua pulada; o produto não inventa história. Para esse diário você precisa de um mapa natal salvo e de uma conta. Os calculadores públicos continuam utilizáveis sem entrar.',
        ],
      },
      {
        heading: 'Como ler um dia de trânsitos',
        paragraphs: [
          'Liste os planetas em trânsito que fazem aspectos maiores ao Sol natal, à Lua natal, ao ascendente (se você tiver a hora) e a qualquer configuração natal fechada. Prefira os contatos lentos para a manchete e os rápidos para o clima do dia. Não promova uma quadratura da Lua em trânsito a decisão de vida. Também não ignore uma conjunção de Saturno em trânsito ao Sol natal; apenas não a transforme em conselho jurídico ou médico.',
          'Mantenha trânsitos tropicais sobre um natal tropical. Trânsitos siderais sobre um natal tropical misturam pontos zero e desperdiçam a diferença de 24°. O SideraChart não faz essa mistura. As casas natais de Placidus, se existirem, são os cômodos por onde os trânsitos passam. Casas natais vazias ainda podem receber trânsitos; o vazio dizia respeito a planetas natais, não a uma proibição de tráfego posterior.',
        ],
      },
      {
        heading: 'O que os trânsitos não são',
        paragraphs: [
          'Não são um mapa astral novo. Não são um horóscopo de signo solar de jornal, embora estejam mais perto de "a sua semana" do que a roda natal sozinha. Não são sinastria (dois mapas astrais) nem composto (pontos médios). Não são Swiss Ephemeris, dashas védicos nem pilares do dia chineses. A camada de trânsitos deste site são posições tropicais ocidentais contra um mapa natal tropical ocidental.',
          'Use-os como uma sobreposição datada. Imprima ou baixe o texto do dia se quiser um registro. Depois volte ao mapa natal quando precisar da linha de base. O mapa astral é o instrumento que você calibrou no nascimento. Os trânsitos são o céu posterior correndo por cima dele.',
          'Se você pular uma semana, deixe a lacuna. Preencher depois os instantâneos de meio-dia de dias que você não abriu seria inventar um diário que você não manteve. O mapa astral continua ali. Abra a data de hoje quando quiser o clima de hoje, não um mês reconstruído.',
        ],
      },
    ],
    faq: [
      {
        q: 'O que é um trânsito na astrologia?',
        a: 'Um contato entre um planeta no céu em determinada data e um ponto do seu mapa astral. O mapa astral fica fixo; o céu se move.',
      },
      {
        q: 'Os trânsitos mudam o meu mapa astral?',
        a: 'Não. Os trânsitos se sobrepõem ao mapa natal. O SideraChart guarda a sobreposição de cada dia ao meio-dia do fuso natal. As suas posições de nascimento não se movem.',
      },
      {
        q: 'Por que o SideraChart calcula os trânsitos diários ao meio-dia?',
        a: 'Para que a nota do dia fique estável. Meio-dia no fuso natal é um instantâneo consistente. Não é um substituto da sua hora de nascimento.',
      },
      {
        q: 'Dá para ler trânsitos sem a hora de nascimento?',
        a: 'Dá para ler trânsitos aos planetas natais. Não dá para ler honestamente trânsitos pelas casas natais sem um Ascendente.',
      },
    ],
  },
};
