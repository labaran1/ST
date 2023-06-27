import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from '../blog/blog.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  fistName: string;

  @Prop()
  lastName: string;

  @Prop()
  about: string;

  @Prop()
  bio: string;

  @Prop()
  followers: string[];

  @Prop()
  following: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }])
  blogs: Blog[];

  @Prop(
    raw({
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      github: String,
    }),
  )
  socials: Record<string, string>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }])
  savedBlogs: Blog[];
}

export const UserSchema = SchemaFactory.createForClass(User);
