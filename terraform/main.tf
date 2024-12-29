provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
}

resource "aws_security_group" "frontend_sg" {
  name        = "frontend-sg"
  description = "Permitir SSH y HTTP"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "frontend" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = aws_key_pair.key_pair.key_name
  security_groups = [aws_security_group.frontend_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update
              sudo apt install -y ansible git
              git clone https://github.com/MarianoFrancisco/AYD2_PV_G2 /home/ubuntu/proyecto
              cd /home/ubuntu/proyecto
              git checkout feature202030987_terraform-ansible
              ansible-playbook -i ansible/inventory/hosts.yml ansible/playbooks/deploy-frontend.yml
              EOF

  tags = {
    Name = "frontend-server"
  }
}

resource "aws_eip_association" "frontend_eip_assoc" {
  allocation_id = var.existing_elastic_ip_allocation_id
  instance_id   = aws_instance.frontend.id
}
