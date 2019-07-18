const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('.msg-1');
const messageTwo = document.querySelector('.msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = input.value;

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';    

    fetch(`/weather?address=${address}`).then(response => {

        response.json().then(data => {

            if (data.error) {
                return messageOne.textContent = data.error;
            }           
            
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forcast;
        }); 
    })
    .catch(error => {
        console.log(error);
    });
});
