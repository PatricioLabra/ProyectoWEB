import { RequestHandler } from "express";
import Comment from './comment.model';
import Product from '../product/product.model'
import { Types } from "mongoose"

/**
 * Función que maneja la petición de agregar un nuevo comentario al sistema
 * @route Post /comment
 * @param req Request de la petición, se espera que tenga la información del nuevo comentario
 * @param res Response, retorna un true si todo sale bien
 */
export const addComment: RequestHandler = async (req, res) => {

    const { id_product, comment } = req.body;

    //se valida que id_product no sea null 
    if (!id_product)
        return res.status(400).send({ succes: false, message: 'Error: no se ingresó un id para el producto.' });

    //se valida que el id_product sea válido
    if ( !Types.ObjectId.isValid( id_product ) )
        return res.status(400).send({ success:false, message:'Error: el id del producto ingresado no es válido.' });

    const product = await Product.findById(id_product);

    //se valida que el producto a almacenar exista en la base de datos
    if (!product)
        return res.status(404).send({ success:false, message: 'Error: el producto no esta registrado en la base de datos.'});

    //se valida que se haya enviado el comentario
    if (!comment)
        return res.status(400). send({ succes: false, message: 'Error: no se ingresó ningun comentario o calificacion del producto.'});

    //se almacena la fecha del comentario
    comment.comment_date = new Date();
    
    try {
        const productFound = await Comment.findOne({ id_product });

        //se valida si hay un producto ya registrado
        if (productFound){
            // Se ingresa el comentario al array de comentarios
            await Comment.updateOne({ id_product }, { $push: { comments: comment } });

            return res.status(200).send({ success: true , comments: [...productFound.comments, comment] });
        }

        //al no estar registrado se crea y se agrega
        const newComment = { id_product, comments: [comment]};
        const commentSaved = new Comment(newComment);
        
        await commentSaved.save();

        return res.status(200).send({ succes: true , comments: [comment]});

    } catch (error) {
        return res.status(400).send({success: false, message: 'Error: '+ error});
    }
}

/**
 * Funcion que maneja la petición de los datos todos los comentarios.
 * @route Get '/comment/:id'
 * @param req Request de la peticion, espera init y quantity para seleccionar los comentarios a retornar
 * @param res Response, retornará la informacion de los comentarios seleccionados + la cantidad total de comentarios
 */
export const getComments: RequestHandler = async (req, res) => {

    const id_product = req.params.id;

    //se valida que el id_product no sea null
    if (!id_product)
        return res.status(400).send({ success: false, message: 'Error: No se ingresó ningun id de producto.' });

    //se valida que el id_product sea objectId
    if ( !Types.ObjectId.isValid( id_product ) )
        return res.status(400).send({ success:false, message:'Error: el id del producto ingresado no es válido.' });

    const product = await Comment.findOne({ id_product });

    //se valida que esté registrado el producto
    if (!product)
        return res.status(200).send({ success: true, totalComments: 0, comments: []});

    const comments = product.comments;
    const totalComments = comments.length;

    return res.status(200).send({ success: true, totalComments, comments });
}

/**
 * Funcion que maneja la petición de las calificaciones de todos los comentarios
 * @route Get '/califications/:id'
 * @param req Request de la peticion, no espera nada como parámetro
 * @param res Response, retornará el promedio de todas las calificaciones + su cantidad si todo sale bien
 */
export const getCalificationComments: RequestHandler = async (req, res) => {
    
    const id_product = req.params.id;

    //se valida que el id_product no sea null
    if (!id_product)
        return res.status(400).send({ success: false, message: 'Error: No se ingresó ningun id de producto.' });

    //se valida que el id_product sea objectId
    if ( !Types.ObjectId.isValid( id_product ) )
        return res.status(400).send({ success:false, message:'Error: el id del producto ingresado no es válido.' });

    const product = await Comment.findOne({id_product});

    //se valida que esté registrado el producto
    if (!product)
        return res.status(404).send({ success: false, message: 'Error: no se encontró ningun producto calificado con el id ingresado.' });

    const quantityComments = product.comments.length;

    //se valida que el producto tenga comentarios
    if (quantityComments == 0)
        return res.status(404).send({ success: false, message: 'Error: No se encontraron calificaciones del producto ingresado' });

    const calification =  gradeAdder(product);

    return res.status(200).send({success: true, quantityCalifications: calification.quantityCalifications, Average: calification.averageCalification });
}

/**
 * Funcion que calcula el promedio de todas las calificaciones almacenadas en los comentarios de un producto
 * @param product Producto extraido de la base de datos
 * @returns Object con el promedio y la cantidad de calificaciones
 */
function gradeAdder(product:any){
    let totalCalification = 0;
    let quantityCalifications = 0;
    let averageCalification = 0;

    product.comments.forEach((comment:any) => {
        totalCalification += comment.calification_author;

        if (comment.calification_author != 0)
            quantityCalifications ++;
    });
    
    //Se calcula el promedio
    averageCalification = (totalCalification / quantityCalifications);

    return { averageCalification, quantityCalifications };
}
