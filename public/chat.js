export default function createChat() {
  const state = {
    users: {},
  };

  const observers = [];

  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function addUser(command) {
    const userId = command.userId;
    const userName = command.userName;
    const userImg = command.userImg;

    state.users[userId] = {
      name: userName,
      img: userImg,
    };

    notifyAll({
      type: "add-user",
      userId: userId,
      userName: userName,
      userImg: userImg,
    });

    console.log(state);
  }

  function removeUser(command) {
    const userId = command.userId;

    delete state.users[userId];

    notifyAll({
      type: "remove-user",
      userId: userId,
    });

    console.log(state)
  }

  return {
    addUser,
    removeUser,
    subscribe,
    setState
  };
}
