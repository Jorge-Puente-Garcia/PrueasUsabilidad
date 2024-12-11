class Api{
    constructor(){
        
    }
    mostrarImagenEnPantallaCompleta(){
        const image = $('img').get(0);
        if (image.requestFullscreen) {
            image.requestFullscreen();
        } else {
            alert('Tu navegador no soporta esta funcionalidad.');
        }
        
    }

    vigilaCambiosEnLaVisibilidadDeLaPagina() {
        document.addEventListener('visibilitychange', () => this.detectarCambiosDeLaVisibilidadDeLaPágina());
    }
    detectarCambiosDeLaVisibilidadDeLaPágina() {
        if (document.hidden) {
            //Si deja de estar en primer plano s
            this.gainNode.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 0.001); // Disminuir volumen
            this.oscillator.frequency.exponentialRampToValueAtTime(20, this.audioContext.currentTime + 2); // Disminuir frecuencia
            setTimeout(() => {
                this.oscillator.frequency.value = 0;
                this.oscillator.stop();
                
            }, 2000);
        }
    }

    initAudio() {
       
        $("button:nth-of-type(2)").on('click', () => {
            this.preparaAudio();
            this.oscillator.start();
            this.gainNode.gain.exponentialRampToValueAtTime(0.1, this.audioContext.currentTime + 0.05); // Aumentar volumen a un máximo de 0.1
            this.oscillator.frequency.exponentialRampToValueAtTime(250, this.audioContext.currentTime + 2); // Aumentar frecuencia a 800 Hz
            this.actualizarRPM();
        });

        $("button:nth-of-type(3)").on('click', () => {
            this.gainNode.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 0.001); // Disminuir volumen
            this.oscillator.frequency.exponentialRampToValueAtTime(20, this.audioContext.currentTime + 2); // Disminuir frecuencia
            setTimeout(() => {
                this.oscillator.frequency.value = 0;
                this.oscillator.stop();
                
            }, 2000);
        });
    }
    preparaAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();

        this.oscillator.type = 'sawtooth'; // Tipo de onda para simular el sonido del motor
        this.oscillator.frequency.setValueAtTime(33, this.audioContext.currentTime); // Frecuencia inicial en Hz
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Iniciar con volumen 0
    }

    actualizarRPM() {
        var intervaloActualizarRPM = 100;
        var frecuenciaTope = 250; // Frecuencia máxima en Hz
        var RPMMaximas = 15000; // RPM máxima

        const update = () => {
            if (this.oscillator) {
                var frequency = this.oscillator.frequency.value;
                var rpm = (frequency / frecuenciaTope) * RPMMaximas;
                $('input[type="range"]').val(rpm);
                $('p:nth-of-type(3)').text('RPM: ' + Math.round(rpm));
                requestAnimationFrame(update);
            }
        };

        update();
    }
}
