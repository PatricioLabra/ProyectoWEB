import { RequestHandler } from "express";
import Product from './product.model';
import { Types } from "mongoose"

/**
 * Función que maneja la petición de agregar un nuevo producto al sistema, NO SUBE LAS FOTOS
 * @route Post /product
 * @param req Request de la petición, se espera que tenga la información del nuevo producto
 * @param res Response, retorna un true y el id del nuevo producto si todo sale bien
 */
export const addProduct: RequestHandler = async (req, res) => {
    const {
        name, trademark, price, discount, description, weight, dimensions,
        stock, category, subcategories    
    } = req.body;

    //se valida si alguno de los atributos required no sea válidos
    if ( !name || !price || !stock || !category || !subcategories)
        return res.status(400).send({ success: false, message: "Error: datos inválidos" + req.body });
    
     const productFound = await Product.findOne({ name });   
    
     //se valida la existencia del producto en el sistema
    if (productFound)
        return res.status(301).send({ success: false, message:'Error: el producto ya existe en el sistema' });

    const newProduct = {
        name, trademark, price, discount, description, weight, dimensions,
        stock, category, subcategories, calification: 0
    };

    const productSaved = new Product(newProduct);
    await productSaved.save();

    return res.status(201).send({ success: true, _id: productSaved._id });
}

/**
 * Establece las direcciones url de las imagenes de un producto en particular
 * @route Post /product/:id/images
 * @param req Request, se espera que tenga el id y el array de urls de las imagenes a actualizar
 * @param res Response, returna true si todo sale bien
 */
export const setImagesProduct: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const imagesUrls = req.body.imagesUrls;
    
    //se valida el _id ingresado 
    if ( !Types.ObjectId.isValid(_id))
        return res.status(400).send({ success:false, message:'Error: el id ingresado no es válido.' });

    const productFound = await Product.findById(_id);

    //se valida la existencia del producto
    if (!productFound)
        return res.status(404).send({ success: false, message:'Error: el producto no existe en el sistema.' });

    await Product.findByIdAndUpdate(_id, { $set: { images_urls: imagesUrls } });

    return res.send({ success: true, message: 'Imagenes actualizadas correctamente' });
}

/**
 * Funcion que maneja la petición de los datos de un producto en particular.
 * @rute Get '/product/:id'
 * @param req Request de la peticion, se espera que tenga como parametro el id del producto
 * @param res Response, retornará la informacion del producto si todo sale bien
 */
export const getProduct: RequestHandler = async (req, res) => {

    const _id = req.params.id;
    
    //se valida el _id ingresado 
    if ( !Types.ObjectId.isValid( _id ))
        return res.status(400).send({ success:false, message:'Error: el id ingresado no es válido.' });

    const productFound = await Product.findById( _id );

    //se valida la existencia del producto
    if (!productFound)
        return res.status(404).send({ success: false, message:'Error: el producto no existe en el sistema.' });

    // Se seleccionan los atributos que se van a mandar al front
    const productFiltered = destructureProduct(productFound);

    return res.status(200).send({
        success: true, 
        product: productFiltered
    });
}
/**
 * Función que maneja la petición de actualizar un nuevo producto en el sistema
 * @route Put '/product//:id'
 * @param req Request de la peticion, se espera que tenga como parametro el id del producto y un json con el producto actualizado
 * @param res Response, retornará true si todo sale bien
 */
export const updateProduct: RequestHandler = async (req, res) => {
    
    const _id = req.params.id;
    const updatedProduct = req.body;

    //se valida el _id ingresasado
    if ( !Types.ObjectId.isValid( _id ))
        return res.status(400).send({ success: false, message:'Error: el id ingresado no es válido.' });

    const productFound = await Product.findById( _id );

    //se valida la existencia del producto
    if (!productFound)
        return res.status(404).send({ success: false, message:'Error: el producto no existe en el sistema.' });

    //se actualiza el producto en el sistema
    await Product.findByIdAndUpdate(_id, updatedProduct);
    
    return res.status(200).send({ success: true });
}

/**
 * Funcion que maneja la peticion de un fragmento de todos los productos registrados, obtiene desde
 * el product numero 'initialProduct', la cantidad de 'quantityProduct'
 * @rute Get '/products/newer/:init/:quantity'
 * @param req Request de la peticion, se espera que tenga el inicio y la cantidad de productos como parametro
 * @param res Response, retorna la cantidad de productos registrados y el fragmento que se solicito
 */
export const getNewerProducts: RequestHandler = async (req, res) => {

    try {
        const initialProduct = parseInt(req.params.init);
        const quantityProducts = parseInt(req.params.quantity);

        const products = await Product.find().sort({ updated: -1}).skip(initialProduct).limit(quantityProducts);
        const quantityProductsRegistered: number = await Product.countDocuments();

        const productsFiltered = products.map((product: any) => destructureProduct(product));

        return res.status(200).send({
            success: true,
            quantityProductsRegistered,
            products: productsFiltered
        });
        
    } catch (error) {
        return res.status(500).send({
			succes: false,
			messaje: 'Error inesperado: ' + error.message
		});
    }
}

export const getFilteredProducts: RequestHandler = async (req, res) => {

}

export const getSearchProducts: RequestHandler = async (req, res) => {

}

/**
 * Extrae los atributos publicos del producto extraido de la base de datos
 * @param productFound Producto extraido de la base de datos
 * @returns Object con los atributos publicos del producto ingresado
 */
function destructureProduct(productFound: any) {
    const productFiltered = {
        _id: productFound._id,
        name: productFound.name,
        trademark: productFound.trademark,
        images_urls: productFound.images_urls,
        price: productFound.images_urls,
        discount: productFound.discount,
        description: productFound.description,
        weight: productFound.weight,
        dimensions: productFound.dimensions,
        stock: productFound.stock,
        calification: productFound.calification,
        category: productFound.category,
        subcategories: productFound.subcategories,
    };

    return productFiltered;
}
