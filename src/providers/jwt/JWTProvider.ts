import jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

export class JWTProvider {
  public generateToken(id: string) {
    try {
      if (SECRET) {
        const token = jwt.sign({ id: id }, SECRET, {
          expiresIn: 86400,
        });
        return token;
      } else {
        throw new Error("Senha para criação do token não configurada");
      }
    } catch (err) {
      console.log(err);
      throw new Error("Problema na criação do Token");
    }
  }
}
