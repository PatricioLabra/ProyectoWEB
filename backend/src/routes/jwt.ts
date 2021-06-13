import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function signToken(id: any) {
	const token = jwt.sign({ _id: id }, process.env.SECRET_KEY || 'secret_key');
	return token;
}

export const verifyToken: RequestHandler = (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(400).send({ success: false, message: 'Headers dont have authorization param' });

	const token = req.headers.authorization.split(' ')[1];

	if (!token)
		return res.status(400).send({ success: false, message: 'Bad syntax header authorization' });

	const payload: any = jwt.verify(token, process.env.SECRET_KEY || 'secret_key');
	req.body._id = payload._id;

	next();
}
