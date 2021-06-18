import { RequestHandler } from "express";
import Cart from './cart.model';
import User from '../user/user.model';
import { Types } from "mongoose"

/**
 * Función que maneja la petición de agregar un nuevo carrito al sistema
 * @route Post /cart
 * @param req Request de la petición, se espera que tenga la información del nuevo carrito a agregar
 * @param res Response, retorna un true si todo sale bien
 */
export const addCart: RequestHandler = async (req, res) => {
    const  { nickname_buyer, products } = req.body;

    //se valida que exista un nickname ingresado
    if (!nickname_buyer)
        return res.status(404).send({ success: false, message: 'Error: no se ingresó el nombre del comprador.' +  nickname_buyer });

    //se valida que existan productos comprados
    if (products.length == 0)
        return res.status(404).send({ success: false, message: 'Error: no se ingresó ningun producto en el carrito.' + products })
    

    const userFound = await User.findOne({nickname: nickname_buyer});

    //se valida que exista el usuario con el nickname ingresado
    if (!userFound)
        return res.status(404).send({ success: false, message: 'Error: el nickname del usuario no existe en el sistema.' })

    const newCart = {nickname_buyer, products};
    
    const cartSaved = new Cart(newCart);
    await cartSaved.save;

    return res.status(200).send({ success: true , cart: cartSaved });
}

/**
 * Funcion que maneja la peticion de un fragmento de todos los carritos registrados, obtiene desde
 * el carrito numero 'initialCart' hasta la cantidad de 'quantityCart'
 * @route Get '/carts/newer/:init/:quantity'
 * @param req Request de la peticion, se espera que tenga el inicio y la cantidad de carritos como parametro
 * @param res Response, retorna la cantidad de carritos registrados y el fragmento que se solicito
 */
 export const getNewerCarts: RequestHandler = async (req, res) => {
    try {
        const initialCart = parseInt(req.params.init);
        const quantityCarts = parseInt(req.params.quantity);

        const carts = await Cart.find().sort({ createdAt: -1}).skip(initialCart).limit(quantityCarts);
        const quantityCartsRegistered: number = await Cart.countDocuments();

        return res.status(200).send({
            success: true,
            quantityCartsRegistered,
            carts: carts
        });
        
    } catch (error) {
        return res.status(500).send({
            succes: false,
            messaje: 'Error inesperado: ' + error.message
        });
    }
}

/**
 * Funcion que maneja la petición de los datos de un carrito en particular.
 * @route Get '/cart/:id'
 * @param req Request de la peticion, se espera que tenga como parametro el id del carrito
 * @param res Response, retornará la informacion del carrito si todo sale bien
 */
 export const getCart: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    
    //se valida el _id ingresado 
    if ( !Types.ObjectId.isValid( _id ))
        return res.status(400).send({ success:false, message:'Error: el id ingresado no es válido.' });

    const cartFound = await Cart.find();

    //se valida la existencia del producto
    if (!cartFound)
        return res.status(404).send({ success: false, message:'Error: el carrito no existe en el sistema.' });

    return res.status(200).send({
        success: true, 
        cart: cartFound
    });
}
