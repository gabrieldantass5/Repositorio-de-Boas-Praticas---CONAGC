# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Repositório de Boas Práticas - CONAGC**! Este documento fornece diretrizes para contribuir com o projeto.

---

## 📋 Código de Conduta

Ao participar deste projeto, você concorda em manter um ambiente respeitoso e colaborativo. Esperamos que todos:

- Usem linguagem acolhedora e inclusiva
- Respeitem pontos de vista e experiências diferentes
- Aceitem críticas construtivas com elegância
- Foquem no que é melhor para a comunidade
- Demonstrem empatia com outros membros da comunidade

---

## 🚀 Como Posso Contribuir?

### **Reportando Bugs**

Antes de criar um relatório de bug, verifique se o problema já não foi reportado. Se você encontrar um bug:

1. **Use o template de issue** para bugs
2. **Descreva o problema** claramente
3. **Inclua passos para reproduzir** o bug
4. **Adicione screenshots** se aplicável
5. **Especifique o ambiente** (navegador, SO, versão do Node)

**Exemplo de relatório de bug:**

```markdown
**Descrição do Bug:**
O filtro por CBM não está funcionando corretamente quando...

**Passos para Reproduzir:**
1. Acesse a página principal
2. Clique no filtro 'CBMAL'
3. Observe que...

**Comportamento Esperado:**
Deveria filtrar apenas práticas do CBMAL

**Screenshots:**
[Anexe aqui]

**Ambiente:**
- Navegador: Chrome 120
- SO: Windows 11
- Node: 18.17.0
```

---

### **Sugerindo Melhorias**

Sugestões de melhorias são sempre bem-vindas! Para sugerir uma nova funcionalidade:

1. **Verifique** se a sugestão já não existe
2. **Descreva claramente** a funcionalidade proposta
3. **Explique o valor** que ela agregaria
4. **Forneça exemplos** de uso, se possível

---

### **Contribuindo com Código**

#### **Processo de Desenvolvimento**

1. **Fork** o repositório
2. **Clone** seu fork localmente

   ```bash
   git clone https://github.com/seu-usuario/Reposit-rio-de-Boas-Pr-ticas---CONAGC.git
   ```

3. **Crie uma branch** para sua feature

   ```bash
   git checkout -b feature/minha-nova-funcionalidade
   ```

4. **Faça suas alterações** seguindo os padrões do projeto
5. **Teste** suas alterações
6. **Commit** suas mudanças

   ```bash
   git commit -m "feat: adiciona funcionalidade X"
   ```

7. **Push** para sua branch

   ```bash
   git push origin feature/minha-nova-funcionalidade
   ```

8. **Abra um Pull Request**

---

## 📝 Padrões de Código

### **TypeScript**

- Use **tipagem forte** sempre que possível
- Evite `any` - prefira `unknown` se necessário
- Documente funções complexas com JSDoc
- Use **interfaces** para objetos complexos

```typescript
// ✅ Bom
interface Practice {
  nomeDaPratica: string;
  cbmDeOrigem: string;
}

// ❌ Evite
const practice: any = { ... };
```

### **React**

- Use **componentes funcionais** com hooks
- Prefira **arrow functions** para componentes
- Use **useMemo** e **useCallback** para otimizações
- Mantenha componentes **pequenos e focados**

```typescript
// ✅ Bom
const PracticeCard: React.FC<PracticeCardProps> = ({ practice }) => {
  return <div>...</div>;
};

// ❌ Evite componentes muito grandes
```

### **Estilização**

- Use **TailwindCSS** para estilos
- Mantenha classes **organizadas e legíveis**
- Use a paleta de cores do projeto
- Garanta **responsividade** (mobile-first)

```tsx
// ✅ Bom
<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
  ...
</div>
```

---

## 🧪 Testes

Embora o projeto ainda não tenha testes automatizados, ao contribuir:

1. **Teste manualmente** todas as funcionalidades afetadas
2. **Verifique responsividade** em diferentes tamanhos de tela
3. **Teste em diferentes navegadores** (Chrome, Firefox, Safari)
4. **Valide acessibilidade** (navegação por teclado, leitores de tela)

---

## 📦 Commits

Use **Conventional Commits** para mensagens de commit:

```
feat: adiciona funcionalidade de busca textual
fix: corrige filtro por área de impacto
docs: atualiza README com novas instruções
style: ajusta espaçamento no header
refactor: reorganiza estrutura de componentes
test: adiciona testes para Dashboard
chore: atualiza dependências
```

**Estrutura:**

```
<tipo>(<escopo opcional>): <descrição>

[corpo opcional]

[rodapé opcional]
```

**Exemplos:**

```bash
git commit -m "feat: adiciona exportação para Excel"
git commit -m "fix(dashboard): corrige cálculo de estatísticas"
git commit -m "docs: adiciona exemplos de uso da API"
```

---

## 🔍 Pull Requests

### **Checklist antes de submeter:**

- [ ] O código segue os padrões do projeto
- [ ] Testei as alterações localmente
- [ ] Atualizei a documentação (se necessário)
- [ ] Não há conflitos com a branch main
- [ ] O PR tem um título descritivo
- [ ] Adicionei descrição detalhada das mudanças

### **Template de Pull Request:**

```markdown
## 📝 Descrição
Breve descrição das mudanças realizadas

## 🎯 Motivação
Por que essas mudanças são necessárias?

## 🔧 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## ✅ Checklist
- [ ] Código testado localmente
- [ ] Documentação atualizada
- [ ] Sem conflitos com main
- [ ] Segue padrões do projeto

## 📸 Screenshots (se aplicável)
[Adicione aqui]

## 🔗 Issues Relacionadas
Closes #123
```

---

## 🌳 Estrutura de Branches

- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `docs/*` - Atualizações de documentação
- `refactor/*` - Refatorações de código

---

## 📚 Recursos Úteis

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 💬 Dúvidas?

Se tiver dúvidas sobre como contribuir:

1. Verifique a [documentação](README.md)
2. Procure em [issues existentes](../../issues)
3. Abra uma [nova issue](../../issues/new) com sua dúvida
4. Entre em contato com a equipe do CONAGC

---

## 🙏 Agradecimentos

Toda contribuição, por menor que seja, é valiosa! Obrigado por ajudar a melhorar o Repositório de Boas Práticas do CONAGC.

---

<div align="center">

**Feito com ❤️ para os Bombeiros Militares do Brasil**

</div>
