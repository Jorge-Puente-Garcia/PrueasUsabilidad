class Pais {
    constructor(nombrePais, nombreCapital, cantidadPoblacion) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.cantidadPoblacion = cantidadPoblacion;
    }

    rellenaRestoDatos(nombreCircuito, tipoFormaGobierno, coordenadasLineaMeta, religionMayoritaria) {
        this.nombreCircuito = nombreCircuito;
        this.tipoFormaGobierno = tipoFormaGobierno;
        this.coordenadasLineaMeta = coordenadasLineaMeta;
        this.religionMayoritaria = religionMayoritaria;
    }

    getNombrePais() {
        return this.nombrePais;
    }

    getCapital() {
        return this.nombreCapital;
    }

    getInfoSecundaria() {
        return "<ul>" +
            "<li>Nombre del circuito: " + this.nombreCircuito + "</li>" +
            "<li>Forma de gobierno: " + this.tipoFormaGobierno + "</li>" +
            "<li>Coordenadas de la línea de meta: " + this.coordenadasLineaMeta + "</li>" +
            "<li>Religión mayoritaria: " + this.religionMayoritaria + "</li>" +
            "</ul>";
    }

    escribeCoordenadasEnElDocumento() {
        document.write("<p>" + this.coordenadasLineaMeta + "</p>");
    }

    muestraClimaCincoDias() {
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=19.244424&lon=47.582400&cnt=40&appid=6321d7b860cf8b7f1f49f8b8c93ff088&units=metric&lang=es";
        $.ajax({
            url: apiUrl,  
            type: 'GET',  
            dataType: 'json', 
            success: function(data) {
                const weatherContainer = $('section');
                var diasMostrados = 0;
                var fechaAnterior = '';
                data.list.forEach(function(day) {
                    var date= new Date(day.dt * 1000).toLocaleDateString();
                    var horaRepresentacion = new Date(day.dt * 1000).getHours();
                    if(date !== fechaAnterior && diasMostrados < 5 && (horaRepresentacion >= 12 && horaRepresentacion <= 16)){
                    const article = $('<article></article>');
                    article.append('<h3>' + date + '</h3>');
                        
                    //ACORDARME DE CONVERTIR A GRADOS CENTIGRADOS 
                    article.append('<p>Temperatura actual: ' + (day.main.temp).toFixed(1) + '°C</p>');
                    article.append('<p>Temperatura máxima: ' + (day.main.temp_max ).toFixed(1) + '°C</p>');
                    article.append('<p>Temperatura mínima: ' + (day.main.temp_min ).toFixed(1) + '°C</p>');
        
                    article.append('<p>Humedad: ' + day.main.humidity + '%</p>');
                   
                    const weatherDescription = day.weather[0].description;
                    article.append('<p>Clima: ' + weatherDescription + '</p>');
                
                    const rainVolume = day.rain && day.rain["3h"] ? day.rain["3h"] : 0;
                    article.append('<p>Cantidad de lluvia: ' + rainVolume + ' mm</p>'); 
                    
                    article.append('<p>Velocidad del viento: ' + day.wind.speed + ' m/s</p>');
                    article.append('<p>Dirección del viento: ' + day.wind.deg + '°</p>');
                    
                    const iconUrl = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
                    article.append('<img src="' + iconUrl + '" alt="Icono de '+day.weather[0].icon +'">');
        
                    
                    weatherContainer.append(article);
                    fechaAnterior = date;
                    diasMostrados++;
                    }
                    
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Manejo de errores
                console.error("Error al obtener los datos del clima:", textStatus, errorThrown);
                alert("Hubo un problema al obtener los datos del clima. Por favor, intenta más tarde.");
            }
        });
    }
}