import { RequestHandler } from "express";
import { createHmac } from "crypto";
import Admin from './admin.model'

export const addAdmin: RequestHandler = async (req, res) => {

	if ( req.body.nickname || req.body.password || req.body.permission_level ){

		const adminFound = await Admin.findOne({nickname: req.body.nickname});

		if ( adminFound ){
			res.status(301);
			res.send ({
				success: false, 
				message: 'Error: el admin ya existe en el sistema.'
			});	
		} else {
			const admin = new Admin(req.body);
			admin.password = encrypt(admin.nickname, admin.password);
			await admin.save()							
			res.status(201);
			res.send ({
				success: true, 
			});
		}

	} else {
		res.status(400);
		res.send({
			success: false,
			message: 'Error: datos inválidos'+ req.body
		});
	}
}

export const getAdmin: RequestHandler = async (req, res) => {
	const adminFound = await  Admin.findOne({ nickname: req.params.nick });

	if( adminFound ){
		res.status(200);
		res.send ({
			success: true, 
			admin_info: {
				"nickname": adminFound.nickname,
				"permission_level": adminFound.permission_level
			}
		});	
	}else{
		res.status(404);
		res.send ({
			success: false, 
			message: 'Error: El admin ingresado no existe en el sistema.'
		});	
	}
}

export const validAdmin: RequestHandler = async (req, res) => {
	const userFound = await  Admin.findOne({ nickname: req.params.nick });

	if ( userFound ) {
		res.status(200);
		res.send ({
			success: true
		});		
	} else {
		res.status(404);
		res.send ({
			success: false,
			message: 'Error: El admin ingresado no existe en el sistema.'
		});
	}
}

export const validPass: RequestHandler = async (req, res) => {
	const adminFound = await Admin.findOne({ nickname: req.body.nickname });
	const passencrypt = encrypt(req.body.nickname, req.body.password)

	if ( adminFound ){
		if (  adminFound.password === passencrypt ){
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
			message: 'Error: el admin ingresado no existe en el sistema.'
		});
	}
}

function encrypt(user: string, pass: string) {
	var hmac = createHmac('sha1', user).update(pass).digest('hex');
	return hmac
}
