const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    const fetchUrl = '/weather?address=' + location;
    message1.textContent = 'Loading....';
    message2.textContent = '';
    fetch(fetchUrl).then((response)=>{

        response.json().then((data)=>{
            if (data.error) {
                message1.textContent = 'ERROR';
                message2.textContent = 'Location Not Found';
            } else
            {
                message1.textContent = data.place_name;
                message2.textContent = data.temperature;
            }
        });
    });
});

