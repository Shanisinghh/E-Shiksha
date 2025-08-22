import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;


    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error"+error });
  }
};
