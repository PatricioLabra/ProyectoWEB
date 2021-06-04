const collections_names = ['Users', 'Admins', 'Products', 'ShoppingCartsBought', 'ProductsComments']

function initDB() {
    createCollections()
    createIndexes()
}

function createCollections() {
    collections_names.forEach(col_name => {
	db.createCollection(col_name);
    });
}

function createIndexes() {
    db.Users.createIndex({"nickname": 1})
    db.Users.createIndex({"modification_date": -1})

    db.Admins.createIndex({"nickname": 1})

    db.Products.createIndex({"modification_date": -1})
    db.Products.createIndex({"name": "text", "trademark": "text", "category": "text", "subcategories": "text"})

    db.ShoppingCartsBought.createIndex({"buy_date": -1})

    db.ProductsComments.createIndex({"id_product": 1})
}
