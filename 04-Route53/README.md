# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Crea 4 instancias EC2, crea los health check y los registros DNS A.
```
# Correr una instancia t2.micro en São Paulo, N. Virginia, London y Sydney.
> ./create-ec2-resources.sh sa-east-1 '#1d8102'
> ./create-ec2-resources.sh us-east-1 '#ff5d64'
> ./create-ec2-resources.sh eu-west-2 '#44b9d6'
> ./create-ec2-resources.sh ap-southeast-2 '#dd6b10'


# Crear health checks para los servidores corriendo en São Paulo, N. Virginia, London y Sydney.
> ./create-route53-resources.sh sa-east-1 <ip>
> ./create-route53-resources.sh us-east-1 <ip>
> ./create-route53-resources.sh eu-west-2 <ip>
> ./create-route53-resources.sh ap-southeast-2 <ip>


# Eliminar los recursos ec2 creados en São Paulo, N. Virginia, London y Sydney.
> ./delete-ec2-resources.sh sa-east-1
> ./delete-ec2-resources.sh us-east-1
> ./delete-ec2-resources.sh eu-west-2
> ./delete-ec2-resources.sh ap-southeast-2
```

### Bonus - Transferir un dominio de una cuanta de AWS a otra cuenta. Usando CLI:
```
# Ejecutar esto en la cuenta que tiene el dominio
> aws route53domains transfer-domain-to-another-aws-account --domain-name utilapis.com --account-id <accountId>
{
    "OperationId": "e9f30c8f-af43-4f9b-83e6-2f069fbf77ef",
    "Password": <password>
}

# Ejecutar esto en la cuenta que acepta el dominio
> aws route53domains accept-domain-transfer-from-another-aws-account --domain-name utilapis.com --password <password>
```

### Bonus - Comandos útiles
```
# Borrar la cache DNS en Windows, ejecutar en CMD
> ipconfig/flushdns

# Checkear los registros DNS
> nslookup -type=soa utilapis.com
```