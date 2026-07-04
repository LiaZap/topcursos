# Handoff: Instituto Top — Landing pages de cursos (institutotopcursos.site)

## Overview
Três landing pages de captação de leads para o Instituto Top (escola de cursos profissionalizantes de operação de equipamentos, Santa Cruz do Sul/RS). Cada página converte de duas formas: (1) formulário de inscrição que registra o lead e abre o WhatsApp com mensagem pronta; (2) botões/CTAs diretos de WhatsApp. O site final deve servir as três páginas por rotas no domínio **institutotopcursos.site**.

## About the Design Files
Os arquivos `.dc.html` neste pacote são **referências de design em HTML** — protótipos que mostram o visual e o comportamento pretendidos, não código de produção para copiar diretamente. A tarefa é **recriar essas páginas no codebase de destino** usando os padrões dele. Se ainda não existe codebase, a recomendação é **Next.js (App Router) com deploy na Vercel** (ou Astro, já que as páginas são majoritariamente estáticas), apontando o domínio institutotopcursos.site.

Nota sobre o formato: cada `.dc.html` contém o markup dentro de `<x-dc>…</x-dc>` (todo estilizado inline) e a lógica numa classe `Component` dentro de `<script type="text/x-dc">` no fim do arquivo. Ignore o runtime (`support.js`, `sc-for`, `sc-if`, `x-import`, `{{ holes }}`) — leia o markup como especificação visual e a classe como especificação de comportamento (validação, máscara, webhook, link de WhatsApp).

## Fidelity
**High-fidelity.** Cores, tipografia, espaçamentos, copy e interações são finais. Recriar pixel-perfect.

## Rotas propostas
| Rota | Página | Arquivo de referência |
|---|---|---|
| `/` | **Página principal: Curso de Operador de Máquinas Pesadas** | `Curso Maquinas Pesadas.dc.html` |
| `/empilhadeira` | Curso de Operador de Empilhadeira (NR-11) | `Curso Empilhadeira.dc.html` |
| `/motoniveladora` | Curso de Operador de Motoniveladora | `Curso Motoniveladora.dc.html` |

As três páginas compartilham o mesmo layout/componentes — implemente um template único de landing parametrizado por curso (dados em um arquivo `courses.ts`/JSON) e três rotas que o instanciam.

