// IIFE (Immediately invoked function expression)
(function() {

    obtenerTareas();
    let tareas = [];

  // Boton para mostrar el modal de agregar tarea
  const nuevaTareaBtn = document.querySelector('#agregar-tarea');
  nuevaTareaBtn.addEventListener('click', mostrarFormulario);

    async function obtenerTareas() {

        try {
            const id = obtenerProyecto();
            const url = `/api/tarea?id=${id}`
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            
            tareas = resultado.tareas;
            mostrarTareas();

        } catch (error) {
          console.log(error);  
        }
    }

    function mostrarTareas() {
            limpiarTareas();

        if( tareas.length === 0 ) {
            const contenedorTareas = document.querySelector('#listado-tareas');

            const textoNoTareas = document.createElement('LI');
            textoNoTareas.textContent = 'No hay tareas';
            textoNoTareas.classList.add('no-tareas');

            contenedorTareas.appendChild(textoNoTareas);
            return;
        }

        const estados = {
            0: 'Pendiente',
            1: 'Completa'
        }

        tareas.forEach(tarea => {

            const contenedorTarea = document.createElement('LI');
            contenedorTarea.dataset.tareaId = tarea.id;
            contenedorTarea.classList.add('tarea');

            const nombreTarea = document.createElement('P');
            nombreTarea.textContent = tarea.nombre;

            const opcionesDiv = document.createElement('DIV');
            opcionesDiv.classList.add('opciones');

            // Botones 
            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
            btnEstadoTarea.textContent = estados[tarea.estado];
            btnEstadoTarea.dataset.estadoTarea = tarea.estado;
            btnEstadoTarea.ondblclick = function() {
                cambiarEstadoTarea({...tarea});
            }

            const btnEliminarTarea = document.createElement('BUTTON');
            btnEliminarTarea.classList.add('eliminar-tarea');
            btnEliminarTarea.dataset.idTarea = tarea.id;
            btnEliminarTarea.textContent = 'Eliminar';


            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnEliminarTarea);

            contenedorTarea.appendChild(nombreTarea);
            contenedorTarea.appendChild(opcionesDiv);

            const listadoTareas = document.querySelector('#listado-tareas') 
            listadoTareas.appendChild(contenedorTarea);
        
        });
    }
    

   function mostrarFormulario() {
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>Añade una nueva tarea</legend>
                    <div class="campo">
                        <label>Tarea</label>
                             <input type="text" name="tarea" id="tarea" placeholder="Añadir tarea al proyecto actual"/>
                    </div>

                    <div class="opciones">
                        <button type="button" class="cerrar-modal">Cancelar</button>
                            <input type="submit" class="submit-nueva-tarea" value="Añadir tarea"/>
                    </div>
            </form>
            `;

            setTimeout(() => {
                const formulario = document.querySelector('.formulario');
                    formulario.classList.add('animar');
            }, 0);


            modal.addEventListener('click', function (e) {
                e.preventDefault();

                if (e.target.classList.contains('cerrar-modal')) {
                    const formulario = document.querySelector('.formulario');
                        formulario.classList.add('cerrar');

                        setTimeout(() => {
                            modal.remove();
                        }, 500);
                }

                if(e.target.classList.contains('submit-nueva-tarea')) {
                    submitFromularioNuevaTarea();
                }
            });

            document.querySelector(".dashboard").appendChild(modal);
   }

   function  submitFromularioNuevaTarea() {
        const tarea = document.querySelector('#tarea').value.trim(); // trim() lo que hace es eliminar los espacios al principio y al final.
            
            if (tarea === '' ) {
                // Mostrar una alerta de error
                    mostrarAlerta('El nombre de la tarea es obligatorio', 'error', document.querySelector('.formulario legend'));

                return
            }

                agregarTarea();
        }

        // Muestra un mensaje en la interfaz
    function mostrarAlerta(mensaje, tipo, referencia) {

        // Previene la creacion de multiples alertas

        const alertaPrevia  = document.querySelector('.alerta');
            if(alertaPrevia ) {
                alertaPrevia.remove();
            }

        const alerta = document.createElement('DIV');
            alerta.classList.add('alerta', tipo);
            alerta.textContent = mensaje;

            // Esta alerta la inserta antes del LEGEND.
            referencia.parentElement.insertBefore(alerta, referencia);

            // Eliminar la alerta despues de 4sg

            setTimeout(() => {
                alerta.remove();
            }, 4000);

    }   

        //Consultar el servidor para añadir una nueva tarea al proyecto acutal
    async function agregarTarea(tarea) {
        
        // Construir la peticion
        const valorInput = document.querySelector('#tarea').value;
        const datos = new FormData();
        datos.append('nombre', valorInput);
        datos.append('proyectoId', obtenerProyecto());

        
        try {
            const url = 'http://localhost:3000/api/tarea';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });


            const resultado = await respuesta.json();
            console.log(resultado); 

            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'));

            if (resultado.tipo === 'exito') {
                const modal = document.querySelector('.modal');
                setTimeout(() => {
                    modal.remove();
                }, 3000);

                // Agregar el objeto de tarea al global de tareas
                const tareaObj = {
                    id: String(resultado.id),
                    nombre: tarea,
                    estado: '0',
                    proyectoId: resultado.proyectoId
                };

                tareas =[...tareas, tareaObj];
                mostrarTareas();
            }

        } catch (error) {
            console.log(error);
        }
    }

    function cambiarEstadoTarea(tarea) {

        const nuevoEstado = tarea.estado === '1' ? '0' : '1';
        tarea.estado = nuevoEstado;
        actualizarTarea(tarea);

    }

    async function  actualizarTarea(tarea) {
        const {estado, id, nombre, proyectoId} = tarea;
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());

        try {
            const url = 'http://localhost:3000/api/tarea/actualizar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

             const resultado = await respuesta.json(); 

            if(resultado.respuesta.tipo === 'exito') {
                mostrarAlerta(resultado.respuesta.mensaje, resultado.respuesta.tipo, document.querySelector('.contenedor-nueva-tarea'));
            }

        } catch (error) {
            console.log(error);
        } 
    }

    function obtenerProyecto() {
        
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
            return proyecto.id;
    }

    function limpiarTareas() {
        const listadoTareas = document.querySelector('#listado-tareas');
        
        while (listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }
    }

})();