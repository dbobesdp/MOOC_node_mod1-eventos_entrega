const Habitacion = require('./habitacion');
const Climatizador = require('./climatizador');
const Termostato = require('./termostato');
const Programador = require('./programador');

// Creamos una habitacion:
const dormitorio = new Habitacion();
dormitorio.temperatura = 22;

// Creamos un climatizador para la habitacion:
const climatizador = new Climatizador(dormitorio);

// Creamos un Termostato que mira la temperatura de la habitacion:
const termostato = new Termostato(dormitorio);

// Configuración de horas y temperaturas que se desea programar
const configuracion = [
  { hora: '02:32', temperatura: 22 },
  { hora: '02:33', temperatura: 18 },
  //   { hora: '07:00', temperatura: 22 },
  //   { hora: '08:30', temperatura: 18 },
  //   { hora: '18:00', temperatura: 22 },
  //   { hora: '23:00', temperatura: 20 },
];

// Creamos un programador que configurará la temperatura deseada en todo momento
const programador = new Programador(configuracion);

// Configuramos el termostato para controlar la temperatura:
termostato.on('muchofrio', () => climatizador.calentar());
termostato.on('muchocalor', () => climatizador.enfriar());

// Mostar la temperatura periodicamente:
termostato.on('tic', (temp) => console.log(`${temp.toFixed(1)}ºC`));

// Configurar la temp ideal a 20 grados:
termostato.indicarTemperaturaIdeal(20);

// Configurar el programador para programar la temperatura ideal
programador.on('ideal', (temp) => {
  termostato.indicarTemperaturaIdeal(temp);
  console.log(`Cambio programado de temperatura ideal a ${temp.toFixed(1)}ºC`);
});

// Encender el termostato:
termostato.encender();

// Encender el programador
programador.encender();
