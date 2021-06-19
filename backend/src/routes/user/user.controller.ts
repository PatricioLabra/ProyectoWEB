import { RequestHandler } from "express";
import { createHmac } from "crypto"
import User from './user.model';
import { signToken } from "../jwt";

/**
 * Funcion que maneja la peticion de agregar un nuevo usuario al sistema
 * @route Post /user/signup
 * @param req Request de la peticion, se espera que tenga la informacion del nuevo usuario
 * @param res Response, retornara el token si todo sale bien
 */
export const signUp: RequestHandler = async (req, res) => {

	const { nickname, password, email, rut } = req.body;

	// Se valida si algun atributo no es valido
	if (!nickname || !password || !email || !rut)
		return res.status(400).send({ success: false, message: 'Error: datos inválidos' + req.body });	

	const userFound = await User.findOne({ nickname });

	// Se valida si ya existe un usuario con el nickname ingresado
	if (userFound)
		return res.status(301).send({ success: false, message: 'Error: el usuario ya existe en el sistema.' })

	const newUser = new User(req.body);
	newUser.password = encrypt(nickname, password);
	await newUser.save()							

	const token = signToken(newUser._id);

	return res.status(201).send({ success: true, token });
}

/**
 * Funcion que maneja la peticion de los datos de un usuario en particular
 * @route get /user/:nick
 * @param req Request de la peticion, se espera que tenga como parametro el nickname del usuario
 * @param res Response, retornara la informacion del usuario si todo sale bien
 */
export const getUser: RequestHandler = async (req, res) => {
	const userFound = await  User.findOne({ nickname: req.params.nick });

	if (!userFound)
		return res.status(404).send({ success: false, message: 'Error: El usuario ingresado no existe en el sistema.' });

	const userInfo = destructureUser(userFound);

	return res.status(200).send({
		success: true, 
		userInfo
	});	
}

/**
 * Funcion que manejara el inicio de sesion de un usuario
 * @route post /user/signin
 * @param req Request de la peticion, se espera que tenga el nick y la pass del usuario que va a loguear
 * @param res Response, retornara el token si todo sale bien
 */
export const signIn: RequestHandler = async (req, res) => {
	const { nickname, password } = req.body;
	const user = await User.findOne({ nickname });
	const passEncrypt = encrypt(nickname, password)

	if (!user)
		return res.status(404).send({ success: false, message: 'Error: el usuario ingresado no existe en el sistema.' });

	if (user.password !== passEncrypt)
		return res.status(400).send({ success: false, message: 'Error: la password ingresada no es válida.' });

	const token = signToken(user._id);

	return res.status(200).send({ success: true, token });
}

/**
 * Funcion que maneja la peticion de un fragmento de todos los usuarios registrados, obtiene desde
 * el usuario numero 'initialUser', la cantidad de 'quantityUsers'
 * @route Get '/users/newer/:init/:quantity'
 * @param req Request de la peticion, se espera que tenga el inicio y la cantidad de usuarios como parametro
 * @param res Response, retorna la cantidad de usuario registrados y el fragmento que se solicito
 */
export const getNewerUsers: RequestHandler = async (req, res) => {
	
	try {
		const initialUser = parseInt(req.params.init);
		const quantityUsers = parseInt(req.params.quantity);
	
		const users = await User.find().sort({ updatedAt: -1 }).skip(initialUser).limit(quantityUsers);
		const quantityUsersRegistered: number = await User.countDocuments();

		// Se filtran los atributos de los usuarios, para no mostrar mas info de la necesaria
		const dataFiltered = users.map((user: any) => destructureUser(user));

		return res.status(200).send({
			succes: true,
			data: {
				quantityUsersRegistered,
				users: dataFiltered
			}
		});

	} catch (error) {
		return res.status(500).send({
			succes: false,
			messaje: 'Error inesperado: ' + error.message
		});
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
