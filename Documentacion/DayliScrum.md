### Sprint Daily Scrum Report Mariano Camposeco
#### *Día 1: Modelado de Base de Datos*- Se analizó y modeló la base de datos considerando todas las posibilidades y requisitos del sistema.
- Se definieron las relaciones, entidades y atributos necesarios para garantizar escalabilidad y eficiencia en las operaciones.
##### *Complicaciones:*- Identificación de relaciones complejas que requirieron ajustes iterativos en el modelo.
- Necesidad de consenso entre el equipo para definir los nombres de tablas y columnas clave.
#### *Día 2: Implementación del Login*- Se desarrolló y probó el sistema de login para todos los usuarios.
- Aseguró la autenticación y autorización de manera segura mediante pruebas unitarias.
##### *Complicaciones:*- Manejo de diferentes escenarios de error, como contraseñas incorrectas y usuarios inactivos.
- Ajustes en la integración con el sistema de roles y permisos.
#### *Día 3: Funcionalidades de Servicios*- Se implementaron las siguientes funcionalidades:
  - Pago de servicios.  - Búsqueda de CUI.
  - Actualización de datos de clientes.  - Asignación de roles y endpoints necesarios.
- Se verificó la correcta interacción entre las funcionalidades y la base de datos.
##### *Complicaciones:*- Asegurar la consistencia de los datos en las actualizaciones concurrentes.
- Documentación de los endpoints para el equipo de frontend.
#### Día 4: Despliegue en la Nube**- Se configuraron instancias de **AWS EC2 para el entorno productivo.
- Se utilizó Docker para la contenedorización y despliegue continuo.- Aseguró la estabilidad del sistema tras el despliegue.
##### Complicaciones:
- Configuración inicial de las políticas de seguridad en AWS.- Ajustes en las imágenes Docker para reducir el tiempo de despliegue.
#### Día 5: Desarrollo del Frontend
- Se trabajaron las interfaces de usuario para las funcionalidades de:  - Pago de servicios.
  - Pago de préstamos.  - Retiro y depósito de dinero.
  - Cambio de moneda.- Se optimizó la experiencia del usuario para facilitar la navegación y uso del sistema.
##### Complicaciones:
- Compatibilidad de estilos entre navegadores.- Sincronización de cambios en backend y frontend para pruebas integrales.


---------------------------------------------------------------------

Sprint Daily Scrum Report David Enrique 
 
#### Día 1: Base del Nuevo Frontend en Angular 
- Se revisó toda la estructura base del nuevo frontend utilizando Angular. 
- Se establecieron los componentes iniciales y la arquitectura del proyecto. 
- Configuración de herramientas como Angular CLI y las dependencias principales para el desarrollo. 
 
##### Complicaciones: 
- Integración de nuevas librerías que requerían ajustes en el entorno de desarrollo. 
- Problemas iniciales con la configuración del enrutador de Angular. 
 
#### Día 2: Implementación del Login 
- Desarrollo del sistema de login para empleados, administradores y supervisores. 
- Se trabajó en la autenticación con diferentes niveles de permisos. 
- Pruebas de roles para validar accesos según las credenciales ingresadas. 
 
##### Complicaciones: 
- Ajustes en la gestión de tokens para cada tipo de usuario. 
- Sincronización entre backend y frontend para garantizar sesiones activas correctamente. 
 
#### Día 3: Funcionalidades de Servicios Bancarios 
- Implementación del frontend para: 
  - Pago de tarjetas de crédito. 
  - Registro de quejas por parte de los clientes. 
  - Gestión de inventarios bancarios. 
- Creación de formularios interactivos y validación de datos en tiempo real. 
 
##### Complicaciones: 
- Manejo de grandes volúmenes de datos para inventarios bancarios. 
- Diseño de interfaces responsivas para los formularios. 
 
#### Día 4: Funcionalidades de Monitoreo y Gestión 
- Desarrollo de: 
  - Monitoreo de actividad en tiempo real para el sistema. 
  - Registro y gestión de administradores del sistema. 
  - Visualización del historial de quejas registradas por los clientes. 
- Mejoras en la experiencia de usuario para simplificar el monitoreo. 
 
##### Complicaciones: 
- Optimización del monitoreo en tiempo real para evitar retrasos. 
- Gestión eficiente de grandes cantidades de registros históricos de quejas. 
 
#### Día 5: Gestión de Seguridad y Actualización de Datos 
- Desarrollo de funcionalidades de: 
  - Gestión y programación de copias de seguridad. 
  - Asignación y gestión de roles en el sistema. 
  - Actualización de datos de clientes desde el frontend. 
- Implementación de mensajes de confirmación y validación en los formularios. 
 
##### Complicaciones: 
- Configuración inicial de la automatización de las copias de seguridad. 
- Sincronización de roles y datos de clientes con el backend.

--------------------------------------------------------------------

Sprint Daily Scrum Report Luis Garcia 
 
#### Día 1: Funcionalidad retirar dinero - Backend
- Se revisó toda la estructura base del nuevo frontend utilizando Angular. 
- Se establecieron los componentes iniciales y la arquitectura del proyecto. 
- Configuración de herramientas como Angular CLI y las dependencias principales para el desarrollo. 

-
 
##### Complicaciones: 
- Integración de nuevas librerías que requerían ajustes en el entorno de desarrollo. 
- Problemas iniciales con la configuración del enrutador de Angular. 
 
#### Día 2: Implementación del Login 
- Desarrollo del sistema de login para empleados, administradores y supervisores. 
- Se trabajó en la autenticación con diferentes niveles de permisos. 
- Pruebas de roles para validar accesos según las credenciales ingresadas. 
 
##### Complicaciones: 
- Ajustes en la gestión de tokens para cada tipo de usuario. 
- Sincronización entre backend y frontend para garantizar sesiones activas correctamente. 
 
#### Día 3: Funcionalidades de Servicios Bancarios 
- Implementación del frontend para: 
  - Pago de tarjetas de crédito. 
  - Registro de quejas por parte de los clientes. 
  - Gestión de inventarios bancarios. 
- Creación de formularios interactivos y validación de datos en tiempo real. 
 
##### Complicaciones: 
- Manejo de grandes volúmenes de datos para inventarios bancarios. 
- Diseño de interfaces responsivas para los formularios. 
 
#### Día 4: Funcionalidades de Monitoreo y Gestión 
- Desarrollo de: 
  - Monitoreo de actividad en tiempo real para el sistema. 
  - Registro y gestión de administradores del sistema. 
  - Visualización del historial de quejas registradas por los clientes. 
- Mejoras en la experiencia de usuario para simplificar el monitoreo. 
 
##### Complicaciones: 
- Optimización del monitoreo en tiempo real para evitar retrasos. 
- Gestión eficiente de grandes cantidades de registros históricos de quejas. 
 
#### Día 5: Gestión de Seguridad y Actualización de Datos 
- Desarrollo de funcionalidades de: 
  - Gestión y programación de copias de seguridad. 
  - Asignación y gestión de roles en el sistema. 
  - Actualización de datos de clientes desde el frontend. 
- Implementación de mensajes de confirmación y validación en los formularios. 
 
##### Complicaciones: 
- Configuración inicial de la automatización de las copias de seguridad. 
- Sincronización de roles y datos de clientes con el backend.