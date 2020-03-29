
//Utilizando o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

//Configura arquivos estáticos (css, srcipt, iamgens)
server.use(express.static("public"))

// Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//Config do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("view", {
    express: server,
    noCache: true,
})

//Rota "/"
server.get("/", function(req, res){


    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 3) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
    
        return res.render("ideias.html", { ideas: reversedIdeas  })
    })
})

server.post("/", function(req, res) {
    // inserir dado na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
        `
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        return res.redirect("/ideias")
    })
})

// Ligando meu servidor na porta 3000
server.listen(3000)