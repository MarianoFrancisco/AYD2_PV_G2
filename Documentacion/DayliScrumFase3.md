# Daily Scrum

## Sprint Daily Scrum Report - Mariano Camposeco
### *Día 1: Pruebas Unitarias - Backend*

- Se desarrollaron pruebas unitarias utilizando **Jest** para las siguientes funcionalidades:
  - Login de Cliente, Atención al Cliente, Administrador y Supervisor.
  - Operaciones bancarias: Depósito, Retiro y Pago de Préstamo.
  - Módulo de asignación de roles.
- Se alcanzó un 100% de cobertura en las pruebas unitarias, validando:
  - Correcta autenticación y autorización de usuarios.
  - Cálculo preciso de saldos tras operaciones bancarias.
  - Asignación correcta de roles según los permisos configurados.

#### *Complicaciones:*
- Dificultades al simular respuestas de la base de datos en pruebas de login, lo que causó errores intermitentes.
- Conflictos con dependencias que retrasaron la ejecución de algunas pruebas.
- Casos límite no manejados en las operaciones de asignación de roles.

### *Día 2: Pruebas de Integración - Backend*

- Se realizaron pruebas de integración para validar la interacción entre los módulos implementados:
  - Solución de problemas relacionados con la integración de módulos de **login**, **operaciones bancarias** y **asignación de roles**.
  - Ajustes en las pruebas para asegurar que los módulos interconectados funcionen de manera fluida.
- Se mejoraron las respuestas simuladas para reflejar datos reales en escenarios de integración.

##### *Complicaciones:*
- Errores al ejecutar pruebas cuando un módulo dependía de otro con datos desactualizados.
- Dificultades en la sincronización de respuestas entre módulos, causando inconsistencias en los resultados de las pruebas.

### *Día 3: Pruebas de Integración - Operaciones Bancarias*

- Se llevaron a cabo pruebas de integración para las siguientes funcionalidades:
  - **Depósito:** Validación de cálculos correctos y actualizaciones en el saldo.
  - **Tarjeta de Crédito:** Validación de transacciones y límites de crédito.
  - **Crear Tarjeta de Débito:** Confirmación de la creación y asociación correcta a la cuenta.
  - **Pago de Servicios:** Confirmación de deducciones y actualizaciones en los servicios pagados.
- Todas las pruebas aseguraron la correcta interacción entre los módulos.

##### *Complicaciones:*

- Problemas con datos faltantes en las transacciones de tarjetas de crédito, lo que generó errores en las pruebas.
- Cálculos incorrectos en el pago de servicios debido a configuraciones iniciales erróneas.

### *Día 4: Implementación de CI/CD - Frontend*

- Se configuró **GitHub Actions** para la automatización de pruebas y despliegues en el frontend:
  - Configuración de workflows para ejecutar pruebas unitarias y de integración.
  - Integración con **Terraform** y **Ansible** para gestionar la infraestructura y el despliegue del frontend.
  - Implementación de pipelines para automatizar el despliegue en entornos de desarrollo y producción.

##### *Complicaciones:*
- Problemas iniciales con los workflows de GitHub Actions debido a errores de configuración.
- Retrasos en el despliegue por fallas en la configuración de roles en Terraform.

### *Día 5: Resolución de Problemas en CI/CD, Terraform y Pruebas de Aceptación*

- **CI/CD:**
  - Se solucionaron conflictos en los workflows de GitHub Actions que interrumpían la ejecución de pruebas y despliegues.
  - Se optimizó el tiempo de ejecución de los pipelines mediante la configuración de pasos paralelos.

- **Terraform y Ansible:**
  - Ajustes en los scripts de Terraform para corregir errores en la infraestructura del frontend.
  - Actualización de playbooks de Ansible para reflejar cambios en la configuración del entorno de producción.

- **Pruebas de Aceptación:**
  - Validación completa del frontend en entornos reales, incluyendo despliegues exitosos y pruebas de flujo de usuario.

