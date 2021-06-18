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

    //se valida que id_product no sea null 
    //se valida que el arreglo de comentarios no esté vacío
    //se valida que el id_product no este registrado
        //si lo está, se agrega el comentario_ingresado a los comentarios ya almacenados con el id_producto ingresado en la BD
        //si no está, se agregan los comentarios del producto con el id_product
}

/**
 * Funcion que maneja la petición de los datos todos los comentarios.
 * @route Get '/comments'
 * @param req Request de la peticion, no espera nada como parámetro
 * @param res Response, retornará la informacion de todos los comentarios + la cantidad de los mismos si todo sale bien
 */
export const getComments: RequestHandler = async (req, res) => {
    //se valida que el id_product no sea null
    //se valida que el id_product sea objectId
    //se valida que exista un producto almacenado con sus comentarios
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
