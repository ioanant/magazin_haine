var express = require("express")
var Sequelize = require("sequelize")

//connect to mysql database
//baza de date, username, password
var sequelize = new Sequelize('articole_vestimentare', 'ioanaa', 'stud', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
}).catch( function(err) {
    console.log(err)
})

//define a new Model

var MainCategories = sequelize.define('maincategories', {
    namemc: Sequelize.STRING
})

var Categories = sequelize.define('categories', {
    id_maincategory: Sequelize.INTEGER,
    namec: Sequelize.STRING
})

var Products = sequelize.define('products', {
    id_category: Sequelize.INTEGER,
    namep:Sequelize.STRING,
    descriptionp: Sequelize.STRING,
    price: Sequelize.INTEGER,
    onsale : Sequelize.BOOLEAN,
    commsale: Sequelize.INTEGER,
    image_path: Sequelize.STRING
})
var Selected_Items=sequelize.define('selected_items', {
    id_product:Sequelize.STRING,
    isnew: Sequelize.BOOLEAN
})
var Orders=sequelize.define('orders', {
    fname: Sequelize.STRING,
    gname: Sequelize.STRING,
    adress: Sequelize.STRING,
    town: Sequelize.STRING,
    country: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING
})

Products.belongsTo(Categories, {foreignKey: 'id_category', targetKey: 'id'})
Categories.belongsTo(MainCategories, {foreignKey: 'id_maincategory', targetKey: 'id'})
MainCategories.hasMany(Categories, {foreignKey:'id_maincategory'})
Categories.hasMany(Products, {foreignKey:'id_category'})
Selected_Items.belongsTo(Products, {foreignKey: 'id_product', targetKey: 'id'})


var app = express()

//access static files


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        response.status(500).send('could not create tables')
    })
})

app.post('/insert/:id', (request, response) => {
    Selected_Items.create({
    id_product: request.params.id,
    isnew: true
}).then(message => {
    console.log(message);
    // you can now access the newly ChatMessage task via the variable message
}).catch(err => {
     response.status(500).send('something bad happened')
})
})

app.get('/createdata', (req, res) => {
    //TODO add some test data here
})


// get a list of maincategories
app.get('/maincategories', getMainCategories)

async function getMainCategories(request, response) {
    try {
        let maincategories= await MainCategories.findAll();
        response.status(200).json(maincategories)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}

async function getOrders(request, response) {
    try {
        let order = await Orders.findAll();
        response.status(200).json(order)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}
// get a list of maincategories by id
app.get('/maincategories/:id', function(request, response) {
    MainCategories.findOne({where: {id:request.params.id}}).then(function(maincategory) {
        if(maincategory) {
            response.status(200).send(maincategory)
        } else {
            response.status(404).send()
        }
    })
})



//update items
app.put('/selected_items/:id', function(request, response) {
    Selected_Items.findByPk(request.params.id).then(function(item) {
        if(item) {
            item.update(request.body).then(function(item){
                response.status(201).send(item)
            }).catch(function(error) {
                response.status(200).send(item)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/selected_items', function(request, response) {
    Selected_Items.findAll({
            where:{isnew: true}
        }
            ).then(
            function(item) {
                response.status(200).send(item)
            }
        )
}
)

app.delete('/selected_items/:id', function(request, response) {
    Selected_Items.findByPk(request.params.id).then(function(item) {
        if(item) {
            item.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/products', function(request, response) {
    Products.findAll(
        {
            include: {
                model: Categories,
                where: { id: Sequelize.col('products.id_category') }
            }
        }
        
        ).then(
            function(products) {
                response.status(200).send(products)
            }
        )
})

app.get('/products/:id', function(request, response) {
     Products.findAll({
            where:{id: request.params.id}
        }
            ).then(
            function(item) {
                response.status(200).send(item)
            }
        )
})
app.get('/orders', getOrders)

app.post('/orders', function(request, response) {
    Orders.create(request.body).then(function(order) {
        response.status(201).send(order)
    })
})
app.post('/selected_items', function(request, response) {
    Selected_Items.create(request.body).then(function(order) {
        response.status(201).send(order)
    })
})
app.get('/maincategories/:id/categories', function(request, response) {
    Categories.findAll({
            where:{id_maincategory: request.params.id},
            include: {
                model: MainCategories,
                where: { id: Sequelize.col('categories.id_maincategory') }
            }
        }
            ).then(
            function(category) {
                response.status(200).send(category)
            }
        )
})



app.get('/categories/:id/products', function(request, response) {
    Products.findAll({
            where:{id_category: request.params.id},
            include: 
                     {
                model: Categories,
                where: { id: Sequelize.col('products.id_category') }
                     }
        }
            ).then(
            function(product) {
                response.status(200).send(product)
            }
        )
})


app.use(express.static('public'))

app.listen(8080)
