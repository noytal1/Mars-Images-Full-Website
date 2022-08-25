function status(response)
{
    if (response.status >= 200 && response.status < 300)
        return Promise.resolve(response)
    else
        return Promise.reject(new Error(response.statusText))
}
async function validate(event) {
    event.preventDefault();
    let emailElem = document.getElementById("email");
    let address = 'api/search/' + emailElem.value.trim();
    let errorElement = emailElem.nextElementSibling; // the error message div

    fetch(address, {method: 'POST'})
    .then(status)
    .then(res => res.json())
    .then(json =>
    {
        if(JSON.stringify(json) === 'error')
            throw "";
        else if(JSON.stringify(json) === 'null') // the email is not in the db
        {
            errorElement.innerHTML = '';
            document.getElementById('registerForm').submit();
        }
        else
        {
            errorElement.innerHTML = 'This email is already in use, please choose another one';
            emailElem.style.borderColor = 'red';
        }
    })
    .catch(function ()
    {
        errorElement.innerHTML = 'There was a problem with the server. Please try again later.';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("registerForm").addEventListener("submit", validate);
});