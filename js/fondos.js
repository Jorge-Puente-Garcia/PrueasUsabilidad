class Fondo{
  nombrePais;
  nombreCapital;
  nombreCircuitoF1;
  constructor(nombrePais, nombreCapital, nombreCircuitoF1){
    this.nombrePais = nombrePais;
    this.nombreCapital = nombreCapital;
    this.nombreCircuitoF1 = nombreCircuitoF1;
  }

  consultaImagenFondo(){
    var flickrAPI = "https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI, 
                    {
                        tags: "HUNGRIA 2005",
                        tagmode: "all",
                        format: "json"
                    })
                .done(function(data) {
                        $.each(data.items, function(i,item ) {
                            //$("<img />").attr( "src", item.media.m).appendTo( "body" );
                            
                            if ( i === Math.random(0,5)) {
                              //Solo devuelve una de las 5 primeras imágenes
                                    return false;
                            }
                            var url= item.media.m;
                            $('body').css({
                              'background-image': 'url(' + url.replace("_m", "_b") + ')',
                              'background-size': 'cover',
                              'background-repeat': 'no-repeat',
                              'background-position': 'center',
                              'min-height': '100vh'
                            });
                            
                });
            });
  }
}