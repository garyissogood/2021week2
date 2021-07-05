const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');
const url = 'https://vue3-course-api.hexschool.io/';


function login(event) {
  event.preventDefault();
  const user = {
    username: username.value,
    password: password.value,
  }
  axios.post(`${url}admin/signin`, user).then((res) => {
      
    if(res.data.success){
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
      window.location ='products.html';
      console.log(res.data)
    } else {
      alert(res.data.message);
    }
  }).catch((error) => {
    console.log(error);
  });
}

form.addEventListener('submit', login)
