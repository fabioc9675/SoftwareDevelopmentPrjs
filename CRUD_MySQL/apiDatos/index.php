<?php
require_once('conexion.php');
require_once('api.php');
require_once('cors.php');
//obteniedo el metodo http
$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    if(!empty($_GET['ID'])){
       $id = $_GET['ID'];
       $json = null;
       $api = new Api();
       $vector = $api->getDato($id);
       $json = json_encode($vector);
       echo $json; 
    }else{
       $vector = array();
       $api = new Api();
       $vector = $api->getDatos();
       $json = json_encode($vector);
       echo $json;
    }
   
}

if($method == "POST"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $topico = $data['TOPIC'];
    $usuario = $data['USUARIO'];
    $dato = $data['DATO'];
    $api = new Api();
    $json = $api->addDato($topico, $usuario, $dato);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $id = $_REQUEST['ID'];
    $api = new Api();
    $json = $api->deleteDato($id);
    echo $json;
}

if($method == "PUT"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['ID'];
    $topico = $data['TOPIC'];
    $usuario = $data['USUARIO'];
    $dato = $data['DATO'];
    $api = new Api();
    $json = $api->updateDato($id, $topico, $usuario, $dato);
    echo $json;
}



?>