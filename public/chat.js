export default function createChat() {
  const state = []

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

    
    let user = {
      id: userId,
      name: userName,
      img: userImg,
    };

    state.push(user)

    notifyAll({
      type: "add-user",
      userId: userId,
      userName: userName,
      userImg: userImg,
    });
  }

  function removeUser(command) {
    const userId = command.userId;

    for(let i=0; i<state.length; i++){
      if(state[i].id === userId){
        state.splice(i, 1)
      }
    }

    notifyAll({
      type: "remove-user",
      userId: userId,
    });
  }

  return {
    state,
    addUser,
    removeUser,
    subscribe,
    setState
  };
}
