/**
 * config.js — Inicializa o namespace global CLIFOR.
 * Este arquivo DEVE ser carregado antes de todos os outros JS.
 *
 * Todos os módulos registram seus dados em window.CLIFOR,
 * evitando poluição do escopo global com variáveis soltas.
 */
'use strict';

window.CLIFOR = window.CLIFOR || {};

CLIFOR.version = '1.0.0';
