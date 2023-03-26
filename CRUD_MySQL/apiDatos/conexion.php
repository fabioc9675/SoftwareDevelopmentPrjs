<?php

class Conexion {
	
 public function getConexion(){
   $host = "192.168.1.157";  //127.0.0.1 0 localhost
   $db = "TEST_MQTT";      //base de datos de mysql
   $user = "root";       // usuario de mysql
   $password = "root";       //contraseña de mysql

//conexion a la base datos utilizando pdo
 $db = new PDO("mysql:host=$host;dbname=$db;", $user, $password);

  return $db;
}

}

?>