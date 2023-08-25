// IIFE (Immediately invoked function expression)
(function() {
  // Boton para mostrar el modal de agregar tarea

  const nuevaTareaBtn = document.querySelector('#agregar-tarea');
  nuevaTareaBtn.addEventListener('click', mostrarFormulario);

   function mostrarFormulario() {
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>Añade una nueva tarea</legend>
                    <div class="campo">
                        <label>Tarea</label>
                             <input type="text" name="tarea" placeholder="Añadir tarea al proyecto actual"  id="tarea"/>
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
        const datos = new FormData();
        datos.append('nombre', tarea);
        datos.append('proyectoId', obtenerProyecto());

        
        try {
            const url = 'http://localhost:3000/api/tarea';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            console.log(resultado);

        } catch (error) {
            console.log(error);
        }
    }

    function obtenerProyecto() {
        
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
            return proyecto.id;
    }
})();