import express from 'express';
import bodyParser from 'body-parser';
import users from './api/users';
import categories from './api/category';
import foods from './api/foods';
import cart from './api/cart';
import auth from './api/auth';

const app = express();
const port = process.env.PORT;

// View engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.render('index.ejs');
});

app.use('/users', users);

app.use('/categories', categories);

app.use('/foods', foods);

app.use('/cart', cart);

app.use('/auth', auth);

app.listen(port, function () {
  console.log(`Swiggy app listening on port ${port}`);
});
