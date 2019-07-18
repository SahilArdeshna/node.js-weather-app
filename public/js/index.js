const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('.msg-1');
const messageTwo = document.querySelector('.msg-2');
const messageThree = document.querySelector('.msg-3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = input.value;

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';

    fetch(`/weather?address=${address}`).then(response => {

        response.json().then(data => {

            if (data.error) {
                return messageOne.textContent = data.error;
            }      
            
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forcast[0];
            messageThree.textContent = data.forcast[1];
        }); 
    })
    .catch(error => {
        console.log(error);
    });
});

