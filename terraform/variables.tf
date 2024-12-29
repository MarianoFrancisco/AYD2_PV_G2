variable "aws_region" {
  description = "La región donde se crearán los recursos de AWS"
  type        = string
}

variable "aws_access_key" {
  description = "Clave de acceso de AWS"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "Clave secreta de AWS"
  type        = string
  sensitive   = true
}

variable "key_name" {
  description = "El nombre del par de claves SSH para la instancia EC2"
  type        = string
}

variable "public_key_path" {
  description = "Ruta al archivo de clave pública SSH"
  type        = string
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "ID de la AMI de Ubuntu"
  type        = string
  default     = "ami-0c02fb55956c7d316"
}

variable "existing_elastic_ip_allocation_id" {
  description = "Allocation ID de la Elastic IP existente para asociar a la instancia EC2"
  type        = string
  default     = null
}
