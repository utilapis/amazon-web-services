#!/bin/bash
sudo su
yum update -y
yum install httpd -y
yum install git -y
cd /var/www/html
git clone https://github.com/utilapis/aprendamos-juntos.git
cp aprendamos-juntos/responsive-html/index.html .
cp aprendamos-juntos/responsive-html/styles.css .
service httpd start
chkconfig httpd on