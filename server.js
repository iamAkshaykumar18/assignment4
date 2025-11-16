/********************************************************************************
*  WEB700 – Assignment 05
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Akshay Kumar Rayi    Student ID: 136847241    Date: Nov/16/25
*
<<<<<<< Updated upstream

* https://assignment4-alpha-ten.vercel.app/
=======
*  Published URL: _______________________________________
*
>>>>>>> Stashed changes
********************************************************************************/

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const LegoData = require('./data/legoData');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// form middleware
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// LegoData instance
const legoData = new LegoData();

legoData.initialize()
  .then(() => {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  })
  .catch(err => console.log("Initialization Error:", err));

// ---------------------- ROUTES -------------------------

// HOME
app.get('/', (req, res) => {
  res.render('home');
});

// ABOUT
app.get('/about', (req, res) => {
  res.render('about');
});

// ADD SET - FORM
app.get('/lego/addSet', async (req, res) => {
  try {
    const themes = await legoData.getAllThemes();
    res.render('addSet', { themes });
  } catch (err) {
    res.status(500).send(err);
  }
});

// ADD SET - PROCESS FORM
app.post('/lego/addSet', async (req, res) => {
  try {
    let foundTheme = await legoData.getThemeById(req.body.theme_id);
    req.body.theme = foundTheme.name;

    await legoData.addSet(req.body);
    res.redirect("/lego/sets");

  } catch (err) {
    res.status(422).send(err);
  }
});

// SHOW ALL SETS (with filter)
app.get('/lego/sets', async (req, res) => {
  try {
    const themes = await legoData.getAllThemes();
    let sets = legoData.getAllSets();

    if (req.query.theme) {
      const filter = req.query.theme.toLowerCase();
      sets = sets.filter(s => s.theme.toLowerCase() === filter);
    }

    res.render("sets", { sets, themes });

  } catch (err) {
    res.status(500).send(err);
  }
});

// SINGLE SET DETAILS
app.get('/lego/sets/:set_num', async (req, res) => {
  try {
    const set = await legoData.getSetByNum(req.params.set_num);
    res.render("set", { set });
  } catch (err) {
    res.status(404).send(err);
  }
});

// DELETE SET
app.get("/lego/deleteSet/:set_num", async (req, res) => {
  try {
    await legoData.deleteSetByNum(req.params.set_num);
    res.redirect("/lego/sets");
  } catch (err) {
    res.status(404).send(err);
  }
});

// 404
app.use((req, res) => {
  res.status(404).render("404");
});
