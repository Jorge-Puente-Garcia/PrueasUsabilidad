class Viaje {
  constructor() {
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
  }

  getPosicion(position) {
    this.longitud         = position.coords.longitude; 
    this.latitud          = position.coords.latitude;  
    this.precision        = position.coords.accuracy;
    this.altitud          = position.coords.altitude;
    this.precisionAltitud = position.coords.altitudeAccuracy;
    this.rumbo            = position.coords.heading;
    this.velocidad        = position.coords.speed;   
  }

  verErrores(error){
    switch(error.code) {
    case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite la petición de geolocalización"
        break;
    case error.POSITION_UNAVAILABLE:
        this.mensaje = "Información de geolocalización no disponible"
        break;
    case error.TIMEOUT:
        this.mensaje = "La petición de geolocalización ha caducado"
        break;
    case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido"
        break;
    }
  }

  getMapaEstaticoGoogle(){
    var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
    //URL: obligatoriamente https
    var url = "https://maps.googleapis.com/maps/api/staticmap?";
    //Parámetros
    // centro del mapa (obligatorio si no hay marcadores)
    var centro = "center=" + this.latitud + "," + this.longitud;
    //zoom (obligatorio si no hay marcadores)
    //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
    var zoom ="&zoom=15";
    //Tamaño del mapa en pixeles (obligatorio)
    var tamaño= "&size=800x600";
    //Escala (opcional)
    //Formato (opcional): PNG,JPEG,GIF
    //Tipo de mapa (opcional)
    //Idioma (opcional)
    //region (opcional)
    //marcadores (opcional)
    var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
    //rutas. path (opcional)
    //visible (optional)
    //style (opcional)
    var sensor = "&sensor=false"; 
    
    this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
    var mapa=$("<img>");
    mapa.attr("src", this.imagenMapa);
    mapa.attr("alt", "Mapa de la ubicación del usuario");
    $('section').append(mapa);
  }

  initMap() {
    const centro = { lat: this.latitud , lng: this.longitud }; // Coordenadas iniciales

    this.mapa = new google.maps.Map(document.querySelector('div'), {
        zoom: 8,
        center: centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    // Inicializa la ventana de información
    this.infoWindow = new google.maps.InfoWindow();

    // Llama a la función para geolocalizar al usuario
    this.geolocalizarUsuario();
}

// Geolocaliza al usuario y actualiza el mapa
geolocalizarUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => this.mostrarUbicacion(position),
            (error) => this.handleLocationError(true, this.mapa.getCenter())
        );
    } else {
        // Si el navegador no soporta geolocalización
        this.handleLocationError(false, this.mapa.getCenter());
    }
}

// Muestra la ubicación del usuario en el mapa
mostrarUbicacion(position) {
    const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    };

    // Actualiza la ventana de información
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent('Localización encontrada');
    this.infoWindow.open(this.mapa);

    // Centra el mapa en la ubicación del usuario
    this.mapa.setCenter(pos);
}

// Maneja errores de geolocalización
handleLocationError(browserHasGeolocation, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(
        browserHasGeolocation
            ? 'Error: Ha fallado la geolocalización'
            : 'Error: Su navegador no soporta geolocalización'
    );
    this.infoWindow.open(this.mapa);
}

preparaCarrusel(){
    const slides = document.querySelectorAll("img");

    // select next slide button
    const nextSlide = document.querySelector("button:nth-of-type(1)");

    // current slide counter
    let curSlide = 3;
    // maximum number of slides
    let maxSlide = slides.length - 1;

    // add event listener and navigation functionality
    nextSlide.addEventListener("click", function () {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    //   move slide by -100%
    slides.forEach((slide, indx) => {
        var trans = 100 * (indx - curSlide);
        $(slide).css('transform', 'translateX(' + trans + '%)')
    });
    });

    // select next slide button
    const prevSlide = document.querySelector("button:nth-of-type(2)");

    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
        curSlide = maxSlide;
    } else {
        curSlide--;
    }

    //   move slide by 100%
    slides.forEach((slide, indx) => {
        var trans = 100 * (indx - curSlide);
        $(slide).css('transform', 'translateX(' + trans + '%)')
    });
    });
    }
}