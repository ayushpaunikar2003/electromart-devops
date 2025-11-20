variable "dockerhub_user" {}
variable "resource_group" {}
variable "location" {}

provider "azurerm" {
  features {}
}

resource "random_string" "suffix" {
  length  = 4
  special = false
}

resource "azurerm_container_group" "backend" {
  name                = "backend-app"
  location            = var.location
  resource_group_name = var.resource_group
  os_type             = "Linux"

  container {
    name   = "backend"
    image  = "${var.dockerhub_user}/backend:latest"
    cpu    = "0.5"
    memory = "1.0"
    ports {
      port     = 5000
      protocol = "TCP"
    }
  }

  ip_address_type = "Public"
  dns_name_label  = "backend-${random_string.suffix.result}"
}

resource "azurerm_container_group" "frontend" {
  name                = "frontend-app"
  location            = var.location
  resource_group_name = var.resource_group
  os_type             = "Linux"

  container {
    name   = "frontend"
    image  = "${var.dockerhub_user}/frontend:latest"
    cpu    = "0.5"
    memory = "1.0"
    ports {
      port     = 80
      protocol = "TCP"
    }

    environment_variables = {
      REACT_APP_API_URL = "http://${azurerm_container_group.backend.ip_address}:5000"
    }
  }

  ip_address_type = "Public"
  dns_name_label  = "frontend-${random_string.suffix.result}"
}
