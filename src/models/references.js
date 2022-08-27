const { User } = require('./user')
const { Post } = require('./post')
const { Comment } = require('./comment')
const { Message } = require('./message')
const { Request } = require('./request')
const { Friend } = require('./friend')
const { Role } = require('./role')
const { Like, typeLike } = require('./like')

// roleId se agregara a user
Role.hasOne(User)
User.belongsTo(Role)

// un user tiene muchos post
User.hasMany(Post)
Post.belongsTo(User)

// un post tiene muchos comments
Post.hasMany(Comment)
Comment.belongsTo(Post)

// un user tiene muchos likes y un like pertenece a un user
User.hasMany(Like)
Like.belongsTo(User)

// un post tiene muchos likes y un like pertecene a un post
Post.hasMany(Like)
Like.belongsTo(Post)

// un like tiene un tipo y los tipos pertenecen a likes
typeLike.hasOne(Like)
Like.belongsTo(typeLike)

// un user tiene muchos comments
User.hasMany(Comment)
Comment.belongsTo(User)

//ok

// un user tiene muchas solicitudes
User.hasOne(Request, { as: 'from', foreignKey: 'userId' })
User.hasOne(Request, { as: 'to' })
Request.belongsTo(User)

// un user tiene muchos friends
// relacion doble via
User.hasOne(Friend, { as: 'user', foreignKey: 'userId' })
User.hasOne(Friend, { as: 'Friend'})
Friend.belongsTo(User)

// un user tiene muchos messages
User.hasOne(Message, { as: 'sender', foreignKey: 'userId' })
User.hasOne(Message, { as: 'receiver' })
Message.belongsTo(User)