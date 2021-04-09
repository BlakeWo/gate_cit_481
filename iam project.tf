provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_iam_user" "<name>" {
  name = "<name>"
  path = "/"
}

resource "aws_iam_role" "<role_name>" {
  name = "<role_name>"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_instance_profile" "<profile_name>" {
  name = "<profile_name>"
  role = aws_iam_role.<role_name>.name
}

resource "aws_security_group" "port80" {
  name        = "port80"
  description = "Allows all traffic on port 80 and port 22."


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

    ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "port80"
  }
}

resource "aws_iam_role_policy" "<policy_name>" {
  name = "<policy_name>"
  role = aws_iam_role.<role_name>.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ec2:Describe*",
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_key_pair" "pubkey" {
  key_name   = "pubkey"
  public_key = "<publickey>"

}

resource "aws_instance" "instanceone" {
  depends_on = [aws_iam_instance_profile.<profile_name>, aws_key_pair.pubkey, aws_security_group.port80]
  ami                         = "ami-010bb5f550c901adb"
  instance_type               = "t2.micro"
  associate_public_ip_address = "true"
  iam_instance_profile        = aws_iam_instance_profile.<profile_name>.name
  vpc_security_group_ids      = [aws_security_group.port80.id]
  key_name                    = aws_key_pair.pubkey.id
}

output "instance_ip" {
  description = "The public ip for ssh access"
  value       = aws_instance.instanceone.public_ip
}