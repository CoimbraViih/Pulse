# PROJECT ARCHITECTURE: Pulse — Planner Interativo de Produtividade

## 1. CONTEXT & PROBLEM

Planners digitais vendidos hoje são repositórios de informação, não sistemas de decisão. Eles capturam tarefas mas não ajudam o usuário a decidir o que fazer, quando e por quê.

A maioria ignora três problemas reais: (1) energia cognitiva — o usuário tenta fazer trabalho profundo quando está esgotado; (2) custo de troca de contexto — tarefas misturadas destroem o foco; (3) dissonância entre valores declarados e como o tempo é gasto de verdade.

O resultado: o usuário compra o planner, usa por 2 semanas e abandona. A taxa de abandono de planners digitais supera 80% em 30 dias. Isso não é falta de disciplina — é um produto que não resolve o problema certo.

## 2. PROPOSED SOLUTION

O FlowPlanner é um planner interativo web que funciona como um sistema de decisão, não apenas de registro. Ele resolve o problema combinando 10 funcionalidades exclusivas ausentes nos planners atuais:

1. Planejamento por energia (não por horário): mapeia tarefas por carga cognitiva e cruza com o perfil do usuário
2. Protocolo if-then integrado: implementação de intenção para cada tarefa, reduzindo procrastinação
3. Campo "O que NÃO vou fazer hoje": eliminação consciente como prática central
4. Mapa de alavancagem 80/20: visualização de quais tarefas têm impacto desproporcional
5. Agrupamento por contexto: deep work, operacional, criativo, ligações — sem misturar
6. Loop de calibração preditiva: rastreia diferença entre planejado e executado ao longo de semanas
7. Sistema de manutenção de relacionamentos: contatos estratégicos com frequência definida
8. Modos sprint vs. manutenção: dois templates operacionais distintos
9. Alinhamento valores x tempo: visualização semanal de drift entre intenção e execução real
10. Recuperação como prioridade: blocos de descanso planejados antes das tarefas, não depois

O produto é vendido como info produto com acesso à plataforma web, incluindo onboarding guiado e módulo de treinamento em produtividade baseada em evidências.

## 3. FUNCTIONAL REQUIREMENTS

### Core Features
- Login e Autenticação
- Dashboards
- Parte premium (paga)
- Calendário
- Notificações
- Relatórios e Exportação
- Landing Page
- Onboarding do Usuário

### Proprietary Features (Diferenciais de Produto)
- **Perfil de energia do usuário**: quiz inicial para mapear janelas de alta/baixa energia ao longo do dia
- **Protocolo if-then por tarefa**: campo adicional em cada tarefa para definir gatilho de execução
- **Campo "Não-Lista do Dia"**: eliminação consciente de tarefas antes de planejar
- **Mapa de alavancagem 80/20 semanal**: matriz visual impacto x esforço
- **Agrupamento por contexto**: deep work, operacional, criativo, comunicação
- **Histórico de calibração**: gráfico de acurácia de estimativa ao longo das semanas
- **Agenda de relacionamentos**: contatos estratégicos com frequência de contato e último registro
- **Modo sprint / modo manutenção**: alternância com templates distintos
- **Painel de alinhamento valores x tempo**: visualização de drift semanal
- **Blocos de recuperação obrigatórios**: sistema recusa planejamento sem intervalos mínimos configurados

## 4. USER PERSONAS

### Persona Principal — O Empreendedor Solo Sobrecarregado
**Perfil:** 25–40 anos, empreendedor individual, freelancer ou profissional liberal. Gerencia tudo sozinho: vendas, entrega, financeiro e marketing. Sente que trabalha muito mas avança pouco. Já tentou outros planners e abandonou. Compra info produtos com frequência e busca sistemas, não apenas dicas.

**Dor central:** não consegue separar o que é urgente do que é importante. Termina o dia com sensação de ter sido "reativo" e não "estratégico".

**Comportamento de compra:** pesquisa no Instagram e YouTube, compra por impulso em páginas de vendas com prova social e resultado concreto. Ticket médio aceito: R$97–R$297.

### Persona Secundária — O Profissional em Transição de Carreira
**Perfil:** 28–45 anos, CLT querendo migrar para PJ ou empreendedorismo. Precisa gerir projetos paralelos além do trabalho formal. Alta ansiedade por produtividade.

**Dor central:** sobrecarga de tarefas em múltiplos contextos (trabalho formal + projetos pessoais) sem sistema para separar e priorizar.

### Usuário Admin (versão futura B2B)
Gestor de pequenas equipes que quer implantar metodologia de produtividade para o time.

## 5. TECHNICAL STACK

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| UI | React + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend/DB | Supabase (Auth + Postgres + Realtime) |
| Payments | Stripe |
| Hosting | Vercel |

## 6. DESIGN LANGUAGE

### Visual References
- **Linear** — visual ultra-limpo, hierarquia tipográfica clara, feedback visual imediato nas ações. Referência para a sensação de "velocidade" e controle.
- **Notion** — flexibilidade de estrutura e familiaridade do público-alvo brasileiro com a ferramenta. O FlowPlanner deve parecer mais focado e menos genérico.
- **Todoist** — simplicidade na captura de tarefas, mas o FlowPlanner vai além com camadas de decisão que o Todoist não tem.

### Visual Style
- **Modo:** Dark mode como padrão (remete a foco e seriedade)
- **Tipografia:** sans-serif moderna, hierarquia clara
- **Cor de acento:** laranja/âmbar — energia e urgência
- **Princípio:** sem excesso de elementos decorativos — cada pixel deve ter função
- **Microanimações:** sutis no check de tarefas para reforço positivo

## 7. PROCESS

- Break app build into logical milestones (steps)
- Each milestone should be a deliverable increment
- Prioritize core functionality first, then iterate
- Test each milestone before moving to the next
