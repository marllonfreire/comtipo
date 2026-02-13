---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
categories: ["Produtos"]
tags: []
# Dados específicos para o Catálogo Comtipo
params:
  isbn: ""
  autor: ""
  editora: "Comtipo Edições"
  preco: 0.00
  disponibilidade: "Em Estoque"
  peso_kg: 0.0
summary: "Breve descrição do produto para aparecer na listagem."
---