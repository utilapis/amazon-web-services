region=$1

echo Terminando la instancia t2.micro en la region: $region
instanceId=$(
aws ec2 describe-instances                 \
    --region $region                                    \
    --query 'Reservations[].Instances[].InstanceId'     \
    --filters "Name=tag:Name,Values=WebServer-$region"  \
    --output text)

terminateInstanceResult=$(aws ec2 terminate-instances   \
    --region $region                                    \
    --instance-ids $instanceId)

echo Borrando el key-pair en la region: $region
aws ec2 delete-key-pair                         \
    --region $region                            \
    --key-name utilapis-key-$region

echo Borrando el security group en la region: $region
aws ec2 delete-security-group                   \
    --region $region                            \
    --group-name utilapis-sg-$region



