import { RequestHandler } from "express";

export const addAdmin: RequestHandler = (req, res) => {
	res.send({success: true, type: 'addAdmin'});
};

export const getAdmin: RequestHandler = (req, res) => {
	res.send({success: true, nickname: req.params.nick});
};

export const validAdmin: RequestHandler = (req, res) => {
	console.log(req.params.nick);
	res.send({success: true, type: 'validAdmin'});
};

export const validPass: RequestHandler = (req, res) => {
	res.send({success: true, type: 'validPass'});
};
