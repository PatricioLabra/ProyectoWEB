import { RequestHandler } from "express";
import Product from './product.model';

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

    return res.status(200).send({ success:true });
}

export const getProduct: RequestHandler = async (req, res) => {
    const productFound = await Product.findOne({_id: req.params._id});

    if (!productFound)
        return res.status(404).send({ success: false, message:'Error: el producto no existe en el sistema.' });

    return res.status(200).send({
        success: true, 
        productFound
    });
}

export const updateProduct: RequestHandler = async (req, res) => {
}

export const getNewerProducts: RequestHandler = async (req, res) => {

    try {
        const initialProduct = parseInt(req.params.init);
        const quantityProducts = parseInt(req.params.quantity);

        const products = await Product.find().sort({ updated: -1}).skip(initialProduct).limit(quantityProducts);
        const quantityProductsRegistered: number = await Product.countDocuments();

        return res.status(200).send({
            success: true,
            quantityProductsRegistered
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
