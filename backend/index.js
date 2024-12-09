import app from './app.js';

/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const PORT = process.env.PORT || 3000;

// Server start
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});