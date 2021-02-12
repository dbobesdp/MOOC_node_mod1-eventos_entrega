class EventEmitter {

    constructor(){
        this.suscriptores = {};
    }

    on(evento, funcion){
        if(!this.suscriptores[evento]){
            this.suscriptores[evento] = [];
        }
        this.suscriptores[evento].push(funcion);
    }

    emit(evento, argumentos){
        let suscriptores = this.suscriptores[evento];
        suscriptores.forEach(suscriptor => {
            suscriptor(argumentos);
        });

    }

    getSuscriptores(){
        return this.suscriptores;
    }
}

exports = module.exports = EventEmitter;