## Estrutura de cada página (idêntica nas três, só muda conteúdo)
1. **Faixa de segurança** — barra de 8px, listras diagonais `repeating-linear-gradient(-45deg, #FFB800 0 16px, #16181D 16px 32px)`.
2. **Header sticky** — fundo branco, borda inferior `1px #E6E9EE`, logo (64px de altura) à esquerda, botão amarelo "Quero me inscrever" à direita (rola até o formulário). Container `max-width: 1140px`.
3. **Hero** — fundo `linear-gradient(135deg, #12141A 0%, #1C2230 60%, #1B4B9B 140%)`, grid 2 colunas (colapsa em 1 no mobile via `repeat(auto-fit, minmax(300px, 1fr))`). Coluna esquerda: badge (borda/texto #FFB800 sobre `rgba(255,184,0,.15)`), H1 em Barlow Condensed 800 uppercase `clamp(36px, 5.2vw, 58px)` com um trecho em #FFB800, parágrafo #C9D2E0 18px, dois CTAs (amarelo "Quero me inscrever" + verde WhatsApp #25D366 com ícone). Coluna direita: imagem do equipamento 380px de altura, `border-radius: 16px` (na página motoniveladora é foto real `assets/motoniveladora-hero.jpeg`; nas outras duas é um slot para o cliente subir a foto — implementar como `<img>` normal quando as fotos chegarem). A página Máquinas Pesadas tem uma linha extra de 5 chips (pills) com os nomes das máquinas.
4. **Barra de credibilidade** — fundo #FFB800, 4 itens (grid auto-fit minmax 220px): ícone SVG 28px traço #16181D + texto Barlow 700 16px.
5. **O que você vai aprender** — fundo branco, kicker (13px, letter-spacing 2.5px, #1B4B9B) + H2, 4 cards fundo #F3F5F8 radius 14px padding 26px, cada um com ícone em quadrado 46px #1B4B9B radius 10px, título Barlow 700 20px, texto #5B6472.
6. **Mercado de trabalho** — fundo #16181D, texto branco, kicker #FFB800. Esquerda: H2 + parágrafo #C9D2E0 + pills de setores (`rgba(255,255,255,.08)` com borda `rgba(255,255,255,.18)`, radius 999px). Direita: 3 stat-cards fundo #1C2230 radius 14px, número Barlow Condensed 800 30px #FFB800 + legenda 14px #C9D2E0 (o terceiro card ocupa as 2 colunas).
7. **Como funciona** — fundo #F3F5F8, 4 cards brancos com `border-top: 4px solid #FFB800`: label 13px #1B4B9B uppercase, valor Barlow Condensed 800 30px, descrição. (Carga horária / Modalidade Híbrido / Certificado Imediato / Pré-requisitos 18 anos +.)
8. **Investimento** — card escuro #16181D centralizado `max-width: 760px` radius 20px, com a faixa listrada no topo, preço em Barlow Condensed 800 `clamp(40px, 6vw, 56px)` #FFB800, botão "Garantir minha vaga". Preço atual: placeholder "12x de R$ 00,00" — **confirmar valores reais com o cliente**.
9. **Depoimentos** — fundo #F3F5F8, 3 cards brancos: aspas grandes "“" (Barlow Condensed 800 54px #FFB800), texto 16px #39414D, avatar circular 52px + nome/função. Depoimentos são fictícios (troca prevista pelos reais).
10. **FAQ** — accordion de 6 itens, borda #E6E9EE radius 12px, pergunta Barlow 700 16px com ícone +/− em #1B4B9B, um item aberto por vez.
11. **Formulário de inscrição** — seção fundo `linear-gradient(135deg, #1B4B9B, #12315F)`, card branco `max-width: 560px` radius 20px, sombra `0 20px 60px rgba(0,0,0,.3)`. Campos: Nome completo, WhatsApp (máscara), E-mail, Cidade. Botão amarelo "Garantir minha vaga". Mensagem de sucesso verde (#1E8A4C sobre #E8F6EE). Microcopy de privacidade em 12.5px #9AA3AF.
12. **Rodapé** — fundo #16181D, 3 colunas: logo circular branco 80px + descrição; contato (telefone com ícone, endereço "Rua Ernesto Alves, Santa Cruz do Sul, RS", ícones sociais Instagram/Facebook 40px); CTA WhatsApp verde. Copyright em 13px #7A8494. `padding-bottom: 90px` para não colidir com o botão flutuante.
13. **Botão flutuante WhatsApp** — `position: fixed; bottom: 20px; right: 20px`, círculo 60px #25D366, `z-index: 100`, presente na página inteira.

## Interactions & Behavior
- **Scroll suave** para o formulário em todos os CTAs "Quero me inscrever"/"Garantir minha vaga" (`scroll-behavior: smooth` ou `window.scrollTo({behavior:'smooth'})`).
- **Máscara de telefone** (BR): `(DD) XXXX-XXXX` / `(DD) XXXXX-XXXX`, máximo 11 dígitos, aplicada no onChange.
- **Validação no submit** (sem validação nativa do browser — `noValidate`):
  - nome: mínimo 3 caracteres → "Informe seu nome completo."
  - whatsapp: mínimo 10 dígitos → "Informe um WhatsApp válido com DDD."
  - email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` → "Informe um e-mail válido."
  - cidade: mínimo 2 caracteres → "Informe sua cidade."
  - Erros em #D3382E 13px 600 abaixo de cada campo.
- **Fluxo do submit** (nesta ordem):
  1. Validar; se ok, botão vira "Enviando…".
  2. Se houver `WEBHOOK_URL` configurada: `POST` JSON `{ nome, whatsapp, email, cidade, curso, origem: location.href, data: ISO }` com `keepalive: true`; falha do webhook **não bloqueia** o passo seguinte.
  3. Abrir `https://wa.me/<NUMERO>?text=<encodeURIComponent(msg)>` em nova aba. Mensagem: `Olá! Meu nome é {nome}, sou de {cidade} e tenho interesse no {curso}. Meu e-mail é {email}.`
  4. Mostrar mensagem de sucesso: "Deu certo! Recebemos seus dados e a conversa continua no WhatsApp."
- **CTAs diretos de WhatsApp** (hero, rodapé, botão flutuante): mesma URL wa.me com mensagem `Olá! Tenho interesse no {curso} e gostaria de mais informações.`
- **FAQ**: clique alterna item; abrir um fecha o anterior.
- Hovers: botão amarelo → #E6A600; botão verde → #1EBE5A; item FAQ → fundo #F3F5F8.

## Configuração por curso (parametrizar)
| Campo | Empilhadeira | Máquinas Pesadas | Motoniveladora |
|---|---|---|---|
| Nome no wa.me | Curso de Operador de Empilhadeira (NR-11) | Curso de Operador de Máquinas Pesadas | Curso de Operador de Motoniveladora |
| Carga horária | 20 horas | 40 horas | 40 horas (confirmar) |
| Norma citada | NR-11 | NR-12 | NR-12 |
| Faixa salarial | R$ 2.200 a R$ 3.800 | R$ 2.800 a R$ 5.000 | R$ 3.500 a R$ 6.000 |
| Preço | [CONFIRMAR] | [CONFIRMAR] | [CONFIRMAR] |

Constantes globais: WhatsApp `5551995622999` (confirmar), webhook N8N (URL a definir — variável de ambiente), endereço, links sociais (hoje `href="#"` — pegar URLs reais).

## State Management
Por página, só estado local de formulário (`nome, whats, email, cidade, errors, sending, sent`) e `openFaq` (índice). Sem data fetching além do POST do webhook.

## Design Tokens
- **Cores**: amarelo #FFB800 (hover #E6A600) · grafite #16181D · card escuro #1C2230 · azul #1B4B9B (escuro #12315F) · WhatsApp #25D366 (hover #1EBE5A) · fundo claro #F3F5F8 · bordas #E6E9EE / inputs #D4DAE2 · texto secundário #5B6472 · texto claro #C9D2E0 · erro #D3382E · sucesso #1E8A4C sobre #E8F6EE.
- **Tipografia** (Google Fonts): títulos **Barlow Condensed** 600–800, uppercase; corpo **Barlow** 400–700. H1 `clamp(36px,5.2vw,58px)`, H2 `clamp(30px,3.8vw,42px)`, kicker 13px ls 2.5px, corpo 16–18px.
- **Radius**: cards 14px, botões 8–10px, cards grandes 20px, pills 999px.
- **Container**: 1140px; seções `padding: 72px 20px`.
- **Responsivo**: mobile-first via `repeat(auto-fit, minmax(...))` — sem breakpoints fixos. Alvos de toque ≥ 44px.

## Assets
- `assets/logo-instituto-top.png` — logo oficial (fornecido pelo cliente).
- `assets/motoniveladora-hero.jpeg` — foto real da patrola (fornecida pelo cliente).
- Fotos de hero da empilhadeira e das máquinas pesadas: **pendentes** — o cliente vai fornecer. Avatares dos depoimentos também pendentes.
- Ícones: SVGs inline (stroke 2px) presentes nos arquivos de referência — copiar de lá.

## SEO / produção (recomendações)
- `<title>`/description por rota, `lang="pt-BR"`, Open Graph com foto do curso.
- Webhook URL e número de WhatsApp como variáveis de ambiente.
- Google Fonts com `display=swap` (já usado nas referências).

## Files
- `Curso Maquinas Pesadas.dc.html` — referência da rota `/` (página principal)
- `Curso Empilhadeira.dc.html` — referência da rota `/empilhadeira`
- `Curso Motoniveladora.dc.html` — referência da rota `/motoniveladora`
- `screenshots/` — capturas de tela das três páginas renderizadas (referência visual)
- `assets/` — logo e foto da motoniveladora
