const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


const myRecipe = {
  title: 'Greek Salad',
  level: 'Easy Peasy',
  ingredients: 'Tomatoes, Feta Cheese, Olives, Oil, Salt, Pepper',
  cuisine: 'Greek',
  dishType: 'Snack',
  image: '',
  duration: 40,
  creator: 'Chef Jorge'
};

Recipe.create(myRecipe)
  .then(myRecipe => console.log('The name of the recipe is:', myRecipe.title))
  .catch(error =>
    console.log('An error happened while adding a recipe:', error)
  );

Recipe.insertMany(data)
  .then(data.forEach(recipe => console.log('The title of the recipe is:', recipe.title)))
  .catch(error =>
    console.log('An error happened while adding a recipe:', error)
  );


Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(() => console.log('The recipe has been updated'))
  .catch(error =>
    console.log('An error happened while updating a recipe:', error)
  );


Recipe.deleteOne({
  title: 'Carrot Cake'
}).then(() => console.log('The recipe has been deleted')).catch(err =>
  console.log('An error happened while deleting a recipe', err));


mongoose.connection.close(function () {
  console.log('Mongoose default connection closed');
});