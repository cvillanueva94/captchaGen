# API de generación y validación de CAPTCHAs

Esta API te permite generar y validar CAPTCHAs utilizando una imagen con una pregunta y una respuesta.

La API está construida con Node.js y Express, utilizando MongoDB como base de datos para almacenar los CAPTCHAs generados.

## Instalación

Para instalar las dependencias de la aplicación, utiliza el siguiente comando:

```bash
yarn 
```

Luego, puedes iniciar la aplicación utilizando el siguiente comando:

```bash
yarn start
```

La aplicación estará disponible en `http://localhost:3000`.

## Endpoints

### Generar un nuevo CAPTCHA

Endpoint: `GET /captcha`

Este endpoint genera un nuevo CAPTCHA y devuelve su imagen y su UUID en formato JSON.

Ejemplo de respuesta exitosa:

```json
{
"uuid": "0c6d0a6c-87e5-4c1e-8f8b-7f9d9f6dd7a6",
"message": "Mensaje de pregunta al usuario",
"image": "Imagen en Base64"
}
```

### Validar un CAPTCHA existente

Endpoint: `POST /captcha/:uuid`

Este endpoint valida un CAPTCHA existente utilizando su UUID y la respuesta proporcionada por el usuario.

El cuerpo de la petición debe incluir la respuesta del usuario en formato JSON:

```json
{
"answer": "respuesta_del_usuario"
}
```

Ejemplo de respuesta exitosa:

```json
{
"message": "CAPTCHA validado correctamente",
"isOk": true
}
```

## Documentación

La documentación completa de la API está disponible en `/docs`, donde se encuentra la interfaz de Swagger.

## Pruebas

Para ejecutar las pruebas automatizadas, utiliza el siguiente comando:

```bash
yarn test
```

Este comando ejecutará todas las pruebas definidas en la carpeta `__tests__`.

## Contribución

Si deseas contribuir a esta API, por favor crea un `pull request` con los cambios propuestos.

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes ver el archivo `LICENSE` para más detalles.

## Contacto

Si tienes alguna duda o problema con la API, por favor contacta al desarrollador a través de su correo electrónico o redes sociales.

## Autor

Desarrollado por @cvillanueva94.