##### *Complicaciones:*
- Errores intermitentes en la configuración de Terraform para el frontend.
- Fallas en pruebas de aceptación debido a configuraciones inconsistentes entre entornos de desarrollo y producción.


## Sprint Daily Scrum Report David Barrera
### *Día 1: Creación de componentes y nuevas rutas*
- Se crearon los nuevos componentes de cada uno de las nuevas ventanas

- Se crearon los los nuevos componentes para las páginas nuevas
Complicaciones

#### *Complicaciones:*
- Al momento de crear los nuevos componentes se tuvieron que revisar los anteriores porque en unos roles, habían componentes que tenian errores de responsividad

### *Dia 2: Correcciones y Desarrollo de Módulos de Tarjetas*
- Corrección en los módulos de validaciones de datos en la parte de registrar tarjeta y creación de pantallas para los módulos que se me asignaron

#### *Complicaciones:*

- Corrección de componente que tenían problemas en este caso los de reportes y creación de tarjetas y bloqueos de las mismas

### *Dia 3: Optimización de Formularios y Creación de Pantallas*

- Creé las pantallas de inicio con integración de los servicios para crear y bloquear tarjetas.
- Analicé los módulos pendientes para definir los siguientes pasos del desarrollo.

#### *Complicaciones:*

- Corrigír problemas en los módulos de formularios.

### *Dia 4: Implementación de Funcionalidades y Desarrollo de Préstamos*

- Implementé las pantallas con funcionalidades y conexión al backend para la creación de tarjetas de débito y crédito.
- Inicié el desarrollo de la funcionalidad de solicitud de préstamos.
- Realicé pruebas funcionales para verificar el correcto funcionamiento de las implementaciones.

#### *Complicaciones:*

- Aplicacion con los datos obtenidos desde el backend para la creacion de tarjetas de debito y credito.

### *Dia 5: Bloqueo de Tarjetas, Visualización de Reportes y TEST*

- Implementé pantallas con funcionalidades y conexión al backend para el bloqueo de tarjetas.
- Desarrollé la funcionalidad de visualización de reportes.
- Modifiqué las pantallas para permitir la actualización de la información del usuario.

#### *Complicaciones:*

- Integración de 5 test por E2E para el frontend usando Cypress



## Sprint Daily Scrum Report Jose Ceron
### *Día 1: Crear Nuevas tarjetas*
- Se valido la identidad y cumplimiento de politicas para optar una tarjeta.
- Se envio notifica al supervisor para aprobar una tarjeta al cliente.
#### *Complicaciones:*
- Al momento de asignar una tarjeta a un cliente, si es posible tener mas de una tarjeta de credito.
- Dudas con respecto a cómo el supervisor dara acceso al administrador para cambiar la contraseña.

### *Día 2: Bloque de tarjetas*
- Se valida primero si la tarjeta actual se encuentra activa.
- Se envia notificacion al cliente desde su correo que su tarjeta a sido bloqueada.
##### *Complicaciones:*
- Implementacion de enviar correo al usuario al momento de bloquear una tarjeta.

### *Día 3: Eliminar empleado*
- Se realiza un reporte acerca del empleado que desea eliminar.
- Se obtiene la lista de empleados activos actualmente.
- Se almacena una lista de empleados que son eliminados.
##### *Complicaciones:*
- Notificar al supervisor acerca del empleado que se desea eliminar.

### *Día 4: Aceptar prestamo y aprobar tarjetas*
- Se valida que un usuario no tenga un prestamo activo.
- Se obtiene el historial del usuario que se encuentra solicitando un prestamo.
- Se acepta el prestamo en caso de no contar con un prestamo activo y se rechaza al tener un prestamo activo.
##### *Complicaciones:*
- Validar que un usuario tenga al prestamo activo.

