<?php

namespace Model;

class Usuario extends ActiveRecord {
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 'confirmado'];

        // Declarar visibilidad
        public $id;
        public $nombre;
        public $email;
        public $password;
        public $password2;
        public $token;
        public $confirmado;

    public function __construct($args = []) {
    
        $this-> id = $args['id'] ?? null;
        $this-> nombre = $args['nombre'] ?? '';
        $this-> email = $args['email'] ?? '';
        $this-> password = $args['password'] ?? '';
        $this-> password2 = $args['password2'] ?? '';
        $this-> token = $args['token'] ?? '';
        $this-> confirmado = $args['confirmado'] ?? 0;
    }


    // Validar el login de usuarios
    public function validarLogin() {


        if(!$this->email) {
            self::$alertas['error'][] = 'El email del usuario es obligatorio'; 
        }
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            self::$alertas['error'][] = "Email no válido";
        }
        if(!$this->password) {
            self::$alertas['error'][] = 'La contraseña del usuario no puede estar vacia'; 
        }

        return self::$alertas;

    }

    // Validacion para cuentas nuevas
    public function validarNuevaCuenta() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El nombre del usuario es obligatorio';
        }
        if(!$this->email) {
            self::$alertas['error'][] = 'El email del usuario es obligatorio'; 
        }
        if(!$this->password) {
            self::$alertas['error'][] = 'La contraseña del usuario no puede estar vacia'; 
        }
        if(strlen($this->password) < 6 )  {
            self::$alertas['error'][] = 'La contraseña debe contener al menos 6 caracteres'; 
        }
        if($this->password !== $this->password2) {
            self::$alertas['error'][] = 'Las contraseñas son diferentes'; 
        }
        return self::$alertas;
    }

    // Valida un email

    public function validarEmail() {
        if(!$this->email) { 
            self::$alertas['error'][] = 'El email es obligatorio';
        }

        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            self::$alertas['error'][] = "Email no válido";
        }
        return self::$alertas;
    }

    // Valida el password

    public function validarPassword() {

        if(!$this->password) {
            self::$alertas['error'][] = 'La contraseña del usuario no puede estar vacia'; 
        }
        if(strlen($this->password) < 6 )  {
            self::$alertas['error'][] = 'La contraseña debe contener al menos 6 caracteres'; 
        }

        return self::$alertas;

    }

    // Hashea el password
    public function hashPassword() {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    // Generar un token
    public function crearToken(){
        $this->token = uniqid();
    }
}

