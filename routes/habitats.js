const {Router} = require('express');
const router = Router(); // router is a way to add all related APIs into one area
const pool = require('../db'); //index will automatically be used

router.get('/', (request, response, next) => {// get all monsters
    pool.query(`SELECT * FROM habitats ORDER BY id ASC`, (err, res) => {

        if (err) { //if this code is skipped, we know there is information
            return next(err);   //call to error handler on line 18
        } //no semi colon otherwise the if statement has ended

        response.json(res.rows);

    });
});

router.post('/', (request, response, next) => {
    const {name, climate, temperature} = request.body;

    pool.query('INSERT INTO habitats(name, climate, temperature) VALUES ($1, $2, $3)', //SQL insert function
        [name, climate, temperature],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/habitats');
        }
    )
});

router.use((err, req, res) => { // error handler function
    res.json(err);
});

module.exports = router;