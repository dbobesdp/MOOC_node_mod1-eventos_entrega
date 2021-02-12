class EventEmitter {
  constructor() {
    /**
     * El objeto suscripciones tendra propiedades de la forma "nombreEvento: []",
     * - siendo:
     * -> nombreEvento: el nombre del evento
     * -> []: un array con los escuchadores que se han suscrito (registrado) al evento "nombreEvento" usando el método on
     */
    this.suscripciones = {};
  }

  on(evento, suscriptor) {
    // Si es la primera vez que se va a registrar el evento
    if (!this.suscripciones[evento]) {
      // Inicializamos el array de suscripciones, si no dará error al hacer el push
      this.suscripciones[evento] = [];
    }

    // Añadimos el nuevo suscriptor al evento
    this.suscripciones[evento].push(suscriptor);
  }

  emit(evento, argumentos) {
    // Obtenemos los suscriptores del evento
    let suscriptores = this.suscripciones[evento];

    // Llamamos a cada suscriptor pasandole los argumentos que queremos emitir
    suscriptores.forEach((suscriptor) => {
      suscriptor(argumentos);
    });
  }
}

exports = module.exports = EventEmitter;
