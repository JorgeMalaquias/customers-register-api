# Customers API

Se trata de uma api restful, para o recebimento, tratamento, listagem e cadastro de dados de clientes! Foi desenvolvida com emprego de orientação à objetos, e aplicação de ESlint no código!

## Tecnologias empregadas
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>


## Endpoints e seu funcionamento


### POST '/customers'
#### Este endpoint efetua a criação de um novo cliente de acordo com dados informados no body da requisição.

#### Body da requisição deve conter um objeto com os seguintes atributos:

- `name`: deve ser uma string, com a primeira letra sendo maiúscula;
- `cpf`: deve ser uma string no formato `11122233344` ou `111.222.333-44` , sendo composta somente por número, exceto pelos caracteres `.` e `-`. Além de possuir um dos formatos válidos, o cpf deve possuir dígitos válidos atendendo a regra de dígito descrita em https://www.macoratti.net/alg_cpf.htm#:~:text=O;
- `birth`: deve ser uma string no seguinte formato de data `AAAA-MM-DD`, onde temos o ano, mês e dia informados respectivamente e separados por `-`;

Exemplo fictício de body (o cpf do exemplo foi gerado em https://www.4devs.com.br/gerador_de_cpf):
	
```json
		{
		  "name": "Jorge Silva",
		  "cpf": "706.764.730-40",
		  "birth": "1995-03-15"
		}
```

ou
		
```json
		{
		  "name": "Jorge Silva",
		  "cpf": "70676473040",
		  "birth": "1995-03-15"
		}
```
	
#### Possíveis retornos da api:

Status code `201` : indica que o novo cliente foi criado com sucesso!
Status code `409` e mensagem `The informed cpf is already been used!`: indica que já existe um cliente cadastrado com o cpf informado no body da requisição!
Status code `400`: indica que o body da requisição não tem formato válido!
Status code `422` e mensagem `Invalid cpf!`: indica que, apesar dos dados no body terem formato válido, o cpf possui dígitos inválidos!



### GET '/customers/:cpf'
#### Este endpoint efetua uma busca por um cliente específico dado o cpf informado como parâmetro na url.

O cpf pode ser informado na url em dois formatos: `11122233344` ou `111.222.333-44`.
Exemplo fictício de url da requisição:  
	
`/customers/706.764.730-40` ou `/customers/70676473040`
		
Possíveis retornos da api:

Status code 200 e um objeto com os dados do cliente, caso este exista, conforme exemplo fictício:

```json
		{
		  "id": 1,
		  "name": "Jorge Silva",
		  "cpf": "70676473040",
		  "birth": "1995-03-15T00:00:00.000Z"
		}
```
	
Status code 404 e mensagem `There is no customer registered with the informed cpf!`: indica que não existe cliente cadastrado com o cpf informado!




### GET '/customers?page=x&size=x'
#### Este endpoint efetua uma busca por vários clientes por paginação de acordo com parâmetro informados na url via query. 

A quantidade de clientes por página é definida pelo valor de `size` informado na url. O número da página a ser retornada é definido pelo valor de 'page' também informado na url, sendo 0(zero) a primeira página sempre.
 
Exemplo fictício de url da requisição: 
		
`/customers?page=0&size=4`

Neste exemplo será feita uma busca por paginação, com cada página possuindo 4 clientes, e retornando a primeira página. Se fosse desejado obter a segunda página o valor de `page` deveria ser 1 e assim em diante para as próximas páginas.
	
#### Possíveis retornos da api:

Status code 200 e um array com os dados dos clientes, caso estes existam, e de acordo com a paginação informada, e na ordem em que foram cadastrados, conforme exemplo fictício:

```json
	[
		  {
		    "id": 1,
		    "name": "Roberto da Rosa",
		    "cpf": "02111927082",
		    "birth": "1990-02-15T00:00:00.000Z"
		  },
		  {
		    "id": 2,
		    "name": "Jorge Silva",
		    "cpf": "70676473040",
		    "birth": "1995-03-15T00:00:00.000Z"
		  }
	]
```
	
Status code 400 e mensagem `The informed page does not exist because there are no customers enough!`: indica que o número da página informada é maior que o da última página, ou seja, não há clientes o suficiente cadastrados para que haja a página informada.
	
Exemplo de url que retornaria este erro, considerando que só há 2 clientes cadastrados:

`/customers?page=1&size=5`
			
Neste exemplo, para que esta requisição retornasse pelo menos um array com 1 cliente seria necessário haver pelo menos 6 clientes cadastrados. Se fosse passado 2 como valor de `page` deveriam haver pelo menos 11 clientes cadastrados.
	
Status code 200 e mensagem `There are no customers registered!`: indica que não existem clientes cadastrados ainda!



## Rodando a aplicação via docker


1.Primeiro é necessário clonar este repositório em alguma pasta de sua preferência com o comando:

`https://github.com/JorgeMalaquias/customers-register-api.git`

Com um terminal aberto na pasta onde foi clonado este repositório, rode o seguinte comando:

```bash
	npm i
```


2.Criar um arquivo `env.dev` na pasta onde foi clonado este repositório, e atribuir valores às seguintes variáveis de ambiente conforme o arquivo de exemplo `.env.example`:

```bash
PORT= *valor de sua preferência*
DATABASE_URL="postgresql://<USERexemplo>:<PASSWORDexemplo>@db-dev:5432/<DBexemplo>"
POSTGRES_USERNAME=<USERexemplo>
POSTGRES_PASSWORD=<PASSWORDexemplo>
POSTGRES_DB=<DBexemplo>
```
!!!Importante que a variável `DATABASE_URL`, siga o formato do exemplo, com os valores entre `<>` podendo ser de sua escolha desde que estes sejam iguais a os valores de POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, respectivamente.

3.Com um terminal na mesma pasta ainda, rode o seguinte comando:

```bash
	npm run dev:docker
```

Agora, a aplicação deve estar rodando, e pronta para receber requisições através do localhost na porta com o valor que foi atribuído a variável PORT no arquivo `env.dev`.

### Rodando testes via docker

Caso, não tenha sido executado ainda o passo 1 de como rodas a aplicação via docker, executar eles antes de seguir os próximos passos.

1.Criar um arquivo `env.test` na pasta onde foi clonado este repositório, e atribuir valores às seguintes variáveis de ambiente conforme o arquivo de exemplo `.env.example`:

```bash
PORT= *valor de sua preferência*
DATABASE_URL="postgresql://<USERexemplo>:<PASSWORDexemplo>@db-test:5432/<DBexemplo>"
POSTGRES_USERNAME=<USERexemplo>
POSTGRES_PASSWORD=<PASSWORDexemplo>
POSTGRES_DB=<DBexemplo>
```

!!!Importante que a variável `DATABASE_URL`, siga o formato do exemplo, com os valores entre `<>` podendo ser de sua escolha desde que estes sejam iguais a os valores de POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, respectivamente.

2.Com um terminal na mesma pasta ainda, rode o seguinte comando:

```bash
	npm run test:docker
```

Logo, após depois de ser buildada a aplicação, os testes devem ser executados, e os resultados exibidos no terminal.