### *Día 5: Aprobar cancelacion de servicios*
- Se obtiene todas las solicitudes de los clientes que solicitan cancelar un servicio.
- Se valida el tipo de servicio que desea desvincularse el cliente.
- Se valida si cuenta con tarjeta de crédito sin pagar o prestamo activo al momento de aceptar una cancelacion de servicio.
##### *Complicaciones:*
- Validar si un cliente cuenta con una tarjeta de crédito que no está al día y los préstamos activos.

## Sprint Daily Scrum Report Luis Garcia
### *Día 1: Cambio de contraseña - Backend*
- Se analizó el módulo para tomar en cuenta los parámetros que se recibian que enviar.
- Se modificó la nueva contraseña y se encripto para modificarla en la base de datos
- Se envio la notificacion al correo del empleado con su nueva contraseña.
#### *Complicaciones:*
- Dudas con respecto a cómo el supervisor dara acceso al administrador para cambiar la contraseña.

### *Día 2: Cancelacion de servicios - Backend*
- Se analizó el módulo para tomar en cuenta los parámetros que se recibian que enviar.
- Se creo el model de la tabla service_cancellations
##### *Complicaciones:*
- Como manejar los datos recibidos en el backend para almacenar las solicitudes en la base de datos.

### *Día 3: Cancelacion de servicios y solicitar prestamos - Backend*
- Se creo el endpoint para enviar solicitud de cancelacion de servicio
- Se creo la tabla para almacenar las solicitudes de  préstamos
- Se creo el endpoint para enviar solicitud de prestamos
- Se arreglo la segunda contraseña del empleado creado.
##### *Complicaciones:*
- Analizar los datos para la creación de la tabla de solicitud de préstamos.

### *Día 4: Modificacion de informacin y contraseña - Backend*
- Se creó una tabla para almacenar las solicitudes de cambio de informacion y contraseña
- Se creo el endpoint para enviar solicitud de prestamos
- Se arreglo la segunda contraseña del empleado creado.
##### *Complicaciones:*
- Creacion de nuevos models para trabajar los diferentes endpoints

### *Día 5: Reportes y documentacion*
- Se agregaron los casos de uso expandidos en texto
- Se crearon los reportes para prestamos
- Se crearon los reportes para las transacciones de los clientes
- Se crearon los reportes para las diferentes solicitudes realizadas
##### *Complicaciones:*
- Cambiar una tabla para agregarle un nuevo atributo


## Sprint Daily Scrum Report - Cristofher Saquilmer

### *Día 1: Análisis y estructura eliminar empleado y cambio de contraseña empleado Frontend*

- Se analizó estructura para eliminar empleado
- Se analizó estructura para cambio de contraseña empleado
- Se creó estructura para cambio de contraseña empleado
- Se creó estructura para eliminar empleado

#### *Complicaciones:*
- Toma de decisión si se creaba una sola estructura tanto para eliminar empleado como cambio de contraseña de empleado

### *Día 2: Análisis y estructura para cancelar servicio*

- Se analizó estructura para cancelar servicio
- Se creó estructura para cancelar servicio

##### *Complicaciones:*
- Que servicios son los que irán incluidos en la cancelación
- Qué datos se visualizarán del lado del supervisor

### *Día 3: Reestructuración para eliminar empleado y cambio de contraseña empleado Frontend*

- Se creó estructura para cambio de contraseña empleado administrador y supervisor
- Se creó estructura para eliminar empleado administrador y supervisor

##### *Complicaciones:*
- Quien es el que genera la solicitud para eliminar empleado y crear una nueva contraseña de empleado

### *Día 4: Estructura para aprobar o rechazar préstamos y tarjetas*

- Se creó estructura para aprobar o rechazar un préstamo, rol supervisor
- Se creó estructura para aprobar o rechazar una tarjeta, rol supervisor

##### *Complicaciones:*
- Consideración si se podía tener ambas estructuras en una vista

### *Día 5: Estructura para aprobar cancelación de servicios y manual de usuario*

- Se creó estructura para aprobar cancelación de servicios
- Se actualizó manual de usuario

##### *Complicaciones:*
- Estructura para mostrar solicitudes de cancelación de servicios
