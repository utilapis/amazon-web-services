region=$1
background=$2

echo Creando key-pair en la region: $region
aws ec2 create-key-pair                         \
    --region $region                            \
    --key-name utilapis-key-$region             \
    --query 'KeyMaterial'                       \
    --output text > utilapis-key-$region.pem


echo Creando security group en la region: $region
aws ec2 create-security-group                   \
    --region $region                            \
    --group-name utilapis-sg-$region            \
    --description "SG - Servidor Web - Utilapis"


echo Habilitando el puerto 80 en el security group: utilapis-sg-$region
aws ec2 authorize-security-group-ingress        \
    --region $region                            \
    --group-name utilapis-sg-$region            \
    --protocol tcp                              \
    --port 80                                   \
    --cidr 0.0.0.0/0


echo Corriendo una instancia t2.micro en la region: $region
userData=$"
#!/bin/bash \n
sudo su \n
yum install httpd -y \n
echo '<html><body style=\"background: $background;\"><h1>Hola Utilapis desde $region!!</h1></body></html>' > /var/www/html/index.html \n
service httpd start \n
chkconfig httpd on \n
"

linux2AMI=$(
aws ec2 describe-images \
    --owners amazon \
    --filters "Name=name,Values=amzn2-ami-hvm-2.0.????????.?-x86_64-gp2" "Name=state,Values=available" \
    --query "reverse(sort_by(Images, &Name))[:1].ImageId" \
    --region $region \
    --output text)

instanceId=$(
aws ec2 run-instances           \
    --region $region                                \
    --image-id $linux2AMI                           \
    --count 1                                       \
    --instance-type t2.micro                        \
    --key-name utilapis-key-$region                 \
    --security-groups utilapis-sg-$region           \
    --user-data $(echo -e $userData | base64 -w 0)  \
    --query 'Instances[*].InstanceId' \
    --output text \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=WebServer-$region}]")

aws ec2 describe-instances                                  \
    --instance-ids $instanceId                              \
    --region $region                                        \
    --query 'Reservations[*].Instances[*].PublicIpAddress'  \
    --output text

