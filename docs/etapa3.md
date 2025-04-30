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
