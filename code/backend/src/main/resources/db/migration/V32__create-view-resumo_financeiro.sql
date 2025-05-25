CREATE OR REPLACE VIEW vw_resumo_financeiro AS
SELECT
    DATE_FORMAT(rv.data_venda, '%Y-%m') AS ano_mes,
    COUNT(rv.id) AS total_vendas,
    SUM(rv.valor_total) AS valor_total_vendas,
    SUM(rv.lucro) AS lucro_total
FROM
    registro_vendas rv
GROUP BY
    ano_mes
ORDER BY
    ano_mes DESC;