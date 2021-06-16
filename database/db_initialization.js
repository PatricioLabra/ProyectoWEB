const collections_names = ['users', 'admins', 'products', 'ShoppingCartsBought', 'comments']

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
    db.users.createIndex({"nickname": 1})
    db.users.createIndex({"updatedAt": -1})

    db.admins.createIndex({"nickname": 1})

    db.products.createIndex({"uptatedAt": -1})
    db.products.createIndex({"name": "text", "trademark": "text", "category": "text", "subcategories": "text"}, {default_language: "spanish"})

    // Se debe cambiar el nombre
    db.ShoppingCartsBought.createIndex({"buy_date": -1})

    db.comments.createIndex({"id_product": 1})
}
