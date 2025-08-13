import bycript from 'bcryptjs';

export function generateCryptPassword(password_hash: string, salt: number) {

    const saltPassword = bycript.genSaltSync(salt);
    const hash = bycript.hashSync(password_hash, saltPassword);
    return { password_hash: hash };
}

export async function compareCryptPassword(password_form: string, password_hash: string) {
    return await bycript.compare(password_form, password_hash);
}

