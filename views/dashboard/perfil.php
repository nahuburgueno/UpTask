<?php include_once __DIR__ . '/header-dashboard.php'; ?>


<div class="contenedor-sm">
    <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

    <a href="/cambiar-password" class="boton-enlace">Cambiar contraseña</a>

    <form action="/perfil" class="formulario" method="POST">

        <div class="campo">
            <label for="nombre">Nombre</label>
            <input type="text" value="<?php echo $usuario->nombre; ?>" name="nombre" placeholder="Tu nombre">
        </div>    

        <div class="campo">
            <label for="email">Email</label>
            <input type="email" value="<?php echo $usuario->email; ?>" name="email" placeholder="Tu email">
        </div>
            
            <div class="boton-container">
            <input type="submit" value="Guardar cambios">
            </div>
    </form>
</div>

<?php include_once __DIR__ . '/footer-dashboard.php'; ?>


