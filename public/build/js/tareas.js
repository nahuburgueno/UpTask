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
            })

            document.querySelector("BODY").appendChild(modal);
   }
})();