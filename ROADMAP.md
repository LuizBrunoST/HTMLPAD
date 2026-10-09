# HTMLPAD++ — Roadmap público

> Planejamento de evolução do HTMLPAD++. Projeto independente, executado no navegador e publicado pelo GitHub Pages.

- **Repositório:** https://github.com/LuizBrunoST/HTMLPAD
- **Versão online:** https://luizbrunost.github.io/HTMLPAD/
- **Referência da análise inicial:** versão 2.10.1 (desktop)

## Como acompanhar

- `[x]` = funcionalidade identificada no código existente; **não significa que passou por testes completos**.
- `[ ]` = melhoria proposta, ainda não confirmada como concluída.
- Prioridades: **P0** segurança/bugs, **P1** armazenamento/projetos, **P2** experiência, **P3** qualidade.
- Atualize os itens somente após implementação e validação. Mudanças devem ser testadas antes de chegar à branch usada pelo GitHub Pages.

## Base existente (identificada no código)

- [x] Editor HTML, CSS e JavaScript
- [x] Ace Editor e realce de sintaxe
- [x] Autocompletar e snippets no desktop
- [x] Prévia com iframe
- [x] Salvar e reabrir projetos localmente no desktop
- [x] Exportação ZIP básica
- [x] Interface móvel separada

## P0 — Segurança e correções

- [ ] Evitar injeção de HTML/JS ao exibir nomes de projetos (textContent e listeners)
- [ ] Isolar prévia com iframe sandbox e revisar permissões necessárias
- [ ] Impedir nomes duplicados ou usar IDs únicos de projetos
- [ ] Corrigir ZIP para referenciar CSS e JavaScript no index.html
- [ ] Tratar projetos inválidos e erros de leitura do armazenamento
- [ ] Auditar recursos externos inseridos pelo usuário e sanitizar URLs
- [ ] Verificar botões e menus sem ação

## P1 — Projetos e armazenamento

- [ ] Renomear, duplicar e excluir projetos com confirmação
- [ ] Importar projetos ZIP
- [ ] Importar arquivos HTML, CSS e JS
- [ ] Salvar automaticamente com indicador de status
- [ ] Recuperar alterações não salvas
- [ ] Avaliar IndexedDB para projetos maiores
- [ ] Criar backup e restauração
- [ ] Suportar múltiplos arquivos e pastas

## P2 — Interface e produtividade

- [ ] Prévia lado a lado e painéis redimensionáveis
- [ ] Abas por arquivo
- [ ] Tema claro e escuro persistente
- [ ] Atalhos de teclado
- [ ] Configurações persistentes
- [ ] Layout responsivo unificado
- [ ] Pesquisar projetos

## P2 — Prévia e depuração

- [ ] Atualizar prévia automaticamente com debounce
- [ ] Simular tamanhos de celular, tablet e desktop
- [ ] Console integrado para logs e erros da prévia
- [ ] Abrir prévia em nova janela
- [ ] Exibir erros sem comprometer isolamento da prévia

## P3 — Exportação e qualidade

- [ ] Exportar HTML independente
- [ ] Exportar ZIP completo e funcional
- [ ] Testar Chrome, Firefox e navegadores móveis
- [ ] Criar ambiente de homologação separado do GitHub Pages de produção
- [ ] Adicionar testes de regressão para salvar, importar, exportar e prévia
- [ ] Documentar contribuição e bugs
- [ ] Manter changelog e atualizar README

## Diretrizes

1. Preservar a versão pública funcional durante o desenvolvimento.
2. Não exigir login ou servidor para usar o editor básico.
3. Manter HTMLPAD++ independente de outros projetos.
4. Priorizar correções e compatibilidade antes de novas funcionalidades.
5. Registrar mudanças relevantes em um changelog quando implementadas.

---

_Este documento é um planejamento público e pode mudar conforme o desenvolvimento._
