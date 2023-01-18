//ITERATION 1: RECIPE SCHEMA
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    unique: true,
    //required: true
    required: [true, 'Title is mandatory. Please add a title.']
  },
  level: {
    type: String,
    enum: {
      values:['Easy Peasy', 'Amateur Chef','UltraPro Chef'],
      message: 'That is not an accepted level. Try another one.'
    }
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType:{
    type: String,
    enum: {
      values:['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert','other'],
      message: 'That is not an accepted dish. Try another one.'
    }
  },
  image:{
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:{
    type: Number,
    min: 0
  },
  creator:{
    type: String
  },
  created:{
    type: Date,
    default: Date.now()
  }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
