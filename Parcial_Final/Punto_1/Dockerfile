FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalación de Apache, mod_wsgi, Python y herramientas
RUN apt-get update && apt-get install -y \
    apache2 \
    libapache2-mod-wsgi-py3 \
    python3 python3-pip python3-dev \
    build-essential \
    libssl-dev libffi-dev \
    openssl \
    pkg-config \
    default-libmysqlclient-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


RUN pip3 install --upgrade pip setuptools wheel

WORKDIR /var/www/webapp

# Instalar dependencias de Python (sin restricciones)
COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copiar el proyecto completo
COPY . /var/www/webapp

# Crear certificado SSL autofirmado
RUN mkdir -p /etc/ssl/private && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/selfsigned.key \
    -out /etc/ssl/certs/selfsigned.crt \
    -subj "/C=CO/ST=VA/L=Cali/O=Tijeretazos/OU=Rosario/CN=productos"

# Activar módulos
RUN a2enmod ssl \
    && a2enmod rewrite \
    && a2enmod wsgi \
    && a2dissite 000-default.conf

# Copiar virtual host
COPY docker/apache/flaskapp.conf /etc/apache2/sites-available/flaskapp.conf

RUN a2ensite flaskapp.conf

# Permisos correctos
RUN chown -R www-data:www-data /var/www/webapp

EXPOSE 80 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
