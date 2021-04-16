# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Elastic Compute Cloud - EC2.
```
# Crea un server http
> sudo su
> yum install httpd -y
> echo "<html><body><h1>Hola Utilapis!!</h1></body></html>" > /var/www/html/index.html
> service httpd start
```

### 2 - Elastic Compute Cloud - EC2. Usando CLI:
```
# Correr una instancia
> aws ec2 run-instances                     \
    --image-id <ami-xxxxxxxx>               \
    --count 1                               \
    --instance-type t2.micro                \
    --key-name <key-pair>                   \
    --security-group-ids <sg-xxxxxxxx>      \
    --user-data file://bootstrap.sh

# Terminar una instancia
> aws ec2 terminate-instances --instance-ids <i-xxxxxxxx>
```