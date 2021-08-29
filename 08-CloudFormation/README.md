# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Cloud Formation - CFN.
## S3
```
# Crear un bucket de s3.
> make deployS3

# Eliminar el bucket de s3.
> make eliminarS3
```

## EC2
```
# Correr una instancia t2.micro en São Paulo, N. Virginia, London y Sydney.
> make deployEC2 Region=sa-east-1 Background=#1d8102
> make deployEC2 Region=us-east-1 Background=#ff5d64
> make deployEC2 Region=eu-west-2 Background=#44b9d6
> make deployEC2 Region=ap-southeast-2 Background=#dd6b10

# Eliminar los recursos ec2 creados en São Paulo, N. Virginia, London y Sydney.
> make eliminarEC2 Region=sa-east-1
> make eliminarEC2 Region=us-east-1
> make eliminarEC2 Region=eu-west-2
> make eliminarEC2 Region=ap-southeast-2
```

## Lambda
```
# Crear un funcion Lambda.
> make deployLambda

# Eliminar la funcion lambda s3.
> make eliminarLambda
```

## DynamoDB
```
# Crear un tabla de DynamoDB.
> make deployDynamoDB

# Eliminar la tabla de DynamoDB.
> make eliminarDynamoDB
```


