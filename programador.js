const EventEmitter = require('./events');
const later = require('later');

class Programador extends EventEmitter {
  constructor(configuraciones = []) {
    super();

    // Configuración de horas y temperaturas para establecer la temperatura ideal en el momento indicado
    this.configuraciones = configuraciones;

    // Zona horaria
    this.indicarZonaHoraria();
  }

  indicarZonaHoraria() {
    // Usar zona horaria local:
    later.date.localTime();
  }

  encender() {
    console.log('Encendiendo el programador.');

    // Por cada configuración que nos den
    this.configuraciones.forEach((configuracion) => {
      // Obtener la hora y la temperatura de la configuracion
      const { hora, temperatura } = configuracion;

      // Crear planificación para todos los dias a la hora indicada
      const sched = later.parse.text(`at ${hora}`);

      /**
       * Crear un temporizador que emita diariamiente el evento "ideal"
       * a la hora indicada con la temperatura ideal deseada
       */
      later.setInterval(() => {
        this.emit('ideal', temperatura);
      }, sched);
    });
  }
}

exports = module.exports = Programador;
