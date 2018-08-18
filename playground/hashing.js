const { SHA256 } = require("crypto-js"); // a hashing function to sign
const jwt = require("jsonwebtoken");  // encode data
const bcrypt = require("bcryptjs");   // password encryption

// https guarantee securely transferring token (not seeing in the middle by others)
// jwt for token verification (prevent tampering, id 4 delete id 5 data)
// salt prevent decode using look up table

var data = {
  id: 5
}
// SHA256 to sign 
// jwt.io can only decode json payload
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString()
// }
var token = jwt.sign(data, "123abc"); // '123abc' is the secret
var decoded = jwt.verify(token, "123abc");
console.log(token, decoded);


// hash with salt would generate different value each time
// but those different values can get the same value in bwt.compare()
var password = "123abc!";
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash, salt, password);
  });
});

var hashedpassword =
  "$2a$10$SsKwmDF56/RkZ0MVkkXNKeixJXCPxPomIgjjrFpfLSDD8VgQgAS2G";
 
bcrypt.compare(password, hashedpassword, (err, res) => {
  console.log(password, hashedpassword, res);
});