const path = require("path");
//use express module
const express = require("express");
//use hbs view engine
const hbs = require("hbs");
//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database
const mysql = require("mysql");
const app = express();

function _0x3928() {
  const _0x4bbebf = [
    "2eBGGZw",
    "2791025xKyukk",
    "1165WzFFsa",
    "23454YNHRKP",
    "2240608RwaBVY",
    "2706192DjpwZO",
    "413sfKjNg",
    "product",
    "createConnection",
    "localhost",
    "root",
    "2032071ngAPvB",
    "1847836mJuaJt",
  ];
  _0x3928 = function () {
    return _0x4bbebf;
  };
  return _0x3928();
}
function _0x1032(_0x128425, _0x32620c) {
  const _0x392819 = _0x3928();
  return (
    (_0x1032 = function (_0x1032c6, _0x217dfa) {
      _0x1032c6 = _0x1032c6 - 0x1b5;
      let _0x1611eb = _0x392819[_0x1032c6];
      return _0x1611eb;
    }),
    _0x1032(_0x128425, _0x32620c)
  );
}
const _0x1d24cb = _0x1032;
(function (_0x2c2b56, _0x11983b) {
  const _0x5b2acc = _0x1032,
    _0xeee818 = _0x2c2b56();
  while (!![]) {
    try {
      const _0x2dda65 =
        -parseInt(_0x5b2acc(0x1bb)) / 0x1 +
        (-parseInt(_0x5b2acc(0x1b9)) / 0x2) *
          (-parseInt(_0x5b2acc(0x1b7)) / 0x3) +
        parseInt(_0x5b2acc(0x1b8)) / 0x4 +
        -parseInt(_0x5b2acc(0x1ba)) / 0x5 +
        (-parseInt(_0x5b2acc(0x1bc)) / 0x6) *
          (parseInt(_0x5b2acc(0x1bf)) / 0x7) +
        -parseInt(_0x5b2acc(0x1bd)) / 0x8 +
        parseInt(_0x5b2acc(0x1be)) / 0x9;
      if (_0x2dda65 === _0x11983b) break;
      else _0xeee818["push"](_0xeee818["shift"]());
    } catch (_0x7b3f4e) {
      _0xeee818["push"](_0xeee818["shift"]());
    }
  }
})(_0x3928, 0x5a507);
const conn = mysql[_0x1d24cb(0x1c1)]({
  host: _0x1d24cb(0x1b5),
  user: _0x1d24cb(0x1b6),
  password: "",
  database: _0x1d24cb(0x1c0),
});

//connect ke database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use("/assets", express.static(__dirname + "/public"));

//route untuk homepage
app.get("/", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render("product_view", {
      results: results,
    });
  });
});

//route untuk insert data
app.post("/save", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//route untuk update data
app.post("/update", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//route untuk delete data
app.post("/delete", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//server listening
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
