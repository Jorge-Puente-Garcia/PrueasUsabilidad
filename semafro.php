<?php 
    class Record{
        protected $server;
        protected $user;
        protected $pass;
        protected $dbname;
        protected $database;

        public function __construct(){
            //Se crea la base de datos    
            $this-> server = "localhost";
            $this-> user = "DBUSER2024";
            $this-> pass = "DBPSWD2024";
            $this-> dbname = "records";
            $this -> database = new mysqli($this -> server, $this -> user, $this -> pass, $this -> dbname);

            if ($this -> database -> connect_errno){
                echo "<script>alert('Fallo al conectar a MySQL:". $this -> database -> connect_error.");</script>";
                exit();
                }
        }

        public function guardarInfoUsuario($nombre, $apellidos, $nivel, $tiempo)
		{
			$sql = "INSERT INTO registro3 (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)";
			$sqlPreparada = $this -> database -> prepare($sql);
            $tiempo=floatval($tiempo);
            //Es como el setParameter de Jdbc
            $sqlPreparada -> bind_param("ssdd", $nombre, $apellidos, $nivel, $tiempo);
        	$sqlPreparada -> execute();
			$sqlPreparada -> close();
		}

        public function sacaInformeDeLosDiezMejores($nivelJuego)
		{
			$sql = "SELECT nombre, apellidos, tiempo FROM registro3 WHERE nivel=? ORDER BY tiempo LIMIT 10";
			$sqlPreparada = $this -> database -> prepare($sql);
            $sqlPreparada -> bind_param("d", $nivelJuego);
			$sqlPreparada -> execute();
			$resultadoSql = $sqlPreparada -> get_result();
            //Sacamos todos los resultados a un array
			$resultsArray = $resultadoSql->fetch_all(MYSQLI_ASSOC);
            echo "<section>\n<h3>Mejores:</h3>";
            //La lista ordenada fue una recomendaciónd del profesor
            echo "<ol>";
            //Recorro el array y muestro los resultados
            foreach ($resultsArray as $row) {
                echo "<li>" . htmlspecialchars($row["nombre"]) . " " . htmlspecialchars($row["apellidos"]) . ": " . htmlspecialchars($row["tiempo"]) . " segundos</li>";
            }
            echo "</ol>\n</section>";

            // Liberar resultados y cerrar conexiones
            $resultadoSql->free();
            $sqlPreparada->close();
            $this->database->close();
		}
	}
    ?>

<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop</title>
    <meta name ="author" content ="Jorge" />
    <meta name ="description" content ="Proyecto de F1 para la asignatura SEW" />
    <meta name ="keywords" content ="f1" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semafro.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/semafro.js"></script>
    
</head>

<body>
    <header>
        <a href="index.html" title="Enlace a la pagina de inicio"><h1>F1 Desktop</h1></a>
        <nav>
                <a href="index.html" title="Enlace a la pagina de inicio">Index</a>
                <a href="piloto.html" title="Enlace a la pagina del piloto">Piloto</a>
                <a href="noticias.html" title="Enlace a la pagina de noticias">Noticias</a>
                <a href="calendario.html" title="Enlace a la pagina de calendario">Calendario</a>
                <a href="metereologia.html" title="Enlace a la pagina de metereologia">Metereologia</a>
                <a href="circuito.html" title="Enlace a la pagina de circuito">Circuito</a>
                <a href="viajes.php" title="Enlace a la pagina de viajes">Viajes</a>
                <a href="juegos.html" title="Enlace a la pagina de juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="index.html" title="Enlace a la pagina de inicio">Inicio</a> >> <a href="index.html" title="Enlace a la pagina de juegos">Juegos</a> >> Semaforo</p>
	 <h2>Juego del semafro:</h2>
    <main>
    </main>
    <?php
        // Verificar si se enviaron datos a través del formulario
        if (!empty($_POST)) {			
            // Variables de error
            $hayErrores = false;

            // Recuperar los valores del formulario
            $datosFormulario = $_POST;
            $nombreUsuario = $_POST["nombre"];
            $apellidosUsuario = $_POST["apellidos"];
            $nivelJuego = $_POST["nivel"];
            $tiempoReaccion = $_POST["tiempo"];

            if (empty($nombreUsuario)) {
                echo "<script>alert('El campo nombre no pude estar vacío');</script>";
                $hayErrores = true;  
            }

            if (empty($apellidosUsuario)) {
                echo "<script>alert('El campo apellidos no pude estar vacío');</script>";
                $hayErrores = true;  
            }

            // Procesar el formulario si no hay errores
            if ($datosFormulario) {
                if (!$hayErrores) {
                    $registro = new Record();
                    $registro->guardarInfoUsuario($nombreUsuario, $apellidosUsuario, $nivelJuego, $tiempoReaccion);
                    $registro->sacaInformeDeLosDiezMejores($nivelJuego);
                }
            }
        }
    ?>
    <script >
        var semafro = new Semafro();
    </script>
   
</body>
</html>


