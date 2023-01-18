const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://admi0o0:admi0o0@local-simulator.sed36yg.mongodb.net/test';

const recipe =
  {
    title:"TITLE",
    level:"Easy Peasy",
    cuisine:"cuisine required"
  }

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: ${x.connection.name}`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()})
    // ITERATION 2: CREATE RECIPE
    .then(() => Recipe.create(recipe))
    .then(recipe => {
      const {title} = recipe
      console.log(title)
    })
    // ITERATION 3: INSERT MULTIPLE RECIPES
    .then(x => {
      const titles = []
      data.forEach(elem => {
        titles.push(elem.title)
      });
      console.log(titles)
      return Recipe.insertMany(data)
    })
    //ITERATION 4: UPDATE RECIPE
    .then(x => Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100}))
    .then(updated => {
      if(updated){
        return console.log("Recipe Updated")
      }
    })
    //ITERATION 5: REMOVE A RECIPE
    .then(x => Recipe.deleteOne({title:'Carrot Cake'}))
    .then(deleted => {
      if(deleted){
        return console.log("Recipe Deleted")
      }
    })
    //ITERATION 6: CLOSE THE DATABASE
    .then(() => mongoose.connection.close()) 
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
