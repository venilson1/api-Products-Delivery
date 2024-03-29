# DeliveryAppApi

Projeto de Delivery de pizzaria,

### Configuração

Caso você tenha o Docker instalado em sua máquina pode está baixando a imagem do postgres


```
docker run -p 5433:5432 --name postgressql -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root postgres:12-alpine
```

### Configuração .env

```
SECRET_JWT_ADMIN=
SECRET_JWT_USER=
MONGODBATLAS_URI=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAILER_USER=
MAILER_PASS=
HOST=
PORT=
DATABASE=
USER=
PASSWORD=

```

### Rodando Migrations do knexJs

```
 npx knex migrate:latest
```

### Rodando Seeds do knexJs (Opcional)

```
 npx knex seed:run
```


- collection postman: `https://api.postman.com/collections/14404359-2ed1798b-940f-4119-be92-ebd5e6b01a6c?access_key=PMAT-01GMKZ7QZARP7QFFPW6DWDF1MB`


### rodar o projeto

`yarn dev`

## Serviços

- [Cloudinary](https://cloudinary.com/)
- [NodeMailer](https://nodemailer.com/about/)
- [Thermal Printer](https://www.npmjs.com/package/js-thermal-printer)


## Tecnologias

- [NodeJs](https://dotnet.microsoft.com/en-us/)
- [Docker](https://www.docker.com/)
- [KnexJs](https://knexjs.org/)
- [Jwt](https://jwt.io/)


