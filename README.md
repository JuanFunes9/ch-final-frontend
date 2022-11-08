# Front-end React para E-commerce

## Configuración básica y comandos
1. Descargar el repositorio a un etorno local
2. Instalar los paquetes con el comando:
~~~
npm install
~~~

3. Asegurarse de haber descargado, configurado e iniciado el servidor backend local, en el puerto 3000: https://github.com/JuanFunes9/ch-final-backend

4. Levantar el servidor front-end de desarrollo con el siguiente comando:
~~~
npm run dev
~~~

## Funcionalidades de Usuario no administrador

### Login y registro de usuarios

1. Registro de usuarios:
![registerView](/readmeImages/registerView.png)

***Nota:*** *Por cada registro de usuario, se le enviara un email al ADMIN_EMAIL informando del registro más los datos del nuevo usuario.*
![registerEmail](/readmeImages/registerEmail.png)

2. Login de usuarios:
![loginView](/readmeImages/loginView.png)

### Vista del listado de productos, filtros, paginación, y vista para cada producto:
![allProductsVire](/readmeImages/allProductsView.png)

![productView](/readmeImages/productView.png)

### Proceso de agregar producto al carrito, enviar pedido y visualizar historial de compras:
![addToCartView](/readmeImages/addToCartView.png)
*Una vez agregamos todos los productos que necesitemos, podemos visualizarlos en la vista del carrito*

![cartView](/readmeImages/cartView.png)

![buySuccess](/readmeImages/buySuccess.png)

*Ejemplo del email que recibe el administrador cuando el usuario envia un pedido:*
![newOrderEmail](/readmeImages/newOrderEmail.png)

*El usuario puede acceder al historial de sus compras desde su perfil, en el apartado de "HISTORIAL":*
![ordersHistorial](/readmeImages/ordersHistorial.png)

### Modificación del perfil de usuario:
![changeUserPhoto1](/readmeImages/changeUserPhoto1.png)

![changeUserPhoto2](/readmeImages/changeUserPhoto2.png)

![changeUserPhoto3](/readmeImages/changeUserPhoto3.png)

![changeUserName](/readmeImages/changeUserName.png)

![changeUserName2](/readmeImages/changeUserName2.png)

### Acceso al chat global para usuarios:
![chat](/readmeImages/chat.png)

## Funcionalidades de Usuario administrador
![adminView](/readmeImages/adminView.png)

### Formulario de carga de producto:
![newProd1](/readmeImages/newProd1.png)

![newProd2](/readmeImages/newProd2.png)

