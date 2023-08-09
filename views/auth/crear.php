<div class="contenedor crear">

<?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <div class="contenedor-sm">
        <p class="descripcion-pagina">Crea tu cuenta en UpTask</p>
        <form action="/crear" class="formulario" method="POST">
                <div class="campo">
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" placeholder="Tu nombre">
                </div>
                <div class="campo">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Tu email">
                </div>
                <div class="campo">
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="Tu contraseña">
                </div>
                <div class="campo">
                    <label for="password2">Repetir Contraseña</label>
                    <input type="password" name="password2" id="password2" placeholder="Repite tu contraseña">
                </div>

                <input type="submit" class="boton" value="Crear cuenta">
        </form>
        <div class="acciones">
            <a href="/">Ya tienes una cuenta? Iniciar sesión</a>
            <a href="/olvide">Olvidaste tu contraseña?</a>
        </div>
    </div><!-- Contenedor sm -->
</div>