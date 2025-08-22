import jwt from "jsonwebtoken";

const secretToken = process.env.JWT_SECRET || "MYSECRET@123";

function CreateJWT(id_usuario) {
    return jwt.sign({ id_usuario }, secretToken, {
        expiresIn: "7d"
    });
}

function ValidateJWT(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).send({ error: "Token não informado" });
    }

    const parts = authToken.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).send({ error: "Formato do token inválido" });
    }

    const token = parts[1];

    jwt.verify(token, secretToken, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Token inválido" });
        }

        req.id_usuario = decoded.id_usuario;
        next();
    });
}

export default { CreateJWT, ValidateJWT };
