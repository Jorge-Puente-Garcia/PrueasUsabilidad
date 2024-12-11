<?php 
    class Carrusel{
        protected $capital;
        protected $pais;
        
        public function __construct($capital,$pais){
            $this->capital = $capital;
            $this->pais = $pais;
        }

        public function sacaFotos(){
            $tag = $this->capital;
            $numeroFotos = 10;
            // Fotos públicas recientes
            $url = 'https://api.flickr.com/services/feeds/photos_public.gne?';
            $url.= '&tags='.$tag;
            $url.= '&per_page='.$numeroFotos;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if($json==null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            }
            else {
                echo "<h3>JSON decodificado correctamente</h3>";
            }

            for($i=0;$i<$numeroFotos;$i++) {
                //Se meten las imagenes que son lo de las slides del ejemplo
                $titulo = $json->items[$i]->title;
                $URLfoto = $json->items[$i]->media->m;       
                echo "<img alt='".$titulo."' src='".$URLfoto."' />";
            }
        }
    }
    class Moneda{
        protected $divisaOriginal;
        protected $divisaDestino;
        public function __construct($divisaOriginal,$divisaDestino){
            $this->divisaOriginal = $divisaOriginal;
            $this->divisaDestino = $divisaDestino;
        }

        public function convertirDivisa(){
            $url = "https://api.exchangerate-api.com/v4/latest/".$this->divisaOriginal;
            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);
            $cambio = $json->rates->{$this->divisaDestino};
            echo "<p> ".$this->divisaOriginal." = ".$cambio." ".$this->divisaDestino."</p>";
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
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/carruselImagenes.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&loading=async" async defer></script>
    
    <script src="js/viajes.js"></script>
     
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <a href="index.html" title="Enlace a la pagina de inicio"><h1>F1 Desktop</h1></a>
        <nav>
            <a href="index.html" title="Enlace a la pagina de inicio" >Index</a>
            <a href="piloto.html" title="Enlace a la pagina del piloto">Piloto</a>
            <a href="noticias.html" title="Enlace a la pagina de noticias">Noticias</a>
            <a href="calendario.html" title="Enlace a la pagina de calendario">Calendario</a>
            <a href="metereologia.html" title="Enlace a la pagina de metereologia">Metereologia</a>
            <a href="circuito.html" title="Enlace a la pagina de circuito" >Circuito</a>
            <a href="viajes.php" title="Enlace a la pagina de viajes" class="active">Viajes</a>
            <a href="juegos.html" title="Enlace a la pagina de juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="index.html" title="Enlace a la pagina de inicio">Inicio</a> >> Viajes</p>
	<h2>Viajes </h2>  
    <h3>Conversor de Divisas </h3>
    <?php 
        $moneda = new Moneda("EUR","HUF");
        $moneda->convertirDivisa();
    ?>
    <article>
    <h3>Carrusel de Imágenes </h3>
    <?php 
        $viaje = new Carrusel("Budapest","Hungria");
        $viaje->sacaFotos();
    ?>
    <!-- Control buttons -->
    <button> &gt; </button>
    <button> &lt; </button>
    </article>
    <script>
        var viaje = new Viaje();
        viaje.preparaCarrusel();
    </script>
    
    <input type="button" value="Obtener mapa estático" onClick = "viaje.getMapaEstaticoGoogle();"/>
    <input type="button" value="Obtener mapa dinámico" onClick = "viaje.initMap();"/>
    <section> 
        <h3>Mapa de Budapest</h3>
    </section>
    <div> </div>
</body>
</html>