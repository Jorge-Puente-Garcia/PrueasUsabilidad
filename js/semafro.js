class Semafro{
  levels = [0.2,0.5,0.8];
  lights = 4;
  unload_moment = null;
  clic_moment = null;
  
  constructor(){
    this.dificulty = this.levels[Math.floor(Math.random() * this.levels.length)];
    this.createStructure();
  } 
  
  createStructure(){  
  var main=document.querySelector('main');
  var h3= document.createElement("h3");
  h3.innerText = "Semáfro";
  
  for(let i=0;i<this.lights;i++){
    var light = document.createElement("div");
    main.appendChild(light);
  }

  var boton1 = document.createElement("button");
  var contextoActual = this;
  boton1.onclick = function(){
  contextoActual.initSequence();
  }
  var boton2 = document.createElement("button");
  boton2.onclick = function(){
    contextoActual.stopReaction();
    boton2.disabled = true;
    boton1.disabled = false;
    }
  boton1.innerText = "Iniciar";
  boton2.innerText = "Reacción";
  main.appendChild(boton1);
  main.appendChild(boton2);
}

initSequence() {
  document.querySelector('button').disabled = true;
  document.querySelector('main').classList.add('load');
  setTimeout(() => {
    this.endSecuence();
  },(this.dificulty*100)+2000);
  
}
endSecuence(){
  document.querySelector('main').classList.add('unload');
  document.querySelector('button').disabled = false;
  this.unload_moment = new Date();
}

stopReaction(){
  this.clic_moment = new Date();
  var reactionTime = this.clic_moment - this.unload_moment;
  var parrafo = document.createElement("p");
  parrafo.innerText = "Tu tiempo de reacción ha sido de: "+reactionTime+"ms";
  document.querySelector('main').appendChild(parrafo);
  document.querySelector('main').classList.remove('unload');
  document.querySelector('main').classList.remove('load');
  this.createRecordForm(reactionTime);
}

createRecordForm(tiempo) {
  var section = $('<section></section>');

  var textoTitulo = $('<h3></h3>').text("Guarda tu puntuación en el ranking");
  section.append(textoTitulo);

  var form = $('<form></form>')
    .attr('action', '#')
    .attr('method', 'post')
    .attr('name', 'record-form');

  form.append(this.creacionCampoFormulario("Ponga su nombre:", "text", "nombre", "", false));
  form.append(this.creacionCampoFormulario("Ponga sus apellidos:", "text", "apellidos", "", false));
  form.append(this.creacionCampoFormulario("Nivel del juego:", "text", "nivel",this.dificulty.toString() , true));
  form.append(this.creacionCampoFormulario("Su tiempo de reacción:", "text", "tiempo", tiempo/1000 + " segundos", true));

  var botonParaGuardar = $('<input>')
    .attr('type', 'submit')
    .attr('value', 'Guardar');
  form.append(botonParaGuardar);

  section.append(form);
  $('main').after(section);
}

creacionCampoFormulario(textoEtiquetaAsociada, tipoDeInput, nombreDelInput, valorDelInput, isReadOnly) {
  var etiquetaAsociada = $('<label></label>').text(textoEtiquetaAsociada);

  var input = $('<input>')
    .attr('type', tipoDeInput)
    .attr('name', nombreDelInput)
    .val(valorDelInput);
    if (isReadOnly) {
      input.attr('readonly', true);
    }
    etiquetaAsociada.append(input);
    return etiquetaAsociada;
}



}
