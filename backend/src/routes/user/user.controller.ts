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
		user.password = encrypt(user.nickname, user.password);
		await user.save()							
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

export const validPass: RequestHandler = async (req, res) => {
	const userFound = await User.findOne({ nickname: req.body.nickname });
	const passencrypt = encrypt(req.body.nickname, req.body.password)

	if ( userFound && ( userFound.password === passencrypt ) ){
		res.status(200);
		res.send ({
			success: true, 
			type: 'validPass'
		});
	} else {
		res.status(400);
		res.send ({
			success: false, 
			type: 'validPass'
		});
	}
};

export const getNewerUsers: RequestHandler = async (req, res) => {
	const initial_user = parseInt(req.params.init);
	const last_user = parseInt(req.params.quantity) + initial_user - 1;

	const users = await User.find().sort({createdAt:-1}).limit(last_user) ;
	//falta seleccionar
	return res.json(users);
};

function encrypt(user: string, pass: string) {
	var crypto = require('crypto')
	var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
	return hmac
 }
