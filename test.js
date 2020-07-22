const fetch = require("node-fetch");

(async () => {
  const res = await (await fetch("http://localhost:3000/commands")).json();
  console.log(res);
})();
