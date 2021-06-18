import { RequestHandler } from "express";
import { createHmac } from "crypto"
import { ApiResponse } from '../api-response.model';
import User from './user.model';
import { signToken } from "../jwt";

/**
 * Funcion que maneja la peticion de agregar un nuevo usuario al sistema
 * @route Post /user/signup
 * @param req Request de la peticion, se espera que tenga la informacion del nuevo usuario
 * @param res Response, retornara el token si todo sale bien
 */
export const signUp: RequestHandler = async (req, res) => {

	const responseObject: ApiResponse<Object> = { success: false };
	const { nickname, password, email, rut } = req.body;

	// Se valida si algun atributo no es valido
	if (!nickname || !password || !email || !rut) {
		responseObject.message = 'Error: datos inválidos' + req.body;
		return res.status(400).send(responseObject);	
	}

	const userFound = await User.findOne({ nickname });

	// Se valida si ya existe un usuario con el nickname ingresado
	if (userFound) {
		responseObject.message = 'Error: el usuario ya existe en el sistema.';
		return res.status(301).send(responseObject);
	}

	const newUser = new User(req.body);
	newUser.password = encrypt(nickname, password);
	await newUser.save()							

	const token = signToken(newUser._id);
	responseObject.data = { token };
	responseObject.success = true;

	return res.status(201).send(responseObject);
}

/**
 * Funcion que maneja la peticion de los datos de un usuario en particular
 * @route get /user/:nick
 * @param req Request de la peticion, se espera que tenga como parametro el nickname del usuario
 * @param res Response, retornara la informacion del usuario si todo sale bien
 */
export const getUser: RequestHandler = async (req, res) => {

	const responseObject: ApiResponse<Object> = { success: false };
	const userFound = await  User.findOne({ nickname: req.params.nick });

	if (!userFound) {
		responseObject.message = 'Error: El usuario ingresado no existe en el sistema.';
		return res.status(404).send(responseObject);
	}

	const userInfo = destructureUser(userFound);

	responseObject.success = true;
	responseObject.data = { userInfo };

	return res.status(200).send(responseObject);	
}

/**
 * Funcion que manejara el inicio de sesion de un usuario
 * @route post /user/signin
 * @param req Request de la peticion, se espera que tenga el nick y la pass del usuario que va a loguear
 * @param res Response, retornara el token si todo sale bien
 */
export const signIn: RequestHandler = async (req, res) => {

	const responseObject: ApiResponse<Object> = { success: false };
	const { nickname, password } = req.body;
	const user = await User.findOne({ nickname });
	const passEncrypt = encrypt(nickname, password)

	if (!user) {
		responseObject.message = 'Error: el usuario ingresado no existe en el sistema.';
		return res.status(404).send(responseObject);
	}

	if (user.password !== passEncrypt) {
		responseObject.message = 'Error: la password ingresada no es válida.';
		return res.status(400).send(responseObject);
	}

	const token = signToken(user._id);
	responseObject.data = { token };
	responseObject.success = true;

	return res.status(201).send(responseObject);
}

/**
 * Funcion que maneja la peticion de un fragmento de todos los usuarios registrados, obtiene desde
 * el usuario numero 'initialUser', la cantidad de 'quantityUsers'
 * @route Get '/users/newer/:init/:quantity'
 * @param req Request de la peticion, se espera que tenga el inicio y la cantidad de usuarios como parametro
 * @param res Response, retorna la cantidad de usuario registrados y el fragmento que se solicito
 */
export const getNewerUsers: RequestHandler = async (req, res) => {
	
	const responseObject: ApiResponse<Object> = { success: false };

	try {
		const initialUser = parseInt(req.params.init);
		const quantityUsers = parseInt(req.params.quantity);
	
		const users = await User.find().sort({ updatedAt: -1 }).skip(initialUser).limit(quantityUsers);
		const quantityUsersRegistered: number = await User.countDocuments();

		// Se filtran los atributos de los usuarios, para no mostrar mas info de la necesaria
		const dataFiltered = users.map((user: any) => destructureUser(user));

		responseObject.success = true;
		responseObject.data = { quantityUsersRegistered, dataFiltered };

		return res.status(200).send(responseObject);

	} catch (error) {

		responseObject.message = 'Error inesperado: ' + error.message;
		return res.status(500).send(responseObject);
	}
}

/**
 * Encripta la contraseña del usuario, usando como clave de encriptacion su nickname
 * @param user Nickname del usuario
 * @param pass Password del usuario
 * @returns Password cifrada del usuario
 */
function encrypt(user: string, pass: string) {
	var hmac = createHmac('sha1', user).update(pass).digest('hex');
	return hmac
}

/**
 * Extrae los datos publicos del usuario ingresado
 * @param user Usuario extraido de la base de datos
 * @returns Los datos publicos del usuario (los que se mandan al front)
 */
function destructureUser(user: any) {
	const { nickname, names, last_name, rut, region, commune, address, email } = user;

	return {
		nickname,
		names,
		last_name,
		rut,
		region,
		commune,
		address,
		email
	};
}
