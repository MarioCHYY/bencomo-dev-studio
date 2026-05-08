const form = {
  access_key: "977d23ee-f351-477b-9546-231c99b20a08",
  name: "Mario",
  email: "marionetabencomo@gmail.com",
  message: "hablemos"
};

fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(form)
})
.then(res => res.json().then(data => ({status: res.status, data})))
.then(console.log)
.catch(console.error);
