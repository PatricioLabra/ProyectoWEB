import { RequestHandler } from "express";

export const addUser: RequestHandler = (req, res) => {
	res.send({success: true, type: 'addUser'});
};

export const getUser: RequestHandler = (req, res) => {
	res.send({success: true, nickname: req.params.nick});
};

export const validUser: RequestHandler = (req, res) => {
	console.log(req.params.nick);
	res.send({success: true, type: 'validUser'});
};

export const validPass: RequestHandler = (req, res) => {
	res.send({success: true, type: 'validPass'});
};

export const getNewerUsers: RequestHandler = (req, res) => {
	const initial_user = parseInt(req.params.init);
	const last_user = parseInt(req.params.quantity) + initial_user - 1;
	res.send({success: true, initial: initial_user, last: last_user});
};
