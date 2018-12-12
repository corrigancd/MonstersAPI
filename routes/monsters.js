const {Router} = require('express');
const router = Router(); // router is a way to add all related APIs into one area
const pool = require('../db'); //index will automatically be used

router.get('/', (request, response, next) => {// get all monsters
    pool.query(`SELECT * FROM monsters ORDER BY id ASC`, (err, res) => {

        if (err) { //if this code is skipped, we know there is information
            return next(err);   //call to error handler on line 18
        } //no semi colon otherwise the if statement has ended

        response.json(res.rows);

    });
});

router.get('/:ID', (request, response, next) => { // get user specified monster
    const {ID} = request.params;
    pool.query('SELECT * FROM monsters WHERE id = ${ID} ORDER BY $1 ASC', [ID], (err, res) => {
        if (err) { //if this code is skipped, we know there is information
            return next(err);   //call to error handler on line 18
        } //no semi colon otherwise the if statement has ended

        console.log(`The name of Monster with ID ${ID} is ${res.rows.name}`);
        response.json(res.rows);
    });
});

router.post('/', (request,response, next) => {
    const {name, personality} = request.body;

    pool.query('INSERT INTO monsters(name, personality) VALUES ($1, $2)', //SQL insert function
        [name, personality],
    (err, res) => {
        if (err) return next(err);

        response.redirect('/monsters');
        }
    )
});

router.put('/:ID', (request, response, next) => {
  const {ID} = request.params;
  const keys = ['name', 'personality'];

  const fields = []; //keeping track on what to update
  keys.forEach( key => {
    if (request.body[key]) fields.push(key); //populating a list of keys present in response
  });

  fields.forEach((field, index) => { //iterating over the keys present in the request to update
      pool.query(`UPDATE monsters SET ${field} = $1 WHERE ID = $2`,
      [request.body[field], ID],
      (err, res) => {
          if (err) return next(err);

          if (index === fields.length -1) response.redirect('/monsters');
          }
      )
  });
});

router.delete('/:ID', (request, response, next) => {
  const {ID} = request.params;

  pool.query('DELETE FROM monsters WHERE id = ($1)',
      [ID],
      (err, res) => {
        if (err) return next(err);

        response.redirect('/monsters');
  });
});

router.use((err, req, res, next) => { // error handler function
    res.json(err);
});

module.exports = router;