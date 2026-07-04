// Dados de cada curso. As três páginas compartilham o mesmo template
// (components/CoursePage.tsx); só muda o conteúdo definido aqui.

export type CredIconKey = 'medal' | 'shield-check' | 'user' | 'truck';
export type LearnIconKey = 'shield' | 'clipboard' | 'document' | 'truck';

export interface Credibility {
  icon: CredIconKey;
  text: string;
}

export interface LearnCard {
  icon: LearnIconKey;
  title: string;
  text: string;
}

export interface StatCard {
  value: string;
  label: string;
  /** Tamanho da fonte do número (px). Padrão 30. */
  size?: number;
  /** Ocupa as duas colunas do grid. */
  wide?: boolean;
}

export interface StepCard {
  label: string;
  value: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Course {
  /** Segmento da rota ('' = página inicial). */
  slug: string;
  /** Nome usado nas mensagens de WhatsApp. */
  courseName: string;
  meta: { title: string; description: string };
  hero: {
    badge: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    paragraph: string;
    chips?: string[];
    /** Foto real do equipamento; quando ausente, mostra um slot pontilhado. */
    image?: { src: string; alt: string };
    imagePlaceholder: string;
  };
  credibility: Credibility[];
  learn: { intro: string; cards: LearnCard[] };
  market: {
    kicker: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    paragraph: string;
    sectors: string[];
    stats: StatCard[];
  };
  steps: StepCard[];
  investimento: { intro: string; preco: string; precoDetalhe: string };
  testimonials: Testimonial[];
  faqs: Faq[];
}

const PRECO_DETALHE = 'ou à vista com desconto, consulte condições no WhatsApp';

export const maquinasPesadas: Course = {
  slug: '',
  courseName: 'Curso de Operador de Máquinas Pesadas',
  meta: {
    title: 'Curso de Operador de Máquinas Pesadas | Instituto Top',
    description:
      'Aprenda a operar retroescavadeira, pá carregadeira, escavadeira hidráulica, motoniveladora e rolo compactador. Teoria online e prática de verdade em Santa Cruz do Sul. Certificado válido em todo o Brasil.',
  },
  hero: {
    badge: 'Formação em 5 máquinas · Turmas abertas em Santa Cruz do Sul',
    titlePre: 'Aprenda a operar as ',
    titleHighlight: '5 máquinas',
    titlePost: ' que pagam os melhores salários da obra',
    paragraph:
      'Retroescavadeira, pá carregadeira, escavadeira hidráulica, motoniveladora e rolo compactador. Teoria online no seu ritmo e horas de máquina de verdade no campo.',
    chips: [
      'Retroescavadeira',
      'Pá carregadeira',
      'Escavadeira hidráulica',
      'Motoniveladora',
      'Rolo compactador',
    ],
    imagePlaceholder: 'Foto: máquina pesada em operação',
  },
  credibility: [
    { icon: 'medal', text: 'Certificado válido em todo o Brasil' },
    { icon: 'shield-check', text: 'Treinamento conforme a NR-12' },
    { icon: 'user', text: 'Instrutores com anos de operação' },
    { icon: 'truck', text: 'Prática em 5 máquinas' },
  ],
  learn: {
    intro:
      'Do primeiro comando à manobra fina. Você sai daqui operando as 5 máquinas.',
    cards: [
      {
        icon: 'shield',
        title: 'Operação segura',
        text: 'Comandos, manobras, escavação, carregamento, nivelamento e compactação com técnica e segurança.',
      },
      {
        icon: 'clipboard',
        title: 'Inspeção do equipamento',
        text: 'Checklist diário, sistemas hidráulicos, lubrificação e identificação de falhas antes de operar.',
      },
      {
        icon: 'document',
        title: 'Legislação e normas',
        text: 'NR-12 e normas de segurança no canteiro, responsabilidades do operador e documentação.',
      },
      {
        icon: 'truck',
        title: 'Prática em campo',
        text: 'Horas de máquina nas 5 categorias, com instrutor ao lado, simulando situações reais de obra.',
      },
    ],
  },
  market: {
    kicker: 'Mercado de trabalho',
    titlePre: 'Onde tem obra, ',
    titleHighlight: 'tem vaga',
    titlePost: '',
    paragraph:
      'Obra nenhuma para por falta de serviço. Para por falta de operador. E quem opera mais de uma máquina escolhe onde vai trabalhar.',
    sectors: [
      'Construção pesada',
      'Terraplenagem',
      'Mineração',
      'Agronegócio',
      'Prefeituras e obras públicas',
    ],
    stats: [
      {
        value: 'R$ 2.800 a R$ 5.000',
        label: 'média para operadores, fora diárias, adicionais e horas extras',
      },
      {
        value: '5 máquinas',
        label: 'um só curso, cinco portas de entrada no mercado',
        size: 34,
      },
      {
        value: 'Falta de operadores',
        label:
          'construtoras e empresas de terraplenagem relatam escassez de operadores certificados na região',
        size: 34,
        wide: true,
      },
    ],
  },
  steps: [
    {
      label: 'Carga horária',
      value: '40 horas',
      desc: 'Teoria e prática nas 5 máquinas, em horários que cabem na sua rotina.',
    },
    {
      label: 'Modalidade',
      value: 'Híbrido',
      desc: 'Teoria online no seu ritmo e prática presencial em Santa Cruz do Sul.',
    },
    {
      label: 'Certificado',
      value: 'Imediato',
      desc: 'Emitido na conclusão, válido em todo o Brasil, com as 5 máquinas discriminadas.',
    },
    {
      label: 'Pré-requisitos',
      value: '18 anos +',
      desc: 'Documento com foto e saber ler e escrever. Não precisa de experiência.',
    },
  ],
  investimento: {
    intro:
      'As 5 máquinas no mesmo curso, com material, horas de prática e certificado. Sem taxa escondida.',
    preco: '12x de R$ 189,00',
    precoDetalhe: PRECO_DETALHE,
  },
  testimonials: [
    {
      quote:
        'Trabalhava de servente. Hoje opero retroescavadeira numa empresa de terraplenagem e tiro quase o dobro do que ganhava.',
      name: 'Rodrigo Machado',
      role: 'Operador de retroescavadeira',
    },
    {
      quote:
        'O diferencial é praticar em todas as máquinas. Na entrevista falei que operava escavadeira e pá carregadeira. Me contrataram na hora.',
      name: 'Vanderlei Costa',
      role: 'Operador de máquinas · Construção pesada',
    },
    {
      quote:
        'Fiz pensando no agro. Hoje opero pá carregadeira na cooperativa e ainda pego diária de rolo compactador no fim de semana.',
      name: 'Marcos Antônio Ruas',
      role: 'Operador · Agroindústria',
    },
  ],
  faqs: [
    {
      q: 'O certificado é reconhecido?',
      a: 'Sim. O certificado é emitido conforme as normas de segurança aplicáveis, com as 5 máquinas discriminadas, e é válido em todo o território nacional.',
    },
    {
      q: 'Preciso ter experiência para fazer o curso?',
      a: 'Não. O curso começa do zero: você aprende toda a teoria e pratica em cada máquina com acompanhamento do instrutor.',
    },
    {
      q: 'Quanto tempo dura o curso?',
      a: 'São 40 horas no total, no formato híbrido: teoria online no seu ritmo e prática presencial em Santa Cruz do Sul.',
    },
    {
      q: 'Tem aula prática em todas as máquinas?',
      a: 'Sim. Você pratica na retroescavadeira, pá carregadeira, escavadeira hidráulica, motoniveladora e rolo compactador, em ambiente controlado.',
    },
    {
      q: 'Preciso de CNH?',
      a: 'Para operar dentro de canteiros e áreas privadas, o certificado de treinamento é suficiente. A CNH só é exigida quando a máquina circula por vias públicas.',
    },
    {
      q: 'O certificado tem validade?',
      a: 'A boa prática do mercado é fazer a reciclagem periódica (em geral a cada 1 a 2 anos, conforme a política da empresa). Avisamos você quando for a hora.',
    },
  ],
};

export const empilhadeira: Course = {
  slug: 'empilhadeira',
  courseName: 'Curso de Operador de Empilhadeira (NR-11)',
  meta: {
    title: 'Curso de Operador de Empilhadeira (NR-11) | Instituto Top',
    description:
      'Certificação NR-11 para operar empilhadeira. Teoria online, prática de verdade na máquina e certificado aceito em qualquer empresa do país. Do zero ao operador em 20 horas, em Santa Cruz do Sul.',
  },
  hero: {
    badge: 'Certificação NR-11 · Turmas abertas em Santa Cruz do Sul',
    titlePre: 'Opere empilhadeira com ',
    titleHighlight: 'certificado NR-11',
    titlePost: ' e entre na frente da fila das vagas',
    paragraph:
      'Teoria online no seu ritmo, prática de verdade na máquina e certificado aceito em qualquer empresa do país. Do zero ao operador em 20 horas.',
    imagePlaceholder: 'Foto: empilhadeira em operação',
  },
  credibility: [
    { icon: 'medal', text: 'Certificado válido em todo o Brasil' },
    { icon: 'shield-check', text: 'Conforme a NR-11' },
    { icon: 'user', text: 'Instrutores com anos de operação' },
    { icon: 'truck', text: 'Aulas práticas de verdade' },
  ],
  learn: {
    intro:
      'Nada de enrolação. Só o que você precisa dominar para operar bem e passar em qualquer avaliação de empresa.',
    cards: [
      {
        icon: 'shield',
        title: 'Operação segura',
        text: 'Técnicas de condução, movimentação e empilhamento de cargas, estabilidade e prevenção de acidentes.',
      },
      {
        icon: 'clipboard',
        title: 'Inspeção do equipamento',
        text: 'Checklist diário, itens de segurança, manutenção preventiva e quando não operar a máquina.',
      },
      {
        icon: 'document',
        title: 'Legislação e NR-11',
        text: 'O que a norma exige, responsabilidades do operador, sinalização e documentação obrigatória.',
      },
      {
        icon: 'truck',
        title: 'Prática em campo',
        text: 'Manobras reais com empilhadeira, acompanhado de instrutor, em ambiente controlado.',
      },
    ],
  },
  market: {
    kicker: 'Mercado de trabalho',
    titlePre: 'Um mercado que ',
    titleHighlight: 'não para de contratar',
    titlePost: '',
    paragraph:
      'Todo galpão, obra e indústria precisa de gente certificada na empilhadeira. A NR-11 exige treinamento, e a empresa só pode colocar na máquina quem tem o certificado. Quem tem, sai na frente.',
    sectors: [
      'Logística',
      'Construção civil',
      'Indústria',
      'Atacado e distribuição',
      'Agroindústria',
    ],
    stats: [
      {
        value: 'R$ 2.200 a R$ 3.800',
        label: 'média para operadores, fora adicionais e horas extras',
      },
      {
        value: 'Alta demanda',
        label: 'vagas constantes em centros de distribuição da região',
        size: 34,
      },
      {
        value: 'Certificação obrigatória',
        label:
          'a NR-11 exige treinamento para operar empilhadeira. Sem certificado, a empresa nem pode contratar',
        size: 34,
        wide: true,
      },
    ],
  },
  steps: [
    {
      label: 'Carga horária',
      value: '20 horas',
      desc: 'Teoria e prática, com turmas em horários que cabem na sua rotina.',
    },
    {
      label: 'Modalidade',
      value: 'Híbrido',
      desc: 'Teoria online no seu ritmo e prática presencial em Santa Cruz do Sul.',
    },
    {
      label: 'Certificado',
      value: 'Imediato',
      desc: 'Emitido na conclusão, válido em todo o Brasil conforme a NR-11.',
    },
    {
      label: 'Pré-requisitos',
      value: '18 anos +',
      desc: 'Documento com foto e saber ler e escrever. Não precisa de experiência.',
    },
  ],
  investimento: {
    intro: 'Tudo incluso: material, horas de prática e certificado. Sem taxa escondida.',
    preco: '12x de R$ 135,00',
    precoDetalhe: PRECO_DETALHE,
  },
  testimonials: [
    {
      quote:
        'Fiz o curso num fim de semana e em menos de um mês já estava puxando carga num centro de distribuição. A prática faz toda a diferença.',
      name: 'Jonas Ferreira',
      role: 'Operador de empilhadeira · Logística',
    },
    {
      quote:
        'Nunca tinha sentado numa empilhadeira. Os instrutores têm paciência de ensinar do zero e o certificado saiu no mesmo dia.',
      name: 'Ana Paula Souza',
      role: 'Auxiliar de expedição',
    },
    {
      quote:
        'A empresa pedia a NR-11 para me promover. Fiz o curso no Instituto Top e no mês seguinte já estava no cargo novo, com aumento.',
      name: 'Carlos Eduardo Lima',
      role: 'Almoxarife · Indústria',
    },
  ],
  faqs: [
    {
      q: 'O certificado é reconhecido?',
      a: 'Sim. O certificado é emitido conforme a NR-11 e válido em todo o território nacional, aceito por empresas de todos os portes.',
    },
    {
      q: 'Preciso ter experiência para fazer o curso?',
      a: 'Não. O curso começa do zero: você aprende toda a teoria e pratica na máquina com acompanhamento do instrutor.',
    },
    {
      q: 'Quanto tempo dura o curso?',
      a: 'São 20 horas no total, no formato híbrido: teoria online no seu ritmo e prática presencial em Santa Cruz do Sul.',
    },
    {
      q: 'Tem aula prática de verdade?',
      a: 'Sim. A parte prática é feita presencialmente, operando a empilhadeira em ambiente controlado, com instrutor ao lado.',
    },
    {
      q: 'Preciso de CNH para operar empilhadeira?',
      a: 'Não. Para operar empilhadeira dentro de áreas privadas (galpões, pátios, indústrias) basta o certificado de treinamento conforme a NR-11.',
    },
    {
      q: 'O certificado tem validade?',
      a: 'A boa prática do mercado é fazer a reciclagem periódica (em geral a cada 1 a 2 anos, conforme a política da empresa). Avisamos você quando for a hora.',
    },
  ],
};

export const motoniveladora: Course = {
  slug: 'motoniveladora',
  courseName: 'Curso de Operador de Motoniveladora',
  meta: {
    title: 'Curso de Operador de Motoniveladora | Instituto Top',
    description:
      'Aprenda a operar motoniveladora (patrola): nivelamento fino, abaulamento e acabamento de pista. Uma das funções mais escassas e bem pagas do setor. Curso híbrido em Santa Cruz do Sul.',
  },
  hero: {
    badge: 'Formação especializada · Turmas abertas em Santa Cruz do Sul',
    titlePre: 'Opere ',
    titleHighlight: 'motoniveladora',
    titlePost: ', a máquina mais valorizada do canteiro',
    paragraph:
      'Poucos sabem operar a patrola de verdade. Quem domina o nivelamento fino é disputado por construtoras, prefeituras e empresas de terraplenagem.',
    image: { src: '/assets/motoniveladora-hero.jpeg', alt: 'Motoniveladora em operação' },
    imagePlaceholder: 'Foto: motoniveladora em operação',
  },
  credibility: [
    { icon: 'medal', text: 'Certificado válido em todo o Brasil' },
    { icon: 'shield-check', text: 'Treinamento conforme a NR-12' },
    { icon: 'user', text: 'Instrutores com anos de operação' },
    { icon: 'truck', text: 'Horas de máquina de verdade' },
  ],
  learn: {
    intro:
      'Do primeiro comando ao acabamento fino de pista. A patrola exige técnica, e é isso que você vai dominar.',
    cards: [
      {
        icon: 'shield',
        title: 'Operação e nivelamento',
        text: 'Comandos da lâmina, ângulos de corte, nivelamento de pista, abaulamento e acabamento fino.',
      },
      {
        icon: 'clipboard',
        title: 'Inspeção do equipamento',
        text: 'Checklist diário, sistema hidráulico, círculo e lâmina, lubrificação e quando não operar a máquina.',
      },
      {
        icon: 'document',
        title: 'Legislação e normas',
        text: 'NR-12 e segurança no canteiro, sinalização, responsabilidades do operador e documentação.',
      },
      {
        icon: 'truck',
        title: 'Prática em campo',
        text: 'Horas de patrola com instrutor ao lado, simulando serviços reais de estrada e canteiro.',
      },
    ],
  },
  market: {
    kicker: 'Mercado de trabalho',
    titlePre: 'O operador de patrola ',
    titleHighlight: 'dita o ritmo da obra',
    titlePost: '',
    paragraph:
      'Toda estrada, loteamento e pátio passa pela motoniveladora. É uma das funções mais escassas do setor, e por isso uma das mais bem pagas.',
    sectors: [
      'Estradas e rodovias',
      'Terraplenagem',
      'Prefeituras e obras públicas',
      'Mineração',
      'Agronegócio',
    ],
    stats: [
      {
        value: 'R$ 3.500 a R$ 6.000',
        label: 'média para patroleiros experientes, fora diárias e horas extras',
      },
      {
        value: 'Profissão escassa',
        label: 'poucos operadores dominam o nivelamento fino, e o mercado sabe disso',
      },
      {
        value: 'Porta de entrada',
        label:
          'quem opera patrola assume as frentes de serviço mais importantes e negocia melhor o próprio salário',
        wide: true,
      },
    ],
  },
  steps: [
    {
      label: 'Carga horária',
      value: '40 horas',
      desc: 'Teoria e prática na patrola, em horários que cabem na sua rotina.',
    },
    {
      label: 'Modalidade',
      value: 'Híbrido',
      desc: 'Teoria online no seu ritmo e prática presencial em Santa Cruz do Sul.',
    },
    {
      label: 'Certificado',
      value: 'Imediato',
      desc: 'Emitido na conclusão, válido em todo o Brasil.',
    },
    {
      label: 'Pré-requisitos',
      value: '18 anos +',
      desc: 'Documento com foto e saber ler e escrever. Não precisa de experiência.',
    },
  ],
  investimento: {
    intro: 'Tudo incluso: material, horas de prática e certificado. Sem taxa escondida.',
    preco: '12x de R$ 189,00',
    precoDetalhe: PRECO_DETALHE,
  },
  testimonials: [
    {
      quote:
        'Já operava retroescavadeira, mas a patrola era outro nível. Depois do curso assumi a frente de nivelamento e o salário acompanhou.',
      name: 'Gilberto Ramos',
      role: 'Patroleiro · Terraplenagem',
    },
    {
      quote:
        'A prefeitura da minha cidade vivia sem operador de patrola. Fiz o curso, passei no processo seletivo e hoje cuido das estradas do interior.',
      name: 'Nelson Petry',
      role: 'Operador · Obras públicas',
    },
    {
      quote:
        'O instrutor ensina o segredo do acabamento fino, coisa que só quem passou anos na máquina sabe. Valeu cada hora de prática.',
      name: 'Adriano Weber',
      role: 'Patroleiro · Construção pesada',
    },
  ],
  faqs: [
    {
      q: 'O certificado é reconhecido?',
      a: 'Sim. O certificado é emitido conforme as normas de segurança aplicáveis e válido em todo o território nacional, aceito por construtoras, prefeituras e empresas de terraplenagem.',
    },
    {
      q: 'Preciso ter experiência para fazer o curso?',
      a: 'Não. O curso começa do zero: você aprende toda a teoria e pratica na máquina com acompanhamento do instrutor. Quem já opera outra máquina evolui ainda mais rápido.',
    },
    {
      q: 'Quanto tempo dura o curso?',
      a: 'O curso é no formato híbrido: teoria online no seu ritmo e prática presencial em Santa Cruz do Sul. Consulte a carga horária da próxima turma pelo WhatsApp.',
    },
    {
      q: 'Tem aula prática de verdade?',
      a: 'Sim. Você pratica na motoniveladora com o instrutor ao lado, simulando serviços reais de nivelamento, abaulamento e acabamento de pista.',
    },
    {
      q: 'Preciso de CNH?',
      a: 'Para operar dentro de canteiros e áreas privadas, o certificado de treinamento é suficiente. A CNH só é exigida quando a máquina circula por vias públicas.',
    },
    {
      q: 'O certificado tem validade?',
      a: 'A boa prática do mercado é fazer a reciclagem periódica (em geral a cada 1 a 2 anos, conforme a política da empresa). Avisamos você quando for a hora.',
    },
  ],
};
