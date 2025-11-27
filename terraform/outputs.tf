output "web_public_ips" {
  description = "Public IPs of the Web Servers (NGINX)"
  value       = module.ec2.web_public_ips
}

output "app_private_ips" {
  description = "Private IPs of the App Servers"
  value       = module.ec2.app_private_ips
}