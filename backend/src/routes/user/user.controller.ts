import { RequestHandler } from "express";
import { createHmac } from "crypto"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './user.model';

dotenv.config();

export const addUser: RequestHandler = async (req, res) => {

	const { nickname, password, email, rut } = req.body;

	// Se valida si algun atributo no es valido
	if (!nickname || !password || !email || !rut)
		return res.status(400).send({ success: false, message: 'Error: datos inválidos' + req.body });	

	const userFound = await User.findOne({ nickname: req.body.nickname });

	// Se valida si ya existe un usuario con el nickname ingresado
	if (userFound)
		return res.status(301).send({ success: false, message: 'Error: el usuario ya existe en el sistema.' })

	const newUser = new User(req.body);
	newUser.password = encrypt(newUser.nickname, newUser.password);
	await newUser.save()							

	const token = jwt.sign({_id: newUser._id}, process.env.SECRET_KEY || 'secret_key');

	return res.status(201).send({ success: true, token });
}

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

export const signIn: RequestHandler = async (req, res) => {
	console.log(req.body);
	const { nickname, password } = req.body;
	const user = await User.findOne({ nickname: nickname });
	const passEncrypt = encrypt(nickname, password)

	if (!user)
		return res.status(404).send({ success: false, message: 'Error: el usuario ingresado no existe en el sistema.' });

	if (user.password !== passEncrypt)
		return res.status(400).send({ success: false, message: 'Error: la password ingresada no es válida.' });

	const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY || 'secret_key');

	return res.status(200).send({ success: true, token });
}

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
}

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
