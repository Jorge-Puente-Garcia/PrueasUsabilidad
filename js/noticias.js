class Noticias{
  constructor(){
    if (window.File && window.FileReader && window.FileList && window.Blob) 
      {  
          //El navegador soporta el API File
          document.body.append("Este navegador soporta el API File ");
      }else{
        document.body.append("¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
      } 
  }
  readInputFile(files){
      //Solamente toma un archivo
      //var archivo = document.getElementById("archivoTexto").files[0];
      var archivo = files[0];
      var contenido = $("file");
      //Solamente admite archivos de tipo texto
      var tipoTexto = /text.*/;
      if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          var areaVisualizacion = $('<pre>');
          $('body').append(areaVisualizacion);
          lector.onload = function (evento) {
            areaVisualizacion.text(lector.result);
            }      
          lector.readAsText(archivo);
          }
      else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }       
  }
  muestraNuevaNoticia() {
    // Saccamos los valres del formulario
    var titulo = $('input[name="titulo"]').val();
    var autor = $('input[name="autor"]').val();
    var contenido = $('textarea[name="contenido"]').val();

    // Vemos que no estén vacios
    if (!titulo || !autor || !contenido) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    // Creamos los elementos que representarán las noticias
    var noticia = $('<pre></pre>').text('Notcia: '+titulo + '\n' +'Autor:'+ autor + '\n' +'Contenido:\n'+ contenido);

    // Agregar la noticia al contenedor de noticias
    $('section').append(noticia);

    // Limpiar el formulario
    $('form')[0].reset();
  }

}