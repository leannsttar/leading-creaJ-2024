console.log(process.env);
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN
});

export default dbx

