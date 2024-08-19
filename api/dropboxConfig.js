import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de Dropbox
const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch,
});

export default dbx;


