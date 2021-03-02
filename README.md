# Task Timer API REST
Este proyecto tiene como proposito, crear una API rest para
llevar el time tracking de tareas y posterior mente asignarla
a proyectos de un usuario en particular.

El proyecto esta escrito en Nodejs, Express, Mongodb para el backend
para ver la documentacion de la API en postman puede ir al siguiente enlace.

[Documentacion API con postman](https://documenter.getpostman.com/view/5820410/TWDfCCfw)

## Requerimientos 
Los casos de uso que debe tener la aplicacion son los siguientes y aquellos que estan implementados tienen la marca [x]
-  Habría varios usuarios usando la aplicación [x]
- Cada usuario tendría una forma de ver todas sus tareas ordenadas de la más reciente a la más antigua. [x]
- El usuario debe poder iniciar una tarea incluso si no tiene nombre. Además, el usuario debería poder pausarlo o reiniciarlo [x]
- El usuario también debe poder ingresar una tarea manualmente proporcionando el nombre y la duración de la tarea en horas, minutos y segundos
- La aplicación debe permitir al usuario crear proyectos y asociar registros de tiempo con tareas, y debería permitirles ver sus tiempos por proyecto [x]
- Finalmente, cada tarea debe tener una forma de "continuar" para rehabilitar esa tarea (empezar a registrar el tiempo de una tarea tomando el nombre de la que va a continuar).
- Debería haber una forma de ver la lista de todos Proyectos para todos los usuarios con el tiempo total invertido (tanto por proyecto como por usuario) [x]

## Explicacion a el punto 
***Si hay alguna funcionalidad que se implementaría mejor en el lado de la interfaz de usuario, agregue una nota en su respuesta por qué debería ser parte de la interfaz de usuario y no backend.***

Las funcionalidades que pienso deberia estar en el cliente son las siguiente:
  - El usuario debe poder iniciar una tarea incluso si no tiene nombre. Además, el usuario debería poder pausarlo o reiniciarlo.
  - Finalmente, cada tarea debe tener una forma de "continuar" para rehabilitar esa tarea (empezar a registrar el tiempo de una tarea tomando el nombre de la que va a continuar).

## Infraestructura
La aplicacion se encuentra ubicada en un servidor EC2 de amazon sobre un servidor ubuntu, ademas en este mismo aunque no es buena practica y solo por ser de prueba se coloco un servicio de Mongodb sobre este mismo servidor.


## Para la instalacion 
 necesitara las siguientes herramientas:

    - ssh
    - Nodejs Express y depencias
    - Mongodb
    - AWS account
    - Postman

## Extra
 No hace parte de los requerimientos pero decidi implementar una Aplicacion
 que interactuara con la API, esta desarrollada en Reactjs y hospedad en amazon EC2, puede verla [Aqui](http://ec2-18-207-142-206.compute-1.amazonaws.com:3000/), Esto lo hice pensando en implementar uno de los requerimientos, la cual era llevar el tiempo las tareas.
 Aqui puede ver el codigo fuente del proyecto de la UI
 [TaskTimerUI](https://github.com/cristian-programmer/TaskTimerUI)

 ![](screenshots/tasktimerui.png)








