import 'dotenv/config';
import app from './src/app.js';

const PORT = 8000;

app.listen(PORT, ()=>{
  console.log('Server on!', PORT);
});

