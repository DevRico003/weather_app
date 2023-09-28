// Importiere benötigte Module
import express from 'express'
import hbs from 'hbs' // handlebars: Eine Vorlagen-Engine für Node.js
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import weatherData from "../utils/weatherData.js" // Importiere die Wetterdatenfunktion

// Erstelle eine neue Express-Anwendung
const app = express()

// Definiere den Port, auf dem der Server lauschen soll
const port = 3000

// Konvertiere die URL des aktuellen Moduls in einen Pfad
const __filename = fileURLToPath(import.meta.url);

// Erhalte das Verzeichnis des aktuellen Moduls
const __dirname = dirname(__filename);

// Definiere den Pfad zum öffentlichen Verzeichnis (zum Servieren von statischen Dateien)
const publicPath = path.join(__dirname, "../public")

// Definiere den Pfad zu den Ansichten (Vorlagen) 
const viewsPath = path.join(__dirname, "../templates/views")

// Definiere den Pfad zu den partiellen Vorlagen (Teilvorlagen)
const partialsPath = path.join(__dirname, "../templates/partials")

// Setze Handlebars als die Vorlagen-Engine
app.set("view engine", "hbs")

// Setze den Pfad für die Ansichten (Vorlagen)
app.set("views", viewsPath)

// Registriere die partiellen Vorlagen
hbs.registerPartials(partialsPath)

// Nutze das öffentliche Verzeichnis zum Servieren von statischen Dateien
app.use(express.static(publicPath))

// Route für die Startseite
app.get("", (req, res) => {
  // Rendere die "index"-Vorlage mit einem Titel
  res.render("index", { title: "Weather App" })
})

// Route für den Wetterdienst
app.get("/weather", (req, res) => {
  // Prüfe, ob eine Adresse als Abfrageparameter angegeben ist
  if (!req.query.address) {
    return res.send("Address is required")
  }

  // Rufe die Wetterdatenfunktion mit der angegebenen Adresse auf
  weatherData(req.query.address, (error, result) => {
    // Wenn ein Fehler auftritt, sende den Fehler
    if (error) {
      return res.send(error)
    }

    // Andernfalls sende das Ergebnis
    res.send(result)
  })
})

// Route für alle nicht definierten Pfade (404-Fehlerseite)
app.get("*", (req, res) => {
  // Rendere die "404"-Vorlage mit einem Titel
  res.render("404", { title: "Page not found" })
})

// Starte den Server auf dem angegebenen Port
app.listen(port, () => {
  console.log("Server is listening on port " + port)
})
