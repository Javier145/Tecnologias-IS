<?php
$errores='';
$username = "equipotres"; 
$password = "paginafutbol"; 
$host = "db4free.net"; 
$dbname = "ligafutbol"; 

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
if($_SERVER['REQUEST_METHOD']=='POST'){

     $post = (isset($_POST['nombremascota']) && !empty($_POST['nombremascota'])) &&
     (isset($_POST['nombrepersona']) && !empty($_POST['nombrepersona'])) &&
     (isset($_POST['email']) && !empty($_POST['email']))&&
     (isset($_POST['fechavisita']) && !empty($_POST['fechavisita']))&&
     (isset($_POST['descripcion']) && !empty($_POST['descripcion']));
     
    if ($post) { // si todos estan llenos
        //obtener valores de los inputs
        $nombremascota = $_POST['nombremascota'];
        $nombrepersona = $_POST['nombrepersona'];
        $email = $_POST['email'];
        $fechavisita = $_POST['fechavisita'];
        $descripcion= $_POST['descripcion'];

        try{
            //$conexion = new PDO('mysql://db4free.net:3306;dbname=ligafutbol', 'equipotres', 'paginafutbol');//conexion a la bd
            //$statement = $conexion->prepare();
            $conexion = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password, $options);
            $statement = $conexion->prepare('SELECT * FROM CITAS WHERE email = :email LIMIT 1'); //preparar la consulta a hacer
            $statement->execute(array(':email' => $email));
            // El metodo fetch nos va a devolver el resultado o false en caso de que no haya resultado.
            $resultado = $statement->fetch();
            if($resultado !== false){ // ya hay una tupla
                $errores = '<li>Usuario ya existente</li>'; // El punto sirve para concatenar
            }else{//si no existe el usuario empiezo a convertir la contraseña a hash
                # pero esto no asegura por completo la informacion encriptada.
                //$nombrepersona = hash('sha512', $nombrepersona);// # de la informacion
                if($errores==''){//si no hay errores
                    $statement = $conexion->prepare('INSERT INTO CITAS (Id, Nombremascota, Descripcion, Nombrepersona, Email, Fechavisita) VALUES (null, :nombremascota,  :descripcion, :nombrepersona, :email, :fechavisita)');
                    // Comprobamos si hay errores, sino entonces agregamos el usuario y redirigimos.
                    $statement->execute(array(
                        ':nombremascota' => $nombremascota,
                        ':descripcion' => $descripcion,
                        ':nombrepersona' => $nombrepersona,
                        ':email' => $email,
                        ':fechavisita' => $fechavisita,
                        
                    ));
                    // Despues de registrar al usuario redirigimos para que inicie sesion.
                    header('Location: contacto.php');
                }
            }
        }catch(PDOException $ex){
            //echo "Error:{$ex->getMessage()}"; //por si no se puede conectar
            $errores = '<li>¡Error: El servidor se encuentra en reparación. Intentelo mas tarde!</li>';
        }  
    }else{ // si hay alguno vacio
        $errores = '<li>¡Existen Campos Vacios!</li>';
    } 
}
require 'contacto.view.php';
?>