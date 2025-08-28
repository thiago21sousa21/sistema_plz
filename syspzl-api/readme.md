- quero criar uma pagina onde eu possa cadastrar um novo fiscal

```
syspzl-api
├─ .env
├─ package-lock.json
├─ package.json
├─ public
│  └─ sysplz-front
│     ├─ auto.html
│     ├─ config.js
│     ├─ index.html
│     ├─ README.md
│     ├─ sysplz
│     │  ├─ assets
│     │  │  └─ css
│     │  │     └─ main.css
│     │  ├─ autuados
│     │  │  ├─ autuados.css
│     │  │  ├─ autuados.js
│     │  │  ├─ index.html
│     │  │  ├─ index2.html
│     │  │  └─ novo-autuado
│     │  │     ├─ index.html
│     │  │     ├─ index2.html
│     │  │     ├─ novo-autuado.css
│     │  │     └─ novo-autuado.js
│     │  ├─ cameras
│     │  │  ├─ cameras.css
│     │  │  ├─ cameras.js
│     │  │  ├─ index.html
│     │  │  ├─ index2.html
│     │  │  └─ nova-camera
│     │  │     ├─ index.html
│     │  │     ├─ index2.html
│     │  │     ├─ nova-camera.css
│     │  │     └─ nova-camera.js
│     │  ├─ enderecos
│     │  │  ├─ endereco.css
│     │  │  ├─ endereco.js
│     │  │  └─ index.html
│     │  ├─ eventos
│     │  │  ├─ eventos.css
│     │  │  ├─ eventos.js
│     │  │  ├─ index.html
│     │  │  ├─ index2.html
│     │  │  ├─ novo-evento
│     │  │  │  ├─ index.html
│     │  │  │  ├─ index2.html
│     │  │  │  ├─ novo-evento.css
│     │  │  │  └─ novo-evento.js
│     │  │  └─ vincular-autuado
│     │  │     ├─ index.html
│     │  │     ├─ vincular-autuado.css
│     │  │     └─ vincular-autuado.js
│     │  ├─ fiscais
│     │  │  ├─ fiscais.css
│     │  │  ├─ fiscais.js
│     │  │  ├─ index.html
│     │  │  ├─ index2.html
│     │  │  └─ novo-fiscal
│     │  │     ├─ index.html
│     │  │     ├─ novo-fiscal.css
│     │  │     └─ novo-fiscal.js
│     │  ├─ gerar-laudo
│     │  │  ├─ gerar-laudo.css
│     │  │  ├─ gerar-laudo.js
│     │  │  └─ index.html
│     │  ├─ index.html
│     │  ├─ index2.html
│     │  ├─ infracoes
│     │  │  ├─ index.html
│     │  │  ├─ index2.html
│     │  │  ├─ infracoes.css
│     │  │  ├─ infracoes.js
│     │  │  └─ nova-infracao
│     │  │     ├─ index.html
│     │  │     ├─ index2.html
│     │  │     ├─ nova-infracao.css
│     │  │     └─ nova-infracao.js
│     │  ├─ sysplz.css
│     │  ├─ sysplz.js
│     │  └─ veiculos
│     │     ├─ index.html
│     │     ├─ index2.html
│     │     ├─ veiculos.css
│     │     └─ veiculos.js
│     ├─ templates
│     │  ├─ molde.css
│     │  └─ molde.html
│     └─ utils
│        └─ formatters.js
├─ readme.md
├─ src
│  ├─ app.js
│  ├─ controllers
│  │  ├─ autuado.controller.js
│  │  ├─ camera.controller.js
│  │  ├─ endereco.controller.js
│  │  ├─ evento.controller.js
│  │  ├─ fiscal.controller.js
│  │  ├─ infracao.controller.js
│  │  ├─ laudo.controller.js
│  │  └─ veiculo.controller.js
│  ├─ database
│  │  ├─ database.connection.js
│  │  ├─ modelo_banco
│  │  │  ├─ v1.0
│  │  │  │  ├─ modelagem.pdf
│  │  │  │  ├─ modelo de banco de dados.mwb
│  │  │  │  ├─ modelo de banco de dados.mwb.bak
│  │  │  │  └─ script.sql
│  │  │  ├─ v1.1
│  │  │  │  ├─ criacao.v1.1.sql
│  │  │  │  ├─ modelagem.mwb
│  │  │  │  ├─ modelagem.pdf
│  │  │  │  └─ script_alteracao.sql
│  │  │  └─ v1.2
│  │  │     ├─ alteracao.sql
│  │  │     ├─ criacao.v.1.2.sql
│  │  │     ├─ modelagem.v.1.2.pdf
│  │  │     └─ modelagem.v1.2.mwb
│  │  └─ scri
│  ├─ middlewares
│  │  ├─ erro.handler.js
│  │  ├─ schema.validation.js
│  │  └─ token.validation.js
│  ├─ repositories
│  │  ├─ autuado.repository.js
│  │  ├─ camera.repository.js
│  │  ├─ endereco.repository.js
│  │  ├─ evento.repository.js
│  │  ├─ fiscal.repository.js
│  │  ├─ infracao.repository.js
│  │  └─ veiculo.repository.js
│  ├─ routes
│  │  ├─ autuado.route.js
│  │  ├─ camera.route.js
│  │  ├─ endereco.route.js
│  │  ├─ evento.route.js
│  │  ├─ fiscal.route.js
│  │  ├─ index.route.js
│  │  ├─ infracao.route.js
│  │  ├─ laudo.route.js
│  │  └─ veiculo.route.js
│  ├─ schemas
│  │  ├─ autuado.schema.js
│  │  ├─ camera.schema.js
│  │  ├─ endereco.schema.js
│  │  ├─ evento.schema.js
│  │  ├─ fiscal.schema.js
│  │  ├─ infracao.schema.js
│  │  └─ veiculo.schema.js
│  └─ services
│     ├─ autuado.service.js
│     ├─ camera.service.js
│     ├─ endereco.service.js
│     ├─ evento.service.js
│     ├─ fiscal.service.js
│     ├─ infracao.service.js
│     ├─ laudo.service.js
│     └─ veiculo.service.js
└─ templates
   └─ modelo-auto-de-infracao.xlsx

```