# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [1.0.0] - 2026-02-03

### 🎉 Lançamento Inicial

Primeira versão do Repositório de Boas Práticas - CONAGC.

### ✨ Adicionado

#### **Interface de Usuário**

- Interface responsiva com React 19 e TypeScript
- Design institucional com paleta de cores CONAGC
- Header com navegação entre Repositório e Adicionar Prática
- Footer institucional

#### **Sistema de Filtros**

- Filtro por CBM de origem (multi-seleção)
- Filtro por Áreas de Impacto (8 categorias)
- Filtro por Status de Implementação (via dashboard)
- Botão de limpar todos os filtros
- Contadores dinâmicos de práticas filtradas

#### **Dashboard Analítico**

- 4 cards de estatísticas principais:
  - Total de Práticas
  - CBMs Participantes
  - Práticas Consolidadas
  - Em Fase Inicial
- Gráfico de barras interativo por status
- Filtro clicável através das barras do gráfico
- Indicadores visuais de filtros ativos

#### **Gestão de Práticas**

- Visualização em cards responsivos (grid 1-3 colunas)
- Modal detalhado com todas as informações da prática
- Formulário completo para adicionar novas práticas
- Validação em tempo real de campos obrigatórios
- Feedback visual de erros de validação

#### **Exportação**

- Exportação para PDF com jsPDF
- Layout profissional em modo paisagem
- Tabela com todas as práticas filtradas
- Branding CONAGC (cores institucionais)
- Paginação automática
- Data de geração do relatório

#### **Dados Iniciais**

- 8 práticas de diferentes CBMs:
  - CBMPB: BRAVO ESTRATÉGIA
  - CBMAL: Modelo de Gestão Estratégica
  - CBPMESP: Monitoramento de Indicadores
  - CBMGO: Painel de Monitoramento
  - CBMMA: Projeto SENTINELA
  - CBMAC: Monitorando Metas e Custos
  - CBMRN: Gestão de Risco
  - CBMPR: Escritório de Projetos

#### **Documentação**

- README.md completo em português
- Banner institucional para GitHub
- Arquivo LICENSE (MIT)
- CONTRIBUTING.md com guia de contribuição
- .env.local.example para configurações
- CHANGELOG.md para controle de versões

#### **Acessibilidade**

- ARIA labels em todos os componentes interativos
- Navegação por teclado completa
- Indicadores visuais de foco
- Contraste adequado de cores
- Textos alternativos em ícones

### 🎨 Design

- Paleta de cores institucional (vermelho #BD030B)
- Tipografia clara e legível
- Espaçamento consistente
- Transições suaves
- Hover effects em cards e botões
- Status badges com cores semânticas:
  - Verde: Consolidada
  - Azul: Fase Inicial
  - Amarelo: Piloto
  - Vermelho: Descontinuada

### 🛠️ Tecnologias

- React 19.2.0
- TypeScript 5.8.2
- Vite 6.2.0
- TailwindCSS 3.x
- jsPDF (latest)
- jsPDF-AutoTable (latest)

---

## [Unreleased]

### 🔮 Planejado para Próximas Versões

#### **v1.1.0 - Melhorias de UX**

- [ ] Persistência de dados com LocalStorage
- [ ] Funcionalidade de busca textual
- [ ] Ordenação de resultados (nome, data, CBM)
- [ ] Exportação para Excel/CSV
- [ ] Modo escuro (dark mode)
- [ ] Paginação para grandes volumes de dados

#### **v1.2.0 - Backend Integration**

- [ ] API REST para gerenciamento de práticas
- [ ] Banco de dados (PostgreSQL/MongoDB)
- [ ] Sistema de autenticação
- [ ] Controle de acesso por CBM
- [ ] Edição e exclusão de práticas
- [ ] Histórico de alterações

#### **v2.0.0 - Recursos Avançados**

- [ ] Upload de imagens e documentos
- [ ] Sistema de comentários e avaliações
- [ ] Notificações de novas práticas
- [ ] Analytics avançado com gráficos
- [ ] Comparação entre práticas
- [ ] Recomendações baseadas em IA
- [ ] API pública para integração

---

## Tipos de Mudanças

- `Adicionado` - para novas funcionalidades
- `Modificado` - para mudanças em funcionalidades existentes
- `Depreciado` - para funcionalidades que serão removidas
- `Removido` - para funcionalidades removidas
- `Corrigido` - para correções de bugs
- `Segurança` - para correções de vulnerabilidades

---

[1.0.0]: https://github.com/gabrieldantass5/Reposit-rio-de-Boas-Pr-ticas---CONAGC/releases/tag/v1.0.0
[Unreleased]: https://github.com/gabrieldantass5/Reposit-rio-de-Boas-Pr-ticas---CONAGC/compare/v1.0.0...HEAD
