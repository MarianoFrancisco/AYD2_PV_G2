output "frontend_elastic_ip" {
  description = "La Elastic IP asociada a la instancia EC2 del frontend"
  value       = var.existing_elastic_ip_allocation_id
}

output "frontend_instance_public_ip" {
  description = "La dirección IP pública de la instancia EC2"
  value       = aws_instance.frontend.public_ip
}

output "frontend_security_group_id" {
  description = "El ID del grupo de seguridad asociado a la instancia frontend"
  value       = aws_security_group.frontend_sg.id
}
