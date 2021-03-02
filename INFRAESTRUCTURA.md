# IMPLEMENTACIÓN DE UN SERVIDOR AWS EC2
para levantar un servidor en EC2, se debe tener un acceso a la consola
de aws, los recursos utilizados son de la capa gratuita, otra forma
de levantar recursos es a traves de la arquictetura como codigo, usando terraform u otra herramienta similar.

A continuación veremos los pasos a seguir para levantar un servidor EC2 
usando la consola web de aws.

- Se ingresa a la cuenta
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awslogin.PNG)

- se va a los servicios una vez logeado y seleciona en Informatica EC2
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awsmenuservices.PNG)

- se crea una instancia
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awscrearinstancia.PNG)

- se seleciona un sistema operativo, para hacer uso de la capa gratuita selecionamos uno que diga: Apto para la capa gratuita.
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awsselectos.PNG)


- para que nuesta API se pueda llamar debemos registrar un security group exponiendo los puertos que estaran abiertos, ssh estara por defecto para que podamos conectarnos al servidor, ademas del http 80 y TCP personalizado en puerto 30000 para acceder a la aplicación en React.js.
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awseditgroup.PNG)
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awsports.PNG)

- luego obtenemos una Key para poder conectarnos a traves de ssh, en mi caso utilizare una que ya he creado previamente.

![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awskey.PNG)

- por ultimo la instancia se lanzara e iniciara
![](https://github.com/cristian-programmer/Task-Timer/blob/main/screenshots/awsinstancestart.PNG)
