const EventEmitter = require('./events');
const later = require('later');

class Programador extends EventEmitter {
  constructor(configuracion = []) {
    super();

    // Configuración de horas y temperaturas
    this.configuracion = configuracion;

    // Zona horaria
    this.indicarZonaHoraria();
  }

  indicarZonaHoraria() {
    // Usar zona horaria local:
    later.date.localTime();
  }

  encender() {
    console.log('Encendiendo el programador.');

    this.configuracion.forEach((conf) => {
      const { hora, temperatura } = conf;
      const sched = later.parse.text(`at ${hora}`);
      later.setInterval(() => {
        this.emit('ideal', temperatura);
      }, sched);
    });
  }
}

exports = module.exports = Programador;
