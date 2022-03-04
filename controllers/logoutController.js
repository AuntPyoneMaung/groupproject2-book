class logoutController {
    async logout(req, res) {

        try {
            const { accessToken, refreshToken } = req.cookies;

            res.clearCookie('refreshToken', refreshToken, {path: "/", domain: "book-libraryshop.herokuapp.com", httpOnly: true, sameSite: "None", secure: true});
            res.clearCookie('accessToken', accessToken, {path: "/", domain: "book-libraryshop.herokuapp.com", httpOnly: true, sameSite: "None", secure: true});
            
            res.status(204);
            return res.json({ message: "Your logout is successful!" });
        } catch (err) {
            res.status(400);
            return res.json({ message: "Your logout is unsuccessful!" });
        }
    }
}

module.exports = logoutController;