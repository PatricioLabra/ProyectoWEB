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

}

/**
 * Funcion que maneja la petición de los datos todos los comentarios.
 * @route Get '/comments'
 * @param req Request de la peticion, no espera nada como parámetro
 * @param res Response, retornará la informacion de todos los comentarios si todo sale bien
 */
export const getComments: RequestHandler = async (req, res) => {

}

/**
 * Funcion que maneja la petición de las calificaciones de todos los comentarios
 * @route Get '/califications'
 * @param req Request de la peticion, no espera nada como parámetro
 * @param res Response, retornará el promedio de todas las calificaciones + su cantidad
 */
export const getCalificationComments: RequestHandler = async (req, res) => {

}
