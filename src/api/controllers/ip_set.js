const { match_ip } = require('../helpers/ip_set');

let controller = {};

controller.match = async ( req, res, next ) => {
  const { ip } = req.query;
  if(!ip ) return req.respond.badRequest();
  match_ip(ip, (error, match) => {
    return match ? req.respond.forbidden(ip) : req.respond.ok(ip)
  });

};


module.exports.IpSetController = controller;



