---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
cover:
  image: "cover.jpg" # O PaperMod buscará este arquivo na pasta do livro
  alt: "Capa do livro {{ replace .Name "-" " " | title }}"
  relative: true # Importante para Page Bundles
params:
  isbn: ""
  autor: ""
  preco: 0.00
---