output "bastion_ip" {
  description = "Copy this for [bastion] group"
  value       = module.ec2.bastion_public_ip
}

output "nat_instance_ip" {
  description = "Public IP of the NAT Router"
  value       = module.vpc.nat_public_ip
}

output "web_ips" {
  description = "Copy these for [web] group"
  value       = module.ec2.web_public_ips
}

output "app_ips" {
  description = "Copy these for [app] group"
  value       = module.ec2.app_private_ips
}

output "db_ips" {
  description = "Copy these for [db] group"
  value       = module.ec2.db_private_ips
}