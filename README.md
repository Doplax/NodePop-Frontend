# Checklist para Aplicación SPA en React

## Páginas y Rutas
### Públicas
- [ x ] `/login`: LoginPage

### Protegidas
- [ x ] `/`: Redirecciona a `/adverts`
- [ x ] `/adverts`: AdvertsPage
- [ x ] `/adverts/:id`: AdvertPage
- [ x ] `/adverts/new`: NewAdvertPage
- [ x ] *Para cualquier otra URL*: NotFoundPage (404)

## Funcionalidad de cada Página-Componente
### LoginPage
- [ x ] Formulario para email y password
- [ x ] Checkbox “Recordar contraseña” para guardar sesión en localStorage

### AdvertsPage
- [ x ] Listado de anuncios (nombre, precio, tipo, tags)
- [ x ] Manejo de estado para "sin anuncios"
- [ x ] Enlace a detalle de anuncio (`/adverts/:id`)
- [ ] Zona de filtros (nombre, tipo, precio, tags)
- [ ] Opción de filtrado dinámico o filtrado con botón
- [ ] Implementar mínimo 2 filtros (nombre, tipo, precio, tags)

### AdvertPage
- [ x ] Detalle de anuncio según ID
- [ x ] Mostrar foto del anuncio o placeholder
- [ x ] Redireccionar a NotFoundPage si el anuncio no existe
- [ ] Botón para borrar anuncio con confirmación

### NewAdvertPage
- [ x ] Formulario para crear anuncio (nombre, tipo, tags, precio, foto)
(Falta Foto)
- [ x ] Validaciones de formulario (todos los campos excepto foto requeridos)
- [ x ] Redireccionar a la página del anuncio tras creación

## Componentes Adicionales
- [ ] Componente de Logout visible cuando el usuario está logueado
- [ x ] Enlaces de navegación para `/adverts` y `/adverts/new`

## Notas Adicionales
- Considerar la reutilización de componentes (por ejemplo, para confirmaciones)
- Priorizar la práctica con el estado de React
