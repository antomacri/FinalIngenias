const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3008;
const path = require('path'); // Debes importar el módulo path


function obtenerCatalogo() {
  
  return [
    { titulo: 'The Mandalorian', categoria: 'Acción' },
    { titulo: 'The Umbrella Academy', categoria: 'Drama' },
    
  ];
}

app.set('view engine', 'ejs');

app.get('/inicio', (req, res) => {
  // Obtiene el catálogo
  const catalogo = obtenerCatalogo();
  
  res.render('inicio', { catalogo: catalogo });
});

app.get("/registrarse", (req, res) => {
  res.render("registrarse"); 
});

app.get('/cargar-datos', (req, res) => {
  try {
    const rawData = fs.readFileSync('Trailerflix.json', 'utf-8');
    const data = JSON.parse(rawData);
    const series = data.filter(item => item.categoria.toLowerCase() === 'serie');
    res.json(series);
  } catch (error) {
    console.error('Error al cargar los datos: ' + error);
    res.status(500).json({ error: 'Error al cargar los datos' });
  }
});

// Carga los datos en TRAILERFLIX (ajusta esta parte según tu estructura)
const rawData = fs.readFileSync('Trailerflix.json', 'utf-8');
const TRAILERFLIX = JSON.parse(rawData);
// Página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html')); 
});
app.get('views\inicio.ejs', (req, res) => {
   // Renderiza la plantilla "inicio.ejs" y pasa el catálogo como variable
   res.render('inicio', { catalogo: TRAILERFLIX });

  res.send('¡Bienvenido a la página de inicio de TrailerFlix!');
});
// Rutas de tu servidor
app.get('/', (req, res) => {
  // Acceso a TRAILERFLIX aquí
  res.send('Bienvenido a Trailerflix');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define la ruta para la página de inicio ("/inicio")
app.get('/inicio', (req, res) => {
  // Renderiza la plantilla "inicio.ejs"
  res.render('inicio');
});
app.get('/inicio', (req, res) => {
  // TRAILERFLIX es JSON con las rutas de las imágenes y las URL de los trailers
  res.render('inicio', { catalogo: TRAILERFLIX });
});




app.get('/inicio', (req, res) => {
  const catalogo = obtenerCatalogo(); // Aquí obtienes los datos del catálogo
  res.render('inicio', { catalogo: catalogo }); // Asegúrate de pasar la variable catalogo a la vista
});






// Endpoint para buscar por título
app.get('/trailerflix/titulo/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const results = trailerflixData.filter(item => item.título.toLowerCase() === titulo.toLowerCase());
    res.json(results);
});

// Endpoint para buscar por categoría
app.get('/trailerflix/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const results = trailerflixData.filter(item => item.categoría.toLowerCase() === categoria.toLowerCase());
    res.json(results);
});
 


// Configurar EJS como el motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/inicio", (req, res) => {
  
  // TRAILERFLIX es JSON con las rutas de las imágenes y las URL de los trailers
  res.render('inicio', {catalogo: TRAILERFLIX });
  
});
//Renderiza la vista de index.ejs

app.get('/index',(req,res)=>{
res.render('index');{ catalogo: TRAILERFLIX}

});


// Endpoint para listar el catálogo completo
app.get('/catalogo', (req, res) => {
    res.render('catalogo', { catalogo: TRAILERFLIX });
  });


// Ruta para  la búsqueda
app.get('/buscar', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = TRAILERFLIX.filter((item) =>
    item.titulo.toLowerCase().includes(query));
  res.json({ resultados: results, query: query });
  console.log("Se ha llamado a la ruta de búsqueda");
});

// Endpoint para buscar por título
app.get('/titulo/:title', (req, res) => {
    const titleParam = req.params.title.toLowerCase();
    const filteredContent = TRAILERFLIX.filter(item => item.titulo.toLowerCase().includes(titleParam));
    res.json(filteredContent);
  });
  
  // Endpoint para buscar por categoría
  app.get('/categoria/:cat', (req, res) => {
    const categoryParam = req.params.cat.toLowerCase();
    const filteredContent = TRAILERFLIX.filter(item => item.categoria.toLowerCase() === categoryParam);
    res.json(filteredContent);
  });
  
  // Endpoint para buscar por actor/actriz en el reparto
  app.get('/reparto/:act', (req, res) => {
    const actorParam = req.params.act.toLowerCase();
    const filteredContent = TRAILERFLIX.filter(item => item.reparto.toLowerCase().includes(actorParam));
    res.json(filteredContent);
  });
  
  // Endpoint para obtener la URL del tráiler
  app.get('/trailer/:id', (req, res) => {
    const idParam = req.params.id;
    const movie = TRAILERFLIX.find(item => item.id === idParam);
    if (movie) {
      if (movie.trailer) {
        res.json({ url: movie.trailer });
      } else {
        res.json({ message: 'Tráiler no disponible para esta película/serie' });
      }
    } else {
      res.status(404).json({ error: 'Película/serie no encontrada' });
    }
  });
  

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor web escuchando en http://localhost:${port}`);
});
