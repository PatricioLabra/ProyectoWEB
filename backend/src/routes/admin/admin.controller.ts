import { RequestHandler } from "express";
import { createHmac } from "crypto";
import Admin from './admin.model'
import { signToken } from "../jwt";

/**
 * Función que maneja la petición de agregar un nuevo administrador al sistema
 * @route Post /admin/signup
 * @param req Request de la peticion, se espera que tenga la informacion del nuevo administrador
 * @param res Response, retornara el token si todo sale bien
 */
export const signUp: RequestHandler = async (req, res) => {

	const { nickname, password, permission_level} = req.body;

	//se valida que los atributos sean válidos
	if(!nickname || !password || !permission_level)
		return res.status(400).send({ succes: false, message: 'Error: datos inválidos'+ req.body });

	const adminFound = await Admin.findOne({ nickname });

	//se valida la existencia de un admin con el nickname ingresado
	if(adminFound)
		return res.status(301).send({ succes: false, message: 'Error: el admin ingresado ya existe en el sistema.' });

	const newAdmin = new Admin(req.body);
	newAdmin.password = encrypt(nickname, password);
	await newAdmin.save()

	const token = signToken(newAdmin._id);

	return res.status(201).send({ success: true, token});
}

/**
 * Funcion que maneja la peticion de los datos de un administrador en particular
 * @route get /admin/:nick
 * @param req Request de la petición, se espera que tenga como parametro el nickname del usuario
 * @param res Response, retornará la infomación del administrador si todo sale bien
 */
export const getAdmin: RequestHandler = async (req, res) => {
	const adminFound = await  Admin.findOne({ nickname: req.params.nick });

	if (!adminFound)
		return res.status(404).send({ success: false, message: 'Error: el administrador ingresado no existe en el sistema.'});
	
	const adminInfo = destructureAdmin(adminFound);

	return res.status(200).send({
		success:true, 
		adminInfo
	});	
}

/**
 * Funcion que manejará el inicio de sesión de un administrador
 * @route post /admin/signin
 * @param req Request de la peticion, se espera que tenga el nick y la pass del admin que va a loguear
 * @param res Response, retornara el token si todo sale bien
 */
export const signIn: RequestHandler = async (req, res) => {
	const { nickname, password } = req.body;
	const admin = await Admin.findOne({ nickname });
	const passEncrypt = encrypt(nickname, password);

	if (!admin)
		return res.status(404).send({ success: false, message: 'Error: el administrador ingresado no existe en el sistema.' });

	if (admin.password !== passEncrypt)
		return res.status(400).send({ success:false, message: 'Error: la password ingresada no es válida.' });

	const token = signToken(admin._id);

	return res.status(200).send({ succes: true, token });
}
/**
 * Encripta la contraseña del administrador, usando como clave de encriptación su nickname
 * @param admin Nickname del Administrador
 * @param pass  Password del administrador
 * @returns Password cifrada del administrador
 */
function encrypt(admin: string, pass: string) {
	var hmac = createHmac('sha1', admin).update(pass).digest('hex');
	return hmac
}

/**
 *  Extrae los datos publicos del administrador ingresado
 * @param admin  Administrador extraido de la base de datos
 * @returns Los datos publicos del administrador (que serán enviados al frontend)
 */
function destructureAdmin(admin:any){
	const { nickname, password, permission_level} = admin;

	return {
		nickname, 
		permission_level
	};
}
