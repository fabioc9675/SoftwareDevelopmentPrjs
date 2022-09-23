<?php
 
class Api{


function console_log( $data ){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
}

public function getDatos(){
     $vector = array();
     $conexion = new Conexion();
     $db = $conexion->getConexion();
     $sql = "SELECT * FROM `MQTT_DATOS`";
     $consulta = $db->prepare($sql);
     $consulta->execute();
     while($fila = $consulta->fetch()) {
        $vector[] = array(
          "ID" => $fila['ID'],
          "USUARIO" => $fila['USUARIO'],
          "TOPIC" => $fila['TOPIC'],
          "DATO" =>  $fila['DATO']); }

     return $vector;
}

public function addDato($topico, $usuario, $dato){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO `MQTT_DATOS` (`USUARIO`, `TOPIC`, `DATO`) VALUES (:USUARIO,:TOPIC,:DATO)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':USUARIO', $usuario);
  $consulta->bindParam(':TOPIC', $topico);
  $consulta->bindParam(':DATO', $dato);
  $consulta->execute();

  return '{"msg":"Dato agregado"}';
}

public function deleteDato($id){
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM `MQTT_DATOS` WHERE ID=:ID";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':ID', $id); 
  $consulta->execute();

  return '{"msg":"Dato eliminado"}';
}

public function getDato($id){
  $vector = array();
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "SELECT ID, TOPIC, USUARIO, DATO FROM `MQTT_DATOS` WHERE ID=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);
  $consulta->execute();
  while($fila = $consulta->fetch()) {
     $vector[] = array(
       "ID" => $fila['ID'],
       "USUARIO" => $fila['USUARIO'],
       "TOPIC" => $fila['TOPIC'],
       "DATO" =>  $fila['DATO']); }

  return $vector[0];
}

public function updateDato($id, $topico, $usuario, $dato){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "UPDATE `MQTT_DATOS` SET TOPIC=:topico, USUARIO=:usuario, DATO=:dato WHERE ID=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);  
  $consulta->bindParam(':usuario', $usuario);
  $consulta->bindParam(':topico', $topico);
  $consulta->bindParam(':dato', $dato);
  $consulta->execute();

  return '{"msg":"Dato actualizado"}';
}



}
?>