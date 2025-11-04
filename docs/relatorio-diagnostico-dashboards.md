# Relatório de Diagnóstico – Dashboards

## Ambiente de Teste
- Sistema: Windows (ambiente local)
- Node.js: conforme ambiente do desenvolvedor
- Servidor: `vite` v6.4.1
- URL local: `http://localhost:3000/`
- Código-base: app React + Vite (TypeScript)

## Escopo e Metodologia
- Executado `npm install` e `npm run dev` para reproduzir o comportamento.
- Acesso ao app via `http://localhost:3000/` para validar dashboards.
- Revisão do código dos dashboards: `components/Dashboard.tsx` e integração em `App.tsx`.
- Análise de fontes de dados: `data/practices.ts`.
- Avaliação de logs de servidor e mensagens de erro da UI.

## Testes de Funcionalidade
- Interações do usuário com dashboards:
  - O `Tooltip` está habilitado nos gráficos (`<Tooltip />`), permitindo visualização ao passar o mouse.
  - Labels de pizza são customizados e exibem percentuais apenas para fatias com `>= 5%`.
  - Navegação/scroll e responsividade são suportadas via `ResponsiveContainer`.
- Renderização dos componentes visuais:
  - BarChart vertical para “Áreas de Impacto” e “Responsável” renderizados com `CartesianGrid`, `XAxis`, `YAxis`, `Bar`.
  - PieChart para “Distribuição por Status” com `Legend` e `Cell` para cores por status.
  - Cards superiores: total de práticas, CBMs participantes, consolidadas, fase inicial.
- Exibição correta dos dados:
  - Métricas calculadas via `useMemo` a partir de `filteredPractices` (em `App.tsx`).
  - Contagens por status, áreas de impacto e responsável ordenadas conforme especificado.
  - Contadores nos cards refletem o resultado dos filtros selecionados (CBMs e Áreas).

### Resultado Observado
- Servidor iniciou sem erros: `VITE v6.4.1 ready` e preview abriu.
- Nenhuma mensagem de erro no carregamento inicial do dashboard.
- Gráficos renderizam quando a biblioteca Recharts está disponível.

## Análise Técnica
- Conexão com fontes de dados:
  - Não há APIs externas para os dashboards. Os dados vêm de `data/practices.ts` (estático).
  - Filtros atuam apenas sobre esse dataset local.
- Carregamento da biblioteca de gráficos (Recharts):
  - Implementado via script dinâmico: `https://unpkg.com/recharts/umd/Recharts.min.js`.
  - Fluxo: verifica `window.Recharts` → injeta `<script>` → `onload` seta estado → `onerror` exibe mensagem de erro.
  - Potenciais falhas:
    - Conexão sem internet ou bloqueio ao domínio `unpkg.com`.
    - Políticas de rede/corporativas (firewall, proxy) impedindo CDN.
    - Políticas de Conteúdo (CSP) bloqueando scripts externos.
    - Adblockers/Privacy tools interferindo no CDN.
  - Sintomas esperados:
    - Mensagem “Carregando dashboards…” enquanto aguarda a lib.
    - Mensagem de erro: “Falha ao carregar a biblioteca de gráficos...” quando `onerror` dispara.
- Logs e erros:
  - Terminal: sem erros ao iniciar dev server.
  - UI: componente exibe mensagens de carregamento/erro adequadas.

## Teste de APIs/Endpoints
- Não foram encontrados endpoints ou chamadas HTTP relacionados aos dashboards.
- Toda a lógica estatística opera sobre dados locais importados.

## Problemas Identificados e Prioridade
- Crítico
  - Dependência do CDN para Recharts: indisponibilidade impede renderização dos dashboards.
  - Ausência de fallback offline/local para a lib de gráficos.
- Alto
  - Falta de logs detalhados (telemetria/tempo de carregamento) para diagnosticar indisponibilidade do CDN.
  - Renderização bloqueada até a lib externa estar disponível, sem cache local.
- Médio
  - Alguns rótulos longos no `YAxis` podem truncar/estourar largura em telas pequenas.
  - Labels de pizza ocultam fatias menores que 5%, o que pode confundir em análises finas.
- Baixo
  - Uso de `any` para o estado de `recharts` (perda de tipagem).

## Recomendações de Correção
- Substituir CDN por instalação local:
  - `npm install recharts` e importações estáticas: `import { PieChart, BarChart, ... } from 'recharts'`.
  - Eliminar carregamento dinâmico via `<script>` para maior robustez e previsibilidade.
- Implementar fallback/telemetria:
  - Exibir instruções de ação quando a lib não carregar (tentar novamente, verificar rede, abrir whitelist de `unpkg.com`).
  - Registrar eventos de `onload`/`onerror` com tempos e causa (ex.: logger simples ou integração com ferramenta de monitoramento).
- Ajustes UX nos gráficos:
  - Considerar redução de fonte/`tickFormatter` nos eixos para rótulos longos.
  - Exibir legenda detalhada para fatias pequenas (mesmo quando label da fatia está oculto).
- Qualidade de código:
  - Tipar `recharts` com tipos do pacote instalado.

## Passos de Reprodução de Erros (se houver)
1. Iniciar sem internet ou bloquear `https://unpkg.com/recharts/umd/Recharts.min.js`.
2. Acessar `http://localhost:3000/`.
3. Verificar mensagem de erro no painel “Visão Geral”.
4. Observar que gráficos não renderizam e o dashboard permanece indisponível.

## Printscreens
- Inclua capturas de tela dos seguintes cenários (adicione as imagens em `docs/screenshots/` e referencie aqui):
  - `docs/screenshots/dashboard-carregando.png`: Estado “Carregando dashboards…”.
  - `docs/screenshots/dashboard-erro-cdn.png`: Mensagem de erro ao falhar o CDN.
  - `docs/screenshots/dashboard-renderizado.png`: Gráficos renderizados corretamente.
  - `docs/screenshots/filtros-aplicados.png`: Exemplo de filtros alterando contadores e gráficos.

## Observações sobre o Ambiente
- Testes executados em ambiente local com Vite.
- Para ambientes corporativos, certifique-se de liberar `unpkg.com` ou adotar pacote local de Recharts.

## Conclusão
- Os dashboards dependem do carregamento de Recharts via CDN. Essa dependência é a causa mais provável de “não funcionamento” em ambientes restritos de rede.
- Com instalação local de `recharts`, a renderização torna-se estável, eliminando a classe de falhas por indisponibilidade da lib externa.