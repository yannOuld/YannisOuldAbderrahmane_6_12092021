const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// modèle user 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// plugin uniqueValidator qui bloque l'inscription avec un email déja utilisé 
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);