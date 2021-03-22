# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Registra tu cuenta en Amazon Web Services.
### 2 - Crea un usuario y asigale la siguiente policy.
```
-- Conceda acceso con privilegios mínimos
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "application-autoscaling:*",
                "s3:*",
                "apigateway:*",
                "logs:*",
                "dynamodb:*",
                "cloudformation:*",
                "elasticloadbalancing:*",
                "iam:*",
                "cloudfront:*",
                "route53:*",
                "lambda:*",
                "ecs:*",
                "ecr:*",
                "ec2:*",
                "events:*"
            ],
            "Resource": "*"
        }
    ]
}
```

### 3 - Configura la linea de comandos (CLI)
```
> aws configure
...
AWS Access Key ID [None]: AAAAAAAAAAAAAAAAAA <- Reemplazar con Access Key
AWS Secret Access Key [None]: 5BBBBBBBBBBBBBBBBBBBBJ <- Reemplazar con Secret Access Key
Default region name [None]: sa-east-1
Default output format [None]: json
...
```
### 4 - Verifica que la linea de comandos está correctamente configurada.

```
> aws sts get-caller-identity
...
{
    "UserId": "AIDAVQBWSZQK4XSDVE3SJ",
    "Account": "XXXXXXXXXXXX",
    "Arn": "arn:aws:iam::XXXXXXXXXXXX:user/rodrigo.ibanez"
}
...
```
