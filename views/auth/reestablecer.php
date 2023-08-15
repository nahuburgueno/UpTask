<div class="contenedor reestablecer">
<?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

       
     

            <div class="contenedor-sm">
            <?php include_once __DIR__ . '/../templates/alertas.php'; ?>
            <?php if($mostrar) { ?>
        <p class="descripcion-pagina">Coloca tu nueva contraseña</p>

        
       
        
        <form  class="formulario" method="POST">
                <div class="campo">
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="Tu contraseña">
                </div>

                <input type="submit" class="boton" value="Guardar contraseña">
        </form>
       
        <?php } ?>

        <div class="acciones">
            <a href="/crear">Aún no tienes una cuenta? Crear una</a>
            <a href="/olvide">Olvidaste tu contraseña?</a>
        </div>
    </div><!-- Contenedor sm -->


</div>