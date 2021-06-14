import { RequestHandler } from "express";
import Product from './product.model';
import { Types } from "mongoose"

/**
 * Función que maneja la petición de agregar un nuevo producto al sistema
 * @route Post /product/add
 * @param req Request de la petición, se espera que tenga la información del nuevo producto
 * @param res Response, retorna un true si todo sale bien
 */
export const addProduct: RequestHandler = async (req, res) => {
    
    const { name, images_urls, price, stock, category, subcategories } = req.body;

    //se valida si alguno de los atributos required no sea válidos
    if ( !name || !images_urls || !price || !stock || !category || !subcategories)
        return res.status(400).send({ success: false, message: "Error: datos inválidos" + req.body });
    
     const productFound = await Product.findOne({ name });   
    
     //se valida la existencia del producto en el sistema
    if (productFound)
        return res.status(301).send({ success: false, message:'Error: el producto ya existe en el sistema' });

    const newProduct = new Product( req.body );
    await newProduct.save();

    return res.status(201).send({ success:true });
}

/**
 * Funcion que maneja la petición de los datos de un producto en particular.
 * @rute Get '/product/:id'
 * @param req Request de la peticion, se espera que tenga como parametro el id del producto
 * @param res Response, retornará la informacion del producto si todo sale bien
 */
export const getProduct: RequestHandler = async (req, res) => {

    const _id = req.params.id;
    
    if ( !Types.ObjectId.isValid( _id ))
        return res.status(400).send({ success:false, message:'Error: el id ingresado no es válido.' });

    const productFound = await Product.findById( _id );

    if (!productFound)
        return res.status(404).send({ success: false, message:'Error: el producto no existe en el sistema.' });

    return res.status(200).send({
        success: true, 
        productFound
    });
}

export const updateProduct: RequestHandler = async (req, res) => {
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

        return res.status(200).send({
            success: true,
            quantityProductsRegistered,
            products
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

