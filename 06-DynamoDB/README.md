# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - DynamoDB. Usando CLI:
```
-- Lista las tablas en la región
> aws dynamodb list-tables --region sa-east-1

-- Crea una tabla
> aws dynamodb create-table \
    --table-name auth.user \
    --attribute-definitions \
        AttributeName=username,AttributeType=S \
    --key-schema AttributeName=username,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --tags Key=Service,Value=Utilapis \
    --region sa-east-1

-- Agrega items
> aws dynamodb put-item \
    --table-name auth.user \
    --item '{
        "username": {"S": "usuario1"},
        "email": {"S": "usuario1@example.com"} ,
        "age": {"N": "25"} ,
        "created_on": {"S": "2021-05-23"} 
      }' \
    --return-consumed-capacity TOTAL \
    --region sa-east-1

-- Borra la tabla
> aws dynamodb delete-table \
    --table-name auth.user \
    --region sa-east-1
```

### 2 - DynamoDB. NodeJs:
```
-- Instala los paquetes
> npm run install

-- Corre la aplicación Node
> npm run start

-- Lista todas las tablas en la region
> http://localhost:3000/list-tables

-- Lista todos los items de una tabla
> http://localhost:3000/list-items/<table-name>

-- Agrega un item a la tabla
> http://localhost:3000/add-item/<table-name>

-- Borra un item
> http://localhost:3000/delete-item/<table-name>/<key-name>
```
