# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Simple Storage Service - S3. Usando CLI:
```
-- Lista los buckets
> aws s3 ls

-- Lista el contenido de un bucket
> aws s3 ls <bucket-name>

-- Copia de local al bucket
> aws s3 cp TestFile.txt s3://<bucket-name>

-- Copia del bucket al local
> aws s3 cp s3://<bucket-name>/TestFile.txt TestFile2.txt
```

### 2 - Simple Storage Service - S3. NodeJs:
```
-- Instala los paquetes
> npm run install

-- Corre la aplicación Node
> npm run start

-- Lista los buckets
> http://localhost:3000/list-buckets

-- Lista el contenido de un bucket
> http://localhost:3000/list-files/<bucket-name>

-- Agrega un archivo al bucket
> http://localhost:3000/add-file/<bucket-name>

-- Descarga un archivo del bucket
> http://localhost:3000/download-file/<bucket-name>/<key-name>
```
