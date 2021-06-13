import { RequestHandler } from "express";
import { createHmac } from "crypto"
import User from './user.model';

export const addUser: RequestHandler = async (req, res) => {

	const { nickname, password, email, rut } = req.body;

	// Se valida si algun atributo no es valido
	if (!nickname || !password || !email || !rut)
		return res.status(400).send({ success: false, message: 'Error: datos inválidos' + req.body });	

	const userFound = await User.findOne({ nickname: req.body.nickname });

	// Se valida si ya existe un usuario con el nickname ingresado
	if (userFound)
		return res.status(301).send({ success: false, message: 'Error: el usuario ya existe en el sistema.' })

	const user = new User(req.body);
	user.password = encrypt(user.nickname, user.password);
	await user.save()							

	return res.status(201).send({ success: true });
};

export const getUser: RequestHandler = async (req, res) => {
	const userFound = await  User.findOne({ nickname: req.params.nick });

	if (!userFound)
		return res.status(404).send({ success: false, message: 'Error: El usuario ingresado no existe en el sistema.' });

	const userInfo = destructureUser(userFound);

	return res.status(200).send({
		success: true, 
		userInfo
	});	
};

export const validUser: RequestHandler = async (req, res) => {
	const userFound = await User.findOne({ nickname: req.params.nick });

	if (!userFound)
		return res.status(404).send({ success: false, message: 'Error: El usuario ingresado no existe en el sistema.' });

	return res.status(200).send({ success: true });
};

export const validPass: RequestHandler = async (req, res) => {
	const userFound = await User.findOne({ nickname: req.body.nickname });
	const passEncrypt = encrypt(req.body.nickname, req.body.password)

	if (!userFound)
		return res.status(404).send({ success: false, message: 'Error: el usuario ingresado no existe en el sistema.' });

	if (userFound.password !== passEncrypt)
		return res.status(400).send({ success: false, message: 'Error: la password ingresada no es válida.' });

	return res.status(200).send({ success: true });
};

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
				dataFiltered
			}
		});

	} catch (error) {
		return res.status(500).send({
			succes: false,
			messaje: 'Error inesperado: ' + error.message
		});
	}
};

function encrypt(user: string, pass: string) {
	var hmac = createHmac('sha1', user).update(pass).digest('hex');
	return hmac
}

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
