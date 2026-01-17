output "public_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "ec2_public_ip" {
  value = aws_instance.app_server.public_ip
}