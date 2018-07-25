# chat-mobile
#[GET]  https://fierce-wildwood-40527.herokuapp.com/api/v1/channels return all channels
#[POST]  https://fierce-wildwood-40527.herokuapp.com/api/v1/users => give me {username, channelId}  create user 
#[GET]  http://localhost:3000/api/v1/channels/:channelid/messages?limit=&skip=  return old messages
#RoomSocket io('/chatroom') Join Socket
#Events
#count => return count
#addMessage => 
  #add new message  { username, content, type, createdAt } for [GET]
  #give me {userId, content, type} for [POST]
#join => join give me userId that return from [post]:[/api/v1/users]
#left => give me {userId}
