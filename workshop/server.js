
//Utilizando o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia exercitationem deleniti iure temporibus",
        url:"https://rocketseat.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia exercitationem deleniti iure temporibus",
        url:"https://rocketseat.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia exercitationem deleniti iure temporibus",
        url:"https://rocketseat.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia exercitationem deleniti iure temporibus",
        url:"https://rocketseat.com"
    }
]

//Configura arquivos estáticos (css, srcipt, iamgens)
server.use(express.static("public"))

//Config do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("view", {
    express: server,
    noCache: true,
})

//Routa "/"
server.get("/", function(req, res){

    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if(lastIdeas.length < 3) {
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res){
    
    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas  })
})

// Ligando meu servidor na porta 3000
server.listen(3000)