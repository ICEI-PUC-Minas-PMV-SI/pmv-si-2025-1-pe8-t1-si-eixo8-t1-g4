# 3.1 Conexão com o Plano de IC e Planejamento da Solução
## Objetivo
Estabelecer o vínculo direto entre o Plano de Inteligência Competitiva (IC) e o planejamento da solução tecnológica a ser desenvolvida para a ANAGRO PETS. Este alinhamento garante que as funcionalidades propostas respondam de forma prática às perguntas-chave estratégicas formuladas para a definição do mix de produtos, otimizando a tomada de decisão.

### Relembrando o Plano de IC
KIT (Key Intelligence Topic):
* Definição Estratégica do Mix de Produtos

Perguntas-chave (KIQs) Formuladas:

* Quais categorias de produtos (alimentos, brinquedos, acessórios, cuidados) têm maior demanda entre os clientes?

* Quais são os produtos e marcas com mais vendas atualmente?

* Como estão as vendas durante os meses do ano?

* Qual a receita de venda de produto por categoria por mês/ano?

* Quantas vendas de produto foram realizadas por categoria e mês/ano?

* Quais as quantidades de produtos por categoria têm no estoque atualmente?

* O que os clientes estão dizendo sobre os produtos disponíveis? Quais são as principais reclamações ou elogios?

## Dados Críticos Identificados:

* Informações precisas sobre volume de vendas.

* Controle atualizado de estoque (com apoio de unidades de medida e fracionamento).

* Monitoramento de validade de produtos (principalmente medicamentos e vacinas).

* Análises que apoiem decisões de remoção, substituição ou reforço de produtos no portfólio.

## Processos que serão resolvidos com a aplicação

* Cadastro de produtos estruturado, incluindo unidade de medida, preço e vencimento.

* Registro de vendas com baixa automática de estoque.

* Controle de validade dos produtos, com alertas de vencimento próximo.

* Relatórios e análises de vendas para embasar decisões sobre o mix de produtos.

## Funcionalidades Iniciais a serem Desenvolvidas
Cadastro de produtos com:

* Descrição e categoria.

* Unidade de medida (kg, mL, un).

* Preço por unidade base.

* Data de validade (campos opcionais).

Registro de vendas:

* Entrada manual da quantidade vendida com base na unidade (ex: 1,5 kg).

* Atualização automática do estoque.

Geração de alertas:

* Produtos com validade próxima.

* Cadastros duplicados.

Relatórios de:

* Produtos mais e menos vendidos.

* Estoque atual.

* Análise de curva ABC (produtos que mais geram receita).

* Vendas por categoria e marca.

* Receita mensal/anual por categoria.

## Quadro-Resumo: Problemas Mapeados e Soluções Propostas

| **Problema Mapeado** | **Solução Proposta** | **Como será resolvida no sistema** |
|----------------------|----------------------|-------------------------------------|
| Dificuldade em entender quais categorias têm maior demanda | Categorização dos produtos e análise por volume de vendas | Relatórios de vendas por categoria, com filtros mensais/anuais |
| Falta de controle sobre marcas e itens mais vendidos | Registro detalhado de vendas por produto e marca | Dashboard com ranking dos produtos/marcas mais vendidos |
| Falta de visão de desempenho ao longo do tempo | Registro de data nas vendas para análise temporal | Relatórios com filtros por mês e ano |
| Ausência de dados organizados sobre estoque por categoria | Controle de estoque com vinculação por categoria | Relatório com visão geral de estoque por tipo de produto |

# 3.2 Levantamento de Requisitos e Modelagem Inicial
## Histórias de usuário

| ID  | Como... | Eu quero... | Para que... |
|-----|---------|-------------|-------------|
| HU01 | proprietária do petshop | cadastrar os produtos com unidade de medida (kg, mL, un), validade e categoria | organizar melhor o estoque e visualizar produtos próximos do vencimento |
| HU02 | funcionária do petshop | registrar a venda de um produto com baixa automática no estoque | evitar anotações manuais e garantir controle em tempo real |
| HU03 | proprietária | ver alertas de produtos próximos do vencimento | agir a tempo e evitar perdas financeiras |
| HU04 | proprietária | informar frações nas vendas (ex: 1,5kg) | calcular corretamente o valor e descontar do estoque com precisão |
| HU05 | proprietária | visualizar categorias e marcas mais vendidas | definir melhor o mix de produtos e focar nos mais lucrativos |
| HU06 | gestora | ver relatórios mensais de vendas por categoria | analisar o desempenho ao longo do tempo |
| HU07 | proprietária | visualizar quantidade de produtos por categoria | facilitar a reposição e o planejamento de estoque |
| HU08 | gestora | acessar relatório de receita por categoria por mês/ano | entender a lucratividade por área e planejar investimentos |

## Requisitos do Sistema

Com base nos processos existentes e nas possibilidades de melhorias e automatização que identificamos, organizamos abaixo os requisitos funcionais e não funcionais, com suas respectivas descrições e prioridades (Alta, Média ou Baixa), considerando a importância para a operação e implementação inicial.

---

### Requisitos Funcionais

Os requisitos funcionais definem as funcionalidades que o sistema deve oferecer para atender às necessidades do petshop.

