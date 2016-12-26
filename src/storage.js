/**
 * 数据库操作
 */

var storage = {};
//
// var mongo = require('mongoskin');
// var db = mongo.db("mongodb://localhost:27017/omegle", {native_parser: true});
//
// storage.insertClient = function (callback) {
//     db.collection('client').insertOne({}, function (err, result) {
//         if (err != undefined) {
//             throw err;
//         }
//         callback(result.insertedId);
//     });
// };
//
// storage.getSessionByClientId = function (clientId, callback) {
//     db.collection('session').findOne({"$or": [{"client1": clientId}, {"client2": clientId}]}, function (err, result) {
//         if (err != undefined) {
//             throw err;
//         }
//         if (result != null) {
//             return callback(result);
//         }
//         db.collection('session').insertOne({
//             client1: clientId,
//             client2: null,
//             closed: false
//         }, function (err, result) {
//             if (err != undefined) {
//                 throw err;
//             }
//             callback(result);
//         });
//     });
// };


module.exports = storage;