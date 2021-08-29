Region ?= sa-east-1
Background ?= \#1d8102
Service ?= 'Utilapis Webserver'

linux2AMI = $$(\
	aws ec2 describe-images \
		--owners amazon \
		--filters "Name=name,Values=amzn2-ami-hvm-2.0.????????.?-x86_64-gp2" "Name=state,Values=available" \
		--query "reverse(sort_by(Images, &Name))[:1].ImageId" \
		--region ${Region} \
		--output text)

deployS3:
	@echo Creando el Bucket s3 ...
	aws cloudformation deploy \
		--template-file s3.yaml \
		--stack-name utilapis-s3-${Region}-cfn \
		--region ${Region}

eliminarS3:
	@echo Borrando el Bucket s3 ...
	aws cloudformation delete-stack \
		--region ${Region} \
		--stack-name utilapis-s3-${Region}-cfn

deployEC2:
	@echo Creando la instancia ec2 ...
	aws cloudformation deploy \
		--template-file ec2.yaml \
		--stack-name utilapis-ec2-${Region}-cfn \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
		--region ${Region} \
		--no-fail-on-empty-changeset \
		--parameter-overrides \
			AMI=${linux2AMI} \
			Region=${Region} \
			Background=${Background} \
		--tags Service=${Service}

	aws cloudformation describe-stacks \
		--region ${Region} \
		--stack-name utilapis-ec2-${Region}-cfn \
		--query 'Stacks[*].Outputs[*]'

eliminarEC2:
	@echo Borrando la instancia ec2 ...
	aws cloudformation delete-stack \
		--region ${Region} \
		--stack-name utilapis-ec2-${Region}-cfn

deployLambda:
	@echo Creando la funcion lambda ...
	aws cloudformation deploy \
		--template-file lambda.yaml \
		--stack-name utilapis-lambda-${Region}-cfn \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
		--region ${Region} \
		--no-fail-on-empty-changeset \
		--parameter-overrides \
			Region=${Region}

	aws cloudformation describe-stacks \
		--region ${Region} \
		--stack-name utilapis-lambda-${Region}-cfn \
		--query 'Stacks[*].Outputs[*]'

eliminarLambda:
	@echo Borrando la funcion lambda ...
	aws cloudformation delete-stack \
		--region ${Region} \
		--stack-name utilapis-lambda-${Region}-cfn

deployDynamoDB:
	@echo Creando la tabla de DynamoDB ...
	aws cloudformation deploy \
		--template-file dynamo-db.yaml \
		--stack-name utilapis-dynamo-db-${Region}-cfn \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
		--region ${Region} \
		--no-fail-on-empty-changeset \
		--parameter-overrides \
			Region=${Region} \
			DDBTableName=auth.users

	aws cloudformation describe-stacks \
		--region ${Region} \
		--stack-name utilapis-dynamo-db-${Region}-cfn \
		--query 'Stacks[*].Outputs[*]'

eliminarDynamoDB:
	@echo Borrando la tabla de DynamoDB ...
	aws cloudformation delete-stack \
		--region ${Region} \
		--stack-name utilapis-dynamo-db-${Region}-cfn