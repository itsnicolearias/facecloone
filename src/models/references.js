const { User } = require('./user')
const { Post } = require('./post')
const { Comment } = require('./comment')
const { Message } = require('./message')
const { Request } = require('./request')
const { Role } = require('./role')
const { Like, typeLike } = require('./like')
const { Friend, Status } = require('./friend')

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

// un user tiene muchos friends y a la vez ese amigo tiene otros amigos
// relacion doble via
User.belongsToMany(User, { 
    as: 'user',
    foreignKey: 'userId',
    uniqueKey: false,
    through: Friend
  });
User.belongsToMany(User, { 
    as: 'friend',
    foreignKey: 'friendId',
    uniqueKey: false,
    through: Friend
  });

// una amistad tiene un tipo y los tipos pertenecen a friends
Status.hasOne(Friend)
Friend.belongsTo(Status)

// un user tiene muchos messages y el receiver a la vez tiene otros mensajes
User.hasOne(Message, { as: 'sender', foreignKey: 'userId' })
User.hasOne(Message, { as: 'receiver' })
Message.belongsTo(User)