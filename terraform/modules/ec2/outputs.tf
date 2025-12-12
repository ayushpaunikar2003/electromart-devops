output "web_instance_ids" {
  value = aws_instance.web[*].id
}

output "web_public_ips" {
  value = aws_instance.web[*].public_ip
}

output "app_instance_ids" {
  value = aws_instance.app[*].id
}

output "app_private_ips" {
  value = aws_instance.app[*].private_ip
}

output "db_instance_ids" {
  value = aws_instance.db[*].id
}

output "db_private_ips" {
  value = aws_instance.db[*].private_ip
}

output "bastion_public_ip" {
  description = "Public IP of the Bastion Host"
  value       = aws_instance.bastion.public_ip
}

output "web_private_ips" {
  description = "Private IPs of the Web Servers"
  value       = aws_instance.web[*].private_ip
}
