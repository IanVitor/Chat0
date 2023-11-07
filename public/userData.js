export default function userData(){
  const userArray = []

  function getUserData() {
    if (localStorage.public) {
      userArray = JSON.parse(localStorage.getItem('public'));
    };

    if (userArray[0] == null) {
      userArray[0] = 'Desconhecido'
    }

    if (userArray[1] == null || userArray[1] == "") {
      userArray[1] = "https://i.imgur.com/rHiOx6M.png"
    }

    return userArray
  }

  function updateUserData(name, img) {

    userArray = []

    userArray[0] = name
    userArray[1] = img

    localStorage.public = JSON.stringify(userArray)

  }

  function changeTheme(radioOption) {
    if (radioOption === "dark") {
      window.localStorage.setItem("theme", "light");
      document.body.classList.remove("dark")
    } else if (radioOption === "light") {
      window.localStorage.setItem("theme", "dark")
      document.body.classList.add("dark")
    }
    window.location.reload();
  }

  return{
    getUserData,
    updateUserData,
    changeTheme
  }
}