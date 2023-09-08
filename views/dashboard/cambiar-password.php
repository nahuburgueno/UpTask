<?php include_once __DIR__ . '/header-dashboard.php'; ?>


<div class="contenedor-sm">
    <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

    <a href="/perfil" class="boton-enlace">Volver a mi perfil</a>

    <form action="/cambiar-password" class="formulario" method="POST">

        <div class="campo">
            <label for="password_actual">Contraseña actual</label>
            <input type="password" name="password_actual" placeholder="Tu contraseña actual">
        </div>    

        <div class="campo">
            <label for="password_nuevo">Nueva contraseña</label>
            <input type="password"  name="password_nuevo" placeholder="Tu nueva contraseña">
        </div>

        <div class="boton-container">

        <input type="submit" value="Guardar cambios">
    </div>
    </form>
</div>

<?php include_once __DIR__ . '/footer-dashboard.php'; ?>