| ID    | Descrição do Requisito                                      | Prioridade |
|-------|--------------------------------------------------------------|------------|
| RF01  | Registro de vendas                                           | Alta       |
| RF02  | Cadastro de clientes e pets                                  | Alta       |
| RF03  | Controle de estoque em tempo real                            | Alta       |
| RF04  | Segurança e backup financeiro                                | Alta       |
| RF05  | Relatórios gerenciais de vendas e estoque                    | Alta       |
| RF06  | Alertas para aniversário de pets                             | Alta       |
| RF07  | Alertas para vacinas                                         | Alta       |
| RF08  | Alertas para controle de estoque                             | Alta       |
| RF09  | Painel de indicadores de desempenho                          | Média      |
| RF10  | Integração do sistema financeiro com vendas e estoque        | Média      |
| RF11  | Histórico de transações do caixa                             | Média      |
| RF12  | Gerenciamento de fornecedores e pagamentos                   | Baixa      |
| RF13  | Controle de contas a pagar                                   | Baixa      |
| RF14  | Agendamento online de serviços                               | Baixa      |

### Requisitos Não Funcionais

Os requisitos não funcionais determinam critérios de desempenho, segurança, acessibilidade e usabilidade do sistema. Eles garantem que o sistema funcione de forma eficiente e confiável.

| ID     | Descrição do Requisito                                                  | Prioridade |
|--------|--------------------------------------------------------------------------|------------|
| RNF01  | A aplicação deve ter boa usabilidade                                     | Alta       |
| RNF02  | A aplicação deve ter confiabilidade                                      | Alta       |
| RNF03  | A aplicação deve ser responsiva para rodar em dispositivos móveis        | Baixa      |
| RNF04  | A aplicação deve processar requisições do usuário em no máximo 3 segundos| Baixa      |

------------------
Escolher ferramentas/plataformas.
Construir Diagrama de caso de uso
Desenvolver esboço do banco de dados (modelo ER)


# 3.3 Protótipo e Planejamento da Arquitetura
## -----------
Desenvolver wireframes ou protótipo navegável.
Planejar a estrutura de navegação do sistema; o fluxo de telas, o armazenamento e acesso aos dados.


# 3.4 Preparação do Desenvolvimento
### Objetivo
Organizar a execução do projeto de forma escalonada, iniciando pelas funcionalidades mais prioritárias, com divisão equilibrada de tarefas entre os integrantes, de acordo com suas especialidades (documentação, desenvolvimento ou deploy).

#### Ordem de Implementação das Funcionalidades

As funcionalidades serão implementadas considerando a prioridade definida nos requisitos funcionais.

##### Fase 1 – Funcionalidades Essenciais
| ID    | Funcionalidade                            | Prioridade |
|-------|-------------------------------------------|------------|
| RF01  | Registro de vendas                        | Alta       |
| RF02  | Cadastro de clientes e pets               | Alta       |
| RF03  | Controle de estoque em tempo real         | Alta       |
| RF04  | Segurança e backup financeiro             | Alta       |

##### Fase 2 – Funcionalidades Analíticas e de Gestão
| ID    | Funcionalidade                            | Prioridade |
|-------|-------------------------------------------|------------|
| RF05  | Relatórios de vendas e estoque            | Alta       |
| RF06  | Alertas para aniversário de pets          | Alta       |
| RF07  | Alertas para vacinas                      | Alta       |
| RF08  | Alertas para controle de estoque          | Alta       |
| RF09  | Painel de indicadores de desempenho       | Média      |

##### Fase 3 – Funcionalidades Complementares
| ID    | Funcionalidade                            | Prioridade |
|-------|-------------------------------------------|------------|
| RF10  | Integração financeira com vendas/estoque  | Média      |
| RF11  | Histórico de transações do caixa          | Média      |
| RF14  | Agendamento online de serviços            | Baixa      |

> **Obs.:** Os requisitos RF12 (Gerenciamento de fornecedores) e RF13 (Contas a pagar) foram considerados de baixa prioridade e serão implementados apenas se houver tempo ou necessidade futura.

---

#### Divisão das Tarefas por Integrante

| Integrante                       | Foco Principal      | Tarefas Atreladas |
|----------------------------------|---------------------|-------------------|
| **Bruna Lourenço Duarte**        | Documentação        | Redação do relatório técnico, apoio no plano de IC, testes e histórico de decisões |
| **Gabriele Fernanda Lima**       | Documentação        | Atualização do repositório, modelagem de processos (BPMN), documentação de requisitos |
| **João Pedro Pinto Matozinhos**  | Desenvolvimento     | Backend: estrutura do banco de dados, API, cadastro de produtos, vendas |
| **Neymmar Padilha Palma**        | Documentação        | Casos de uso, controle de testes, organização das histórias de usuário |
| **Vinícius Damasceno Souza**     | Desenvolvimento     | Frontend: telas de cadastro, controle de estoque, visualização de alertas |
| **William Xavier de Barros**     | Deploy              | Configuração do servidor, ambiente de produção, integração contínua e publicação |

---

#### Início do Desenvolvimento – Partes Estruturais

##### Etapas iniciais técnicas:

- **Modelagem do Banco de Dados**
  - Tabelas: `produtos`, `clientes`, `pets`, `vendas`, `estoque`

- **Criação dos Endpoints (API)**
  - `POST /produtos`
  - `POST /vendas`
  - `GET /estoque`

- **Interface Inicial (Frontend)**
  - Tela de cadastro de produto (com unidade, validade e QR Code)
  - Tela de vendas com baixa automática de estoque
  - Tela de visualização de estoque

- **Ambiente de Desenvolvimento e Deploy**
  - Versionamento no GitHub
  - Configuração inicial do ambiente de produção (por William)
  - Registro e versionamento da documentação técnica (Bruna, Gabriele e Neymmar)

---

> Este plano poderá ser ajustado conforme o andamento do projeto e necessidades observadas ao longo do desenvolvimento.



# 3.5 Geração de Relatórios ou Dashboards Internos
## -----------
