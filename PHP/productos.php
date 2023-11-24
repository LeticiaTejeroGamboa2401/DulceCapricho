<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nombreBase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Agregar producto
if (isset($_POST['agregar'])) {
    $nombre = $_POST['nombre'];
    $mayoreo = $_POST['mayoreo'];
    $venta = $_POST['venta'];
    $existencia = $_POST['existencia'];

    $sql = "INSERT INTO productos (nombre_producto, precio_mayoreo, precio_venta, total_existencia)
            VALUES ('$nombre', '$mayoreo', '$venta', '$existencia')";

    if ($conn->query($sql) === TRUE) {
        echo "Producto agregado con éxito.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Obtener y mostrar productos
$sql = "SELECT id, nombre_producto, precio_mayoreo, precio_venta, total_existencia FROM productos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['nombre_producto']}</td>
                <td>{$row['precio_mayoreo']}</td>
                <td>{$row['precio_venta']}</td>
                <td>{$row['total_existencia']}</td>
                <td><a href='editar.php?id={$row['id']}'>Modificar</a></td>
                <td><a href='eliminar.php?id={$row['id']}'>Eliminar</a></td>
              </tr>";
    }
} else {
    echo "No hay productos en la base de datos.";
}

$conn->close();
?>
