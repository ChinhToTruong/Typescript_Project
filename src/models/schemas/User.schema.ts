import { ObjectId } from "mongodb"

enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}

interface Media {
  url: string
  type: MediaType // video or image
}

enum MediaType {
  Image,
  Video
}

enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}

enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}

interface UserType {
  _id?: ObjectId 
  name?: string
  email: string
  date_of_birth?: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export default class User {
  _id?: ObjectId 
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string

  constructor(user: UserType) {
    const date = new Date ()
    this._id = user._id || new ObjectId()
    this.name = user.name || ''
    this.email = user.email
    this.date_of_birth = user.date_of_birth || new Date();
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''   
    this.forgot_password_token = user.forgot_password_token || '' 
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.username = user.username || ''
    this.website = user.website || ''
    this.cover_photo = user.cover_photo || ''
    this.avatar = user.avatar || ''
  }
}