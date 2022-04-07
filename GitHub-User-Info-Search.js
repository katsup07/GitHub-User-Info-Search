
        const baseEndpoint = 'https://api.github.com'; //endpoint is the url you need to visit to get data
        const usersEndpoint = `${baseEndpoint}/users`;

        const searchInput = document.querySelector('#search');//search input text box
        const submitBtn = document.querySelector('.submit');
        const userInfo = document.querySelector('.user');//current search results display

        //1. Compare this without await in 
        async function displayUser(username = '') {
            const response = await fetch(`${usersEndpoint}/${username}`);//returns the promise response
            //First get data response and then convert from JSON to javascript object
            data = await response.json() //json() takes JSON as input and parses it to make a js object
            userInfo.insertAdjacentHTML('afterbegin', `<div id='username'>Search: ${username}</div>`);
            dataArray = Object.entries(data);
            dataArray.forEach(data => userInfo.insertAdjacentHTML('beforeend', `<div>${data.join(': ')}</div>`));//display data on page
        }

        //Will use javscript fetch library 
        function handleError(err) {
            console.log('oh no!');
            userInfo.insertAdjacentHTML('beforeend', '<div>Ooops something went wrong. Please check you input the username correctly</div>.')
            console.log(err);
        }

        function clear() {
            userInfo.innerHTML = '';
        }

        function handleInput(e) {

            e.preventDefault();
            if (e.type === 'click') {
                userInfo.innerHTML = '';
                const username = searchInput.value;
                displayUser(username);
            }

            if (e.key === 'Escape') {
                clear();
            }
        }

        submitBtn.addEventListener('click', handleInput);
        submitBtn.addEventListener('keyup', handleInput);
        document.addEventListener('keyup', handleInput);