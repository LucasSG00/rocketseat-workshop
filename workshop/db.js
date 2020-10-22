const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./workshop.db')

db.serialize(function() {

    // criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER  PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // // inserir dado na tabela
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `
    
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Curso de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia exercitationem deleniti iure temporibus",
    //     "https://rocketseat.com"
    // ]


    // db.run(query, values, function(err) {
    //     if(err) return console.log(err)

    //     console.log(this)
    // })


    // // consulta dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if (err) return console.log(err)

    //   console.log(rows)
    // })

    //O fechamento de academias e o isolamento das pessoas para evitar a transmissão do novo coronavírus impuseram desafios para a manutenção da atividade física. Até por isso, a Organização Mundial da Saúde (OMS) criou um manual com treinos que podem ser realizados dentro de casa.


//     //deletar um dado da tabela
//    db.run(`DELETE FROM ideas WHERE title=?`, ["teste"], function(err) {
//        if (err) return console.log(err)

//        console.log("DELETEI", this)
//    })
})

module.exports = db