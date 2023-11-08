export default function userData(){
  const userArray = []

  function getUserData() {
    let data = []
    
    if (localStorage.public) {
      data = JSON.parse(localStorage.getItem('public'));
    };

    if (data[0] == null) {
      data[0] = 'Desconhecido'
    }

    if (data[1] == null || data[1] == "") {
      data[1] = "https://i.imgur.com/rHiOx6M.png"
    }

    return data
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