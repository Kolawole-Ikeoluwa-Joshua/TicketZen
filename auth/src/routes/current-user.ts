import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    // check if currentuser has a session
    if (!req.session?.jwt) {
        // return early
        return res.send({ currentUser: null });
    }

    try {
        // valid JWT
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send ({ currentUser: payload })
    } catch (err) {
        // invalid JWT
        res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };