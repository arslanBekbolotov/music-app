import mongoose, {Model} from "mongoose";
import bcrypt from 'bcrypt';
import {IUser} from "../types";
import {randomUUID} from "crypto";

interface IUserMethods{
  checkPassword(password:string):Promise<boolean>;
  generateToken():void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const SALT_WORK_FACTOR = 7;

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = randomUUID();
};

const User = mongoose.model<IUser, UserModel>('User', UserSchema)

export default User;
