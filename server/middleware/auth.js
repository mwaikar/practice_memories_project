import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
    console.log('inside middleware');
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500; // if token length is greater than 500, that means its google token

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; // name of google's id which differentiates different users
        }
        next();

    } catch (error) {
        console.log(error);
    }

}

export default auth;