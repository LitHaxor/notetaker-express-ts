import express from 'express';
import path from 'path';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
