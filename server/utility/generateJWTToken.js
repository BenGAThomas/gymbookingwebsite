import jwt from 'jsonwebtoken';

export const generateJWTToken = (res, userId) => {
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "14days"
    })

res.cookie('token', token, {
    httpOnly: true, //setting this to true means cookie can't be accessed by client side scripts which should help protect the user
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === 'production', //this ensures that when it goes to production the cookie changes from http to https
    sameSite: 'strict', //cookie will only be set on the same site
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days for the max for the cookie
})

return token;
}