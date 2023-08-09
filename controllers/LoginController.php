<?php

namespace Controllers;

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
        if( $_SERVER["REQUEST_METHOD"] === 'POST' ) {

        }
        // Render a la vista
         $router->render('auth/crear', [
             'titulo' => 'Crea tu cuenta en UpTask' 
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
        $router->render('auth/confirmar', [
            'titulo' => 'Confirma tu cuenta UpTask'
        ]);

    }
}

