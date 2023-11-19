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

        // Imprime los datos
        echo "<h2>Detalles del Encargo:</h2>";
        echo "<p><strong>Nombre:</strong> $nombre</p>";
        echo "<p><strong>Correo Electrónico:</strong> $email</p>";
        echo "<p><strong>Número de celular:</strong> $numero</p>";
        echo "<p><strong>Tipo de Pan:</strong> $tipo_pan</p>";
        echo "<p><strong>Tipo de Relleno:</strong> $tipo_relleno</p>";
        echo "<p><strong>Tipo de Decoracion:</strong> $tipo_decoracion</p>";
        echo "<p><strong>Mensaje Adicional:</strong> $mensaje</p>";

    } else {
        header("Location: index.html");
        exit();
    }
?>