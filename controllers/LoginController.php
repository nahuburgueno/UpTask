<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController {

    public static function login(Router $router) {
        if( $_SERVER["REQUEST_METHOD"] === 'POST' ) {

        }
        // Render a la vista
        $router->render('auth/login', [
            'titulo' => 'Iniciar Sesión'
        ]);
    }
    public static function logout() {
       
    }
    public static function crear(Router $router) {
        
        $alertas = [];
        $usuario = new Usuario;
        
        if( $_SERVER["REQUEST_METHOD"] === 'POST' ) {

            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();

            if(empty($alertas)){
                
                $existeUsuario = Usuario::where('email', $usuario->email);

                if($existeUsuario){
                Usuario::setAlerta('error', 'El usuario ya esta registrado');
                $alertas = Usuario::getAlertas();
                } else {

                    // Hashear el password
                    $usuario->hashPassword();

                    // Eliminar password2
                    unset($usuario->password2);

                    //Generar el token
                    $usuario->crearToken();
        
                    // Crear un nuevo usuario
                    $resultado = $usuario->guardar();

                    // Enviar email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
    
                    $email->enviarConfirmacion();

                    

                    if($resultado){
                        header("Location: /mensaje");
                    }

                }
            }
        }

        // Render a la vista
         $router->render('auth/crear', [
             'titulo' => 'Crea tu cuenta en UpTask',
             'usuario' => $usuario,
             'alertas' => $alertas
        ]);
    }
    public static function olvide(Router $router) {

        if( $_SERVER["REQUEST_METHOD"] === 'POST' ) {

        }
        // Render a la vista
        $router->render('auth/olvide', [
            'titulo' => 'Olvide mi contraseña' 

        ]);
    }
    public static function reestablecer(Router $router) {

        if( $_SERVER["REQUEST_METHOD"] === 'POST' ) {

        }
        // Muestra la vista
        $router->render('auth/reestablecer', [
            'titulo' => 'Reestabelecer contraseña'
        ]);
    }
    public static function mensaje(Router $router) {
        $router->render('auth/mensaje', [
            'titulo' => 'Cuenta creada exitosamente'
        ]);

    }
    public static function confirmar(Router $router) {

        $token = s($_GET['token']);
        
        if (!$token) { header('Location: /'); }
        

        // Encontrar al usuario con este token
        $usuario = Usuario::where('token', $token);
        if(empty($usuario)) {
            
            // No se encontro un usuario con ese token

            Usuario::setAlerta('error', 'Token no valido'); 
        } else {
            // Confirmar la cuenta
            $usuario->confirmado = 1;
            $usuario->token = null;
            unset($usuario->password2);

            // Guardar en la base de datos
            $usuario->guardar();

            Usuario::setAlerta('exito', 'Cuenta confirmada correctamente'); 

        }
        
        $alertas = Usuario::getAlertas();

        $router->render('auth/confirmar', [
            'titulo' => 'Confirma tu cuenta UpTask',
            'alertas' => $alertas


        ]);

    }
}

