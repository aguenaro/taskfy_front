# Taskfy

Frontend do projeto Taskfy da disciplina PCS3643 - Laboratório de Engenharia de Software I.

---

## Requisitos

Para executar o servidor é necessário instalar o Node.js e um gerenciador de pacotes, Yarn.

### Node

- #### Instalação do Node.js em windows

  Visite o [site oficial do Node.js](https://nodejs.org/) e baixe o instalador
  Além disso, também é necessário instalar o `git` e o `npm`.
  O npm vem instalado com o node, enquanto o git pode ser baixado [aqui](https://git-scm.com/)

- #### Instalação do Node.js no ubuntu
  É possível instalar o node.js e o npm com o apt.

```zsh
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

- #### Outros Sistemas Operacionais
  Para baixar o node em outros sistemas operacionais, visite o [site oficial do Noje.js](https://nodejs.org/) e o [site oficial do NPM](https://npmjs.org/).

Para validar se a instalação ocorreu com sucesso, execute os seguintes comandos:

```zsh
$ node --version
v16.3.0

$ npm --version
7.15.1
```

### Instalação do yarn

Após instalar o npm, execute o seguinte comando:

```zsh
$ npm install -g yarn
```

---

## Clonando este repositório

```zsh
$ git clone git@github.com:aguenaro/taskfy_front.git
$ cd taskfy_front
$ yarn install
```

## Executando o projeto

### Buildando a aplicação em dev

```zsh
$ yarn dev
```

### Buildando a aplicação

Para fazer o build, basta executar:

```zsh
$ yarn build
```

### Executando build:

Para executar o build, basta executar no terminal:

```zsh
$ yarn start
```

## Testando o projeto

Este projeto apresenta testes de integração (utilizamos o framework cypress para isto). Para testar, basta executar:

```zsh
$ yarn test
```
