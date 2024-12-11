class Agenda{

  constructor(){
    this.apiUrl = "https://api.jolpi.ca/ergast/f1/2024/races";
  }

  getInfoCarreras(){
    $.ajax({
      url: this.apiUrl,
      type: 'GET', 
      dataType: 'json',
      success: function(data) {
        var races = data.MRData.RaceTable.Races;
        var container = $('section');
        races.forEach(function(race) {
          var article = $('<article></article>');
          var raceDate = new Date(race.date + 'T' + (race.time || '00:00:00Z'));
          var formattedDate = raceDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
          var formattedTime = raceDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

          article.append('<h3>' + race.raceName + '</h3>');
          
          article.append('<h4>Circuito:</h4>');
          article.append('<p> ' + race.Circuit.circuitName + '</p>');
          
          article.append('<h4>Coordenadas del circuito:</h4>');
          article.append('<p>' + race.Circuit.Location.lat + ', ' + race.Circuit.Location.long + '</p>');
          
          article.append('<h4>Fecha:</h4>');
          article.append('<p>' + formattedDate + '</p>');
          article.append('<h4>Hora de la carrera:</h4>');
          article.append('<p>' + formattedTime + '</p>');
          container.append(article);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la llamada AJAX:", textStatus, errorThrown);
      }
  });
  }

}