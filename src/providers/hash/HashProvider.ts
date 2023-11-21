import bcrypt = require("bcrypt");

export class BcryptHashProvider {
  async generateHash(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.ROUND_SALT || "0", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async compareHash(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
