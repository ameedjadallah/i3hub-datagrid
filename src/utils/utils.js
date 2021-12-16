export const modifyUsersObject = (users) => {
  users.map((user, index) => {
    user.username =
      user.name.title + " " + user.name.first + " " + user.name.last;
      user.id = user.login.uuid;
      user.images = [
        "https://picsum.photos/500/500?random=" + Math.random(),
        "https://picsum.photos/500/500?random=" + Math.random(),
        "https://picsum.photos/500/500?random=" + Math.random(),
        "https://picsum.photos/500/500?random=" + Math.random(),
        "https://picsum.photos/500/500?random=" + Math.random(),
        "https://picsum.photos/500/500?random=" + Math.random(),
      ]
    return user;
  });
  return users;
};

export const findUser = (users, id) =>{
  let user =  users.find(function (obj) {
    return obj.login.uuid === id;
  })
  return user;
}
