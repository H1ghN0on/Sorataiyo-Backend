import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserType } from "../controllers/UserController";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
passport.use(
  new JwtStrategy(opts, (jwt_payload: any, done: any) => {
    done(null, jwt_payload);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj: UserType, cb) => {
  cb(null, obj);
});

export { passport };
