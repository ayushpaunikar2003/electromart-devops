output "bastion_ip" {
  description = "Copy this for [bastion] group"
  value       = module.ec2.bastion_public_ip
}

output "web_ips" {
  description = "Public IP of Web Server"
  value       = module.ec2.web_public_ips
}

output "web_private_ips" {
  description = "Private IP of Web Server (Use for Ansible)"
  value       = module.ec2.web_private_ips
}

output "app_ips" {
  description = "Copy these for [app] group"
  value       = module.ec2.app_private_ips
}

output "db_ips" {
  description = "Copy these for [db] group"
  value       = module.ec2.db_private_ips
}
