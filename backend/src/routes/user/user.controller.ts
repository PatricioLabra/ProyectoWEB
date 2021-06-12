import { RequestHandler } from "express";
import User from './user.model';

export const addUser: RequestHandler = async (req, res) => {
	const userFound = await User.findOne({ nickname: req.body.nickname });

	if ( userFound ) {
		res.status(301);
		res.send ({
			success: false, 
			type: 'addUser'
		});		
	} else {
		const user = new User(req.body);
		await user.save()							/*almacenamos el usuario en la BD */
		res.status(200);
		res.send ({
			success: true, 
			type: 'addUser'
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
			type: 'getUser'
		});	
	}
};

export const validUser: RequestHandler = async (req, res) => {
	const userFound = await  User.findOne({ nickname: req.params.nick });

	if ( userFound ) {
		res.status(200);
		res.send ({
			success: true, 
			type: 'validUser'
		});		
	} else {
		res.status(404);
		res.send ({
			success: false, 
			type: 'validUser'
		});
	}
};

export const validPass: RequestHandler = (req, res) => {
	res.send({success: true, type: 'validPass'});
};

export const getNewerUsers: RequestHandler = (req, res) => {
	const initial_user = parseInt(req.params.init);
	const last_user = parseInt(req.params.quantity) + initial_user - 1;
	res.send({success: true, initial: initial_user, last: last_user});
};
