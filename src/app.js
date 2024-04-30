import {app} from "./server/server.js";

const PORT = process.env.PORT || 3000; //Puerto

//Arranco el servidor
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

