# Monitorización de Sistemas Linux con Prometheus, Node Exporter y Grafana

## Descripción
En esta parte se implementa un stack completo de monitorización para sistemas Linux utilizando Prometheus para la recolección de métricas, Node Exporter para la exposición de métricas del sistema y Grafana para la visualización y creación de dashboards.

## Componentes Instalados

### 1. Prometheus

Prometheus es un sistema de monitoreo y alerta que recolecta y almacena métricas de series de tiempo. Funciona como el componente central del stack de monitorización.

**Fuente de Instalación:**  
https://www.cherryservers.com/blog/install-prometheus-ubuntu

### 2. Node Exporter

Node Exporter es un collector de métricas de hardware y sistema operativo escrito en Go que expone métricas en formato Prometheus.

**Fuente de Instalación:**  
https://gist.github.com/nwesterhausen/d06a772cbf2a741332e37b5b19edb192 y otras fuentes

### 3. Grafana

Grafana es una aplicación de código abierto para visualización y análisis de métricas que permite crear dashboards interactivos para Prometheus y otras fuentes de datos.

**Fuente de Instalación:**  
https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/

## Documentación de métricas usadas

### **Métrica de Uso de CPU**
Calcula el porcentaje de utilización del procesador midiendo el tiempo que las CPUs permanecen activas versus inactivas, promediado sobre 5 minutos. Es crucial porque un uso sostenido superior al 60% indica saturación del procesador, generando cuellos de botella, aumento de latencia y degradación del rendimiento general. Su monitoreo permite identificar procesos problemáticos, planificar escalado de recursos y prevenir fallos por sobrecarga que podrían afectar servicios críticos.

#### **Expresión**
```yml
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 60
```

### **Métrica de Utilización de Memoria**  
Evalúa el porcentaje de memoria RAM utilizada excluyendo cachés y búfers, alertando cuando supera el 85% durante 5 minutos. Su importancia radica en que el consumo excesivo fuerza al sistema a usar swap (memoria en disco), reduciendo drásticamente la velocidad de respuesta, causando inestabilidad en aplicaciones y pudiendo activar el OOM Killer del kernel. Este monitoreo facilita la optimización de recursos, detección de fugas de memoria y garantiza que las aplicaciones operen eficientemente.

#### **Expresión**
```yml
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
```

### **Métrica de Espacio en Disco**
Monitorea el porcentaje de espacio disponible en sistemas de archivos (excluyendo tmpfs), alertando críticamente con menos del 10% de espacio libre. Es importante que observemos este recurso pues el agotamiento del almacenamiento puede provocar interrupción de servicios, imposibilidad de escribir logs, fallos en bases de datos y corrupción de información. Además, los sistemas requieren espacio libre para operaciones básicas como actualizaciones. Este monitoreo permite limpiezas preventivas, expansión oportuna de almacenamiento y evita paradas no planificadas.

#### **Expresión**
```yml
(node_filesystem_avail_bytes{fstype!="tmpfs"} / node_filesystem_size_bytes{fstype!="tmpfs"} * 100) < 10
```
