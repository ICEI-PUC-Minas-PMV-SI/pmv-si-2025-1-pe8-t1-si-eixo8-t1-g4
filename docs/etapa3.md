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

### Tecnologias e Ferramentas Utilizadas

Este projeto adota um conjunto robusto e moderno de tecnologias para garantir desempenho, escalabilidade e manutenibilidade. A seguir, estão listadas as principais ferramentas, bibliotecas e frameworks utilizados no desenvolvimento do front-end e back-end da aplicação.

#### Front-end

- **TypeScript (v5.7)**
    
    Linguagem principal utilizada no desenvolvimento do front-end, proporcionando tipagem estática e recursos avançados para aplicações modernas.
    
- **Angular (v19)**
    
    Framework base da aplicação front-end, amplamente utilizado para o desenvolvimento de aplicações web escaláveis e com arquitetura modular.
    
- **Angular Material (v19)**
    
    Biblioteca oficial de componentes UI baseada no Material Design, que oferece uma interface consistente, acessível e responsiva.
    
- **Bootstrap (v5.3)**
    
    Framework CSS utilizado para o desenvolvimento de layouts responsivos e estilização adicional da interface.
    
- **ngx-mask (v19)**
    
    Biblioteca para aplicação de máscaras em campos de formulário, essencial para a formatação de entradas como CPF, datas, telefones, entre outros.
    
- **Chart.js (v4.0)**
    
    Biblioteca JavaScript para visualização de dados por meio de gráficos interativos e responsivos.
    
- **ng2-charts (v8.0)**
    
    Conjunto de diretivas Angular que facilita a integração do Chart.js com a aplicação, permitindo gráficos reativos e dinâmicos.

#### Back-end

- **Java 17**
    
    Linguagem principal do back-end, utilizada com foco em desempenho, segurança e compatibilidade com frameworks modernos.
    
- **Spring Boot (v3.4)**
    
    Framework principal da aplicação back-end, que simplifica o desenvolvimento com configuração automática, segurança embutida e suporte completo a REST APIs.
    
- **MySQL (v8)**
    
    Sistema gerenciador de banco de dados relacional, utilizado para armazenar e gerenciar os dados da aplicação.
    
- **Flyway**
    
    Ferramenta de versionamento e migração de banco de dados, garantindo controle de versões e consistência no schema da base de dados.
    
- **Lombok (v1.18)**
    
    Biblioteca que reduz a verbosidade do código Java, gerando automaticamente métodos como getters, setters, construtores, entre outros, por meio de anotações.
    
- **ModelMapper (v3.2)**
    
    Biblioteca para mapeamento automático entre objetos, facilitando a conversão entre entidades e DTOs (Data Transfer Objects).
    
- **SpringDoc OpenAPI / Swagger (v2.8.6)**
    
    Ferramenta para geração automática da documentação da API REST, com suporte ao padrão OpenAPI 3 e interface interativa via Swagger UI.
    
- **JUnit e Mockito**
    
    Bibliotecas utilizadas para testes automatizados. O JUnit é empregado em testes unitários e de integração, enquanto o Mockito permite a criação de mocks e simulações de dependências.

### Diagramas de caso de uso

![Diagrama de caso de uso - Gerenciar Clientes](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%201%20-%20Gerenciar%20clientes.png)

![Diagrama de caso de uso - Gerenciar Pet ](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%202%20-%20Gerenciar%20pet.png)

![Diagrama de caso de uso - Gerenciar Produtos e Estoque ](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%203%20-%20Gerenciar%20produtos%20e%20estoque.png)

![Diagrama de caso de uso - Gerenciar Vendas ](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%204%20-%20Gerenciar%20vendas.png)

![Diagrama de caso de uso - Gerenciar Vacinação ](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%205%20-%20Controle%20vacinacao.png)

![Diagrama de caso de uso - Financeiro](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%206%20-%20Financeiro.png)

![Diagrama de caso de uso - Relatórios](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%207-%20Relatorios.png)

![Diagrama de caso de uso - Gerenciar Usuário](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Caso%208%20-Gerenciar%20usuario.png)

### Esboço do banco de dados (modelo ER)

![Diagrama de Entidade Relacionamento (DER)- ](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/DER_Ana_Agropet.png)



# 3.3 Protótipo e Planejamento da Arquitetura
### Arquitetura do Projeto

A arquitetura da aplicação segue uma abordagem cliente-servidor baseada em camadas, com separação clara entre front-end, back-end e banco de dados. O modelo adotado promove modularidade, reutilização de código, facilidade de testes e manutenção.

#### Diagrama Simplificado
```
[ Angular (UI) ]
      ↓ API REST (HTTP)
[ Java Spring Boot (Back-end) ]
      ↓ JPA / Hibernate
[ MySQL Database ]
```
​
#### Diagrama de Alto Nível
```
┌─────────────────────┐
│     Navegador       │
│  (Cliente Angular)  │
└─────────┬───────────┘
          │ HTTP Requests (JSON)
          ▼
┌─────────────────────┐
│      API REST       │
│ (Java Spring Boot)  │
└─────────┬───────────┘
          │ Camadas Internas
          ▼
┌─────────────────────┐
│   Service Layer     │ ← Lógica de negócio
├─────────────────────┤
│ Repository Layer    │ ← Acesso a dados via Hibernate/JPA
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   MySQL Database    │
└─────────────────────┘
```

#### Componentes e Responsabilidades

##### Front-end (Angular)

- Responsável por toda a interface com o usuário.
- Comunica-se com a API via chamadas HTTP REST.
- Utiliza Angular Material e Bootstrap para UI responsiva.
- Usa `Chart.js` e `ng2-charts` para visualização de dados.
- Implementa formulários com `ngx-mask` para validação de entrada.

##### Back-end (Java Spring Boot)

- Exposição de endpoints REST usando `@RestController`.
- Processamento de requisições e regras de negócio na Service Layer.
- Integração com o banco de dados através da Repository Layer (JPA).
- Utiliza DTOs e ModelMapper para separar modelos de domínio dos objetos transportados.
- Gerencia migrações de banco com Flyway.
- Documenta automaticamente a API com SpringDoc OpenAPI + Swagger UI.

##### Banco de Dados (MySQL)

- Armazena informações persistentes da aplicação.
- Estrutura versionada com scripts controlados pelo Flyway.
- Acesso feito via JPA (Hibernate).

##### Fluxo de Requisição (Exemplo)

1. O usuário interage com a interface (Angular).
2. O Angular faz uma requisição HTTP (ex: GET `/api/usuarios`).
3. O Spring Boot recebe a requisição, processa na camada de serviço.
4. A Service Layer consulta a Repository Layer.
5. A Repository Layer acessa o banco de dados e retorna os dados.
6. Os dados são mapeados em DTOs e enviados de volta como JSON.
7. O front-end renderiza os dados na interface.

### Interface do sistema




### Fluxo de telas
![Fluxo de telas - ](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe8-t1-si-eixo8-t1-g4/blob/63d6c5e4f60880c85bfdf5492336b3494122b39f/docs/img/Fluxo%20de%20telas.png)

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
