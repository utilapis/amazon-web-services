# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Lambda. Usando CLI:
```
-- Ejecuta la función lambda
> aws lambda invoke \
    --function-name UtilapisFunction \
    --region sa-east-1 \
    --cli-binary-format raw-in-base64-out \
    --payload '{"key1": 35, "key2": 6}' response.json

-- Ejecuta la función lambda y muestra los logs
> aws lambda invoke \
    --function-name UtilapisFunction \
    --region sa-east-1 \
    --cli-binary-format raw-in-base64-out \
    --payload '{"key1": 35, "key2": 6}' response.json \
    --log-type Tail \
    --query 'LogResult' \
    --output text | base64 -d
```

### 2 - Lambda y API Gateway. NodeJs:
```
-- Instala los paquetes
> npm run install

-- Corre la aplicación Node
> npm run start
```
