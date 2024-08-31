// promise method
function dogDataHandler(){
    return new Promise((resolve, reject)=>{
        fetch('https://dog.ceo/api/breeds/list/all') // fetch request
        .then((response)=>{
            if(!response.ok){
                reject(`HTTP error! status: ${response.status}`);
            }else{
                resolve(response);
            }
        })
        .catch((err)=>{
            reject("error", err);
        })
       
    })
}

// gettin data and take it in aaray
function responseDataHandler(data){
    const breedArr = []; // blank array
    for (const breed in data) {
    
        // Check if there are sub-breeds (array is not empty)
        if (Array.isArray(data[breed]) && data[breed].length > 0) {
            data[breed].forEach(subBreed => {
                let subbreed = `${subBreed} ${breed}`;
                breedArr.push(subbreed);
                return;
            });
        }

        breedArr.push(`${breed}`);
    }

    return arrayDataHandler(breedArr)
}

// append arraydata in selector
function arrayDataHandler(dataArr){
    const selectElement = document.createElement('select');
    selectElement.id = 'dogBreedSelector'; // Optional: Set an ID for the select element

    const imageSelector = document.createElement('div');
    imageSelector.id = 'imageGallary';
    // Iterate over the data array to create <option> elements
    dataArr.forEach(item => {
        // Create <option> element
        const optionElement = document.createElement('option');
        let t1 =item.split(" ");
        let t2 = t1.reverse(t1);
        let valueItem = t2.toString().replaceAll("'", "").replaceAll(',','/');
        optionElement.value = valueItem; // Set the value attribute
        optionElement.textContent = item; // Set the text content

        // Append the <option> element to the <select> element
        selectElement.appendChild(optionElement);
    });

    document.body.appendChild(selectElement);
    document.body.appendChild(imageSelector);

    // call change event
    selectedValueHandler();
}

// document.addEventListener("DOMContentLoaded", () => {
function selectedValueHandler(){
        
        let selectElement = document.getElementById('dogBreedSelector');
        selectElement.addEventListener('change', function(){
        document.getElementById('imageGallary').innerHTML ="";    
        let selectedOption = this.value;
            console.log("selectedOption is:",selectedOption);
            breedGallaryDataHandler(selectedOption)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                console.log("imagedata is:", data.message);
                responseImageDataHandler(data.message);
            })
            .catch((err)=>{
                console.log("image data error", err);
            })
        });
}



// }

function breedGallaryDataHandler(option){
    return new Promise((resolve, reject)=>{
        fetch(`https://dog.ceo/api/breed/${option}/images`)
        .then((response)=>{
            if(!response.ok){
                reject(`HTTP error! status: ${response.status}`);
            }else{
                resolve(response);
            }
        })
        .catch((err)=>{
            reject("error", err);
        })
    });
}


function responseImageDataHandler(data){
    let breedGallaryArr=[]; // blank array
    for (let i=0; i<10 ; i++) {
        breedGallaryArr.push(data[i]);
    }

    return mediaDataHandler(breedGallaryArr);
}

function mediaDataHandler(imageArr){
    imageArr.forEach(item => {
        // Create <option> element
        const imageElement = document.createElement('img');
        console.log("imageElement is:", imageElement);
        let imageSRC = imageElement.setAttribute('src',item);
        console.log("imageSRC is:", imageSRC);
        // Append the <option> element to the <select> element
        document.getElementById('imageGallary').appendChild(imageElement);
    });
    
}

dogDataHandler()
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        responseDataHandler(data.message);
    })
    .catch((err)=>{
        console.log("error", err);
    })
