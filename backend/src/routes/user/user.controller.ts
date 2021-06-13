import { RequestHandler } from "express";
import { createHmac } from "crypto"
import User from './user.model';

export const addUser: RequestHandler = async (req, res) => {

	if ( !req.body.nickname || !req.body.password || !req.body.email || !req.body.rut ){

		const userFound = await User.findOne({ nickname: req.body.nickname });

		if ( userFound ) {
			res.status(301);
			res.send ({
				success: false, 
				message: 'Error: el usuario ya existe en el sistema.'
			});	

		} else {
			const user = new User(req.body);
			user.password = encrypt(user.nickname, user.password);
			await user.save()							
			res.status(201);
			res.send ({
				success: true, 
			});
		}

	} else {
		res.status(400);
		res.send ({
			success: false, 
			message: 'Error: datos inválidos' + req.body
		});	
	}
};

export const getUser: RequestHandler = async (req, res) => {
	const userFound = await  User.findOne({ nickname: req.params.nick });

	if( userFound ){
		res.status(200);
		res.send ({
			success: true, 
			user_info: {
				"nickname": userFound.nickname,
				"names": userFound.names,
				"last_name" : userFound.last_name,
				"rut": userFound.rut,
				"region": userFound.region,
				"commune": userFound.commune,
				"address": userFound.address,
				"email": userFound.email
			}
		});	
	}else{
		res.status(404);
		res.send ({
			success: false, 
			message: 'Error: El usuario ingresado no existe en el sistema.'
		});	
	}
};

export const validUser: RequestHandler = async (req, res) => {
	const userFound = await  User.findOne({ nickname: req.params.nick });

	if ( userFound ) {
		res.status(200);
		res.send ({
			success: true
		});		
	} else {
		res.status(404);
		res.send ({
			success: false,
			message: 'Error: El usuario ingresado no existe en el sistema.'
		});
	}
};

export const validPass: RequestHandler = async (req, res) => {
	const userFound = await User.findOne({ nickname: req.body.nickname });
	const passencrypt = encrypt(req.body.nickname, req.body.password)

	if ( userFound ){
		if (  userFound.password === passencrypt ){
			res.status(200);
			res.send ({
				success: true, 
			});
		} else {
			res.status(400);
			res.send ({
				success: false, 
				message: 'Error: la password ingresada no es válida.'
			});
		}
	} else {
		res.status(404);
		res.send ({
			success: false, 
			message: 'Error: el usuario ingresado no existe en el sistema.'
		});
	}
};

export const getNewerUsers: RequestHandler = async (req, res) => {
	
	try {
		const initial_user = parseInt(req.params.init);
		const quantity_user = parseInt(req.params.quantity);
	
		const users = await User.find().sort({updatedAt:-1}).skip(initial_user).limit(quantity_user) ;
		const quantityUsers = await User.countDocuments();

		res.status(200);
		res.send({
			succes: true,
			data: {
				quantity_user: quantityUsers,
				users
			}
		});

	} catch (error) {
		res.status(500);
		res.send({
			succes: false,
			messaje: 'Error inesperado: ' + error.message
		});
	}
};

function encrypt(user: string, pass: string) {
	var hmac = createHmac('sha1', user).update(pass).digest('hex');
	return hmac
 }
