function makeSecretJwtString(): string {

    let secretString = "";
 const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for (let index = 0; index < 128; index++) {
     secretString += allChars.charAt(Math.floor(Math.random() * allChars.length))
 }
    return secretString;
}
export const jtwSecret: string = "Momcilovic"; // just for testing