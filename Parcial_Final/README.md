# Parcial Final | Servicios Telemáticos | 2025-2S (incluye video)
### Universidad Autónoma de Occidente | Facultad de Ingeniería y Ciencias Básicas | Ingeniería informática

**Realizado por:** Juan David Muñoz Olave - Jean Paul Delgado Jurado  

---

## Resultados de aprendizaje

### ¿Qué aprendió al integrar Docker, AWS y Prometheus?

De este laboratorio pudimos notar la importancia de orquestar aplicaciones en contenedores, el monitoreo de las métricas de salud de la máquina y el despliegue de estos servicios en un proveedor de nube para hacerlos disponibles en internet.
Aprendimos que Docker proporciona portabilidad y consistencia en los entornos de despliegue, mientras que AWS nos habilitó la infraestructura necesaria para publicar el servicio en internet y permitir el acceso a través de una IP pública. 
Por otro lado, Prometheus actúa como el componente central que unifica las métricas de diferentes fuentes, permitiendo una visibilidad completa del sistema. Consideramos que esto es sumamente importante para garantizar la disponibilidad y mejora continua de los servicios, pues no podemos mejorar procesos si no los medimos.

### ¿Qué fue lo más desafiante y cómo lo resolvería en un entorno real?

Una de los retos más grandes que experimentamos mientras desarrollamos el presente ejercicio práctico fue las limitaciones de la instancia de la máquina virtual de AWS en la que desplegamos. Frecuentemente tuvimos que detener y encender de nuevo la máquina, volver a iniciar y continuar con la operación. Esto por supuesto estaba condicionado por las especificaciones de la máquina, lo que degradaba rápidamente el rendimiento de los servicios hasta el punto de colapsar.
En un entorno real esto se mitiga desplegando soluciones en máquinas de mayor capacidad y, con la posibilidad de escalar, ya sea mediante nuevas instancias del mismo servicio que se reparten la carga (horizontal) o mediante la mejora de las especificaciones de la máquina en términos de memoria, CPU y almacenamiento, lo que nos permite ofrecer una experiencia fluida sin importar el volúmen de tráfico o la carga en la máquina.

### ¿Qué beneficio aporta la observabilidad en el ciclo DevOps?

La observabilidad aporta el ciclo DevOps al proporcionar retroalimentación inmediata en cada fase. En desarrollo, permite detectar problemas de rendimiento antes del despliegue. En operaciones, facilita el diagnóstico rápido de incidentes y, en el negocio, provee datos para la toma de decisiones informadas. Implementar observabilidad con Prometheus, Grafana y otras herramientas como Alertmanager crea un ciclo de mejora continua donde las métricas guían las optimizaciones y las alertas proactivas previenen fallos críticos. También, la observabilidad nos permite cumplir con SLA's que tengamos con clientes, pues es la forma en la que nos damos cuenta cuándo uno de nuestros servicios está degradado y debemos repararlo en la mayor brevedad.

Enlace: [Evidencias | YouTube](https://youtu.be/hAlTfnDM1UI)
