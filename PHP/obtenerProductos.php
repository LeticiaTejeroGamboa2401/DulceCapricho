<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nombreBase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $idProducto = $_GET['id'];

    $sql = "SELECT id, nombre_producto, precio_mayoreo, precio_venta, total_existencia FROM productos WHERE id = $idProducto";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $producto = $result->fetch_assoc();
        echo json_encode($producto);
    } else {
        echo json_encode(array('error' => 'Producto no encontrado'));
    }
} else {
    echo json_encode(array('error' => 'ID de producto no proporcionado'));
}

$conn->close();
?>
