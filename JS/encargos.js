<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Recoge los datos del formulario
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        $numero = $_POST["numero"];
        $tipo_pan = $_POST["tipo_pan"];
        $tipo_relleno = $_POST["tipo_relleno"];
        $tipo_decoracion = $_POST["tipo_decoracion"];
        $mensaje = $_POST["mensaje"];

        // Imprime los datos (puedes cambiar esto según tus necesidades)
        echo "<h2>Detalles del Encargo:</h2>";
        echo "<p><strong>Nombre:</strong> $nombre</p>";
        echo "<p><strong>Correo Electrónico:</strong> $email</p>";
        echo "<p><strong>Tipo de Pastel:</strong> $tipo_pastel</p>";
        echo "<p><strong>Mensaje Adicional:</strong> $mensaje</p>";

        // Aquí puedes agregar código para almacenar los datos en una base de datos o realizar otras acciones necesarias
    } else {
        // Si alguien intenta acceder directamente al script sin enviar el formulario, redirige a la página principal
        header("Location: index.html");
        exit();
    }
?>
