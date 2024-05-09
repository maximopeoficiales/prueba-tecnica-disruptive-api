# Prueba Técnica "Disruptive Studio - Biblioteca Multimedia" 

API con el proposito de poder crear contenido con tematicas y permisos segun el tipo de usuario

## Requisitos
-  Docker
-  Docker-compose

## Configuración del proyecto

Configurando variables

-  Duplique el archivo .env.example y cambie la extensión a .env
-  Complete los valores de las variables a su gusto
-  Si va ejecutar el proyecto en entorno desarrollo es importante que la variable se mantenga asi, esto para mantener la conexion por docker

```bash
DB_HOST=mongodb://mongodb
```

## Ejecución del proyecto en entorno desarrollo

```bash
docker-compose up
```

Luego dirigirse a la ruta para visualizar la documentacion de la API **https://localhost:3000/docs**

