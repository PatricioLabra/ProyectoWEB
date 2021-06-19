import { RequestHandler } from "express";
import Comment from './comment.model';
import { Types } from "mongoose"

/**
 * Función que maneja la petición de agregar un nuevo comentario al sistema
 * @route Post /comment
 * @param req Request de la petición, se espera que tenga la información del nuevo comentario
 * @param res Response, retorna un true si todo sale bien
 */
export const addComment: RequestHandler = async (req, res) => {

    const { id_product, comments } = req.body;

    //se valida que id_product no sea null 
    if (!id_product)
        return res.status(400).send({ succes: false, message: 'Error: no se ingresó un id para el producto.' });

    //se valida que el id_product sea válido
    if ( !Types.ObjectId.isValid( id_product ) )
        return res.status(400).send({ success:false, message:'Error: el id del producto ingresado no es válido.' });

    //se valida que el arreglo de comentarios no esté vacío
    if (comments.lenght == 0)
        return res.status(400). send({ succes: false, message: 'Error: no se ingresó ningun comentario o calificacion del producto.'});

    comments[0].comment_date = Date.now();

    try {
        const productFound = await Comment.findOne({id_product});

        //se valida si hay un producto ya registrado
        if (productFound){
            const lengthCommentsArray = productFound.comments.length;
            productFound.comments[lengthCommentsArray] = comments[0];

            await Comment.findByIdAndUpdate( productFound._id, productFound );
            
            return res.status(201).send({ success: true });
        }

        const newComment = {id_product, comments};
        const commentSaved = new Comment(newComment);
        
        await commentSaved.save();

        return res.status(201).send({ succes: true });

    } catch (error) {
        return res.status(400).send({success: false, message: 'Error: '+ error});
    }
   
}

/**
 * Funcion que maneja la petición de los datos todos los comentarios.
 * @route Get '/comments'
 * @param req Request de la peticion, no espera nada como parámetro
 * @param res Response, retornará la informacion de todos los comentarios + la cantidad de los mismos si todo sale bien
 */
export const getComments: RequestHandler = async (req, res) => {

    const id_product = req.params.id_product;

    //se valida que el id_product no sea null
    if (!id_product)
        return res.status(400).send({ success: false, message: 'Error: No se ingresó ningun id de producto.' })

    //se valida que el id_product sea objectId
    if ( !Types.ObjectId.isValid( id_product ) )
        return res.status(400).send({ success:false, message:'Error: el id del producto ingresado no es válido.' });

    const product = await Comment.findById(id_product);
    const quantityComments = product.comments.lenght;

    //se valida que exista un producto almacenado con sus comentarios

    return res.status(200).send({ success: true, quantityComments, product });
}

/**
 * Funcion que maneja la petición de las calificaciones de todos los comentarios
 * @route Get '/califications'
 * @param req Request de la peticion, no espera nada como parámetro
 * @param res Response, retornará el promedio de todas las calificaciones + su cantidad si todo sale bien
 */
export const getCalificationComments: RequestHandler = async (req, res) => {
    //se valida que el id_product no sea null
    //se valida que el id_product sea objectId
    //se valida que exista un producto almacenado con sus comentarios

}
