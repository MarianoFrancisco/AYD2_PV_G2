import { genSalt, hash as _hash } from 'bcryptjs';

/*
* @author
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const hashPassword = async (password) => {
    try {
        const salt = await genSalt(10);
        const hash = await _hash(password, salt);
        return hash;
    } catch (err) {
        throw new Error('Password encryption error');
    }
};

export default hashPassword