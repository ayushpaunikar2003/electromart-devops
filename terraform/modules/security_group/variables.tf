variable "vpc_id" {
  type = string
}

variable "name_prefix" {
  type    = string
  default = "electromart"
}

variable "alb_ingress_cidrs" {
  type    = list(string)
  default = ["0.0.0.0/0"]
}

variable "ssh_ingress_cidrs" {
  type    = list(string)
  default = []
}

variable "app_port" {
  type    = number
  default = 5000
}

variable "db_port" {
  type    = number
  default = 27017
}

variable "tags" {
  type    = map(string)
  default = {}
}
