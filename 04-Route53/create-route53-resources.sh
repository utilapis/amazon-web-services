region=$1
ip=$2
dominio="utilapis.com"

echo Creando health check para el server: WebServer-$region
healthcheckId=$(
aws route53 create-health-check                         \
    --caller-reference helath-check-$region-$(date +%s) \
    --health-check-config IPAddress=$ip,Port=80,Type=HTTP,ResourcePath=index.html,FullyQualifiedDomainName=$dominio,RequestInterval=10,FailureThreshold=2 \
    --query "HealthCheck.Id"                            \
    --output text
)

aws route53 change-tags-for-resource                    \
    --resource-type healthcheck                         \
    --resource-id $healthcheckId                        \
    --add-tags Key=Name,Value=health-check-$region


echo Agregar un record A para el dominio.
hostedZoneId=$(
aws route53 list-hosted-zones-by-name   \
    --dns-name $dominio                 \
    --query "HostedZones[].Id"          \
    --max-items 1                       \
    --output text
)

config=$'{
    "Comment": "Creando un A record in Route 53",
    "Changes": [{
        "Action": "CREATE",
        "ResourceRecordSet": {
            "Name": "'$dominio'",
            "Type": "A",
            "Region": "'$region'",
            "TTL": 60,
            "SetIdentifier": "'$region'",
            "ResourceRecords":[{
                "Value": "'$ip'"
            }],
            "HealthCheckId": "'$healthcheckId'"
        }
    }]
}'

aws route53 change-resource-record-sets \
    --hosted-zone-id $hostedZoneId      \
    --change-batch "$config"