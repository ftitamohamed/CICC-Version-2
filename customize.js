const slider = document.getElementById("imageSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let counter = 0;
console.log(slider.children.length)
const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentIndex * 300}px)`;
};

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        counter -= 6;
        updateSliderPosition();
    }
});

nextBtn.addEventListener("click", () => {
    if (counter < slider.children.length - 1) {
        currentIndex++;
        counter += 6;
        updateSliderPosition();
    }
});

const draggableDiv = document.getElementById("draggableDiv");
console.log(draggableDiv)
// Variables to store the current position and the offset
let isDragging = false;
let offsetX, offsetY;

// Mouse down: Initialize dragging
draggableDiv.addEventListener("mousedown", (event) => {
    isDragging = true;

    // Calculate the offset from the mouse position to the top-left corner of the div
    offsetX = event.clientX - draggableDiv.offsetLeft;
    offsetY = event.clientY - draggableDiv.offsetTop;

    // Add event listeners for mousemove and mouseup
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

// Function to handle the dragging
function onMouseMove(event) {
    if (!isDragging) return;

    // Calculate the new position
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    // Update the position of the div
    draggableDiv.style.left = `${x}px`;
    draggableDiv.style.top = `${y}px`;
}

// Mouse up: Stop dragging
function onMouseUp() {
    isDragging = false;

    // Remove event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

let keyList  = document.querySelectorAll('.toggelers p');
keyList.forEach((key)=>{
    
    key.addEventListener("click",function(){
        for(let i=0; i<keyList.length;i++){
            keyList[i].classList.remove("toggelers-active");
            
        };
        key.classList.toggle("toggelers-active");
        
    }); 
    
}); 

let colorsList = document.querySelectorAll('ul.colors li');
console.log(colorsList)
function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215);
    // Convert the number to a hexadecimal string and pad with leading zeros if necessary
    return `#${randomColor.toString(16).padStart(6, '0')}`;
}

// Example usage
/* let bgColor;
// e.g., #a3c9f1
colorsList.forEach((color)=>{
    
     bgColor = getRandomHexColor();
     console.log(bgColor); 
     color.style.backgroundColor=`${bgColor}`

}) */

function formatText(command, value = null) {
    document.execCommand(command, false, value);
  }

  /* document.getElementById("save").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        window.location.href = "../Cart/Cart.html"; // Replace with your desired URL
    }
  }); */
 
  document.getElementById("home-logo").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        window.location.href = "index.html"; // Replace with your desired URL
    }
  });
  let priceCounter = 60 * 5 ;
  let peicePrice = 120 ;
  let tracker = document.querySelector('#draggableDiv div span.totalPrice');
  tracker.innerText = `${priceCounter}$`
    
  let count = document.querySelector('.count');
  let countNumber = 5;
    
  let plus = document.querySelector('.fa-plus');
  
  let minus = document.querySelector('.fa-minus');
  
    
plus.addEventListener('click',()=>{
        countNumber =countNumber+1;
        count.innerHTML = countNumber;
        priceCounter = priceCounter + peicePrice;
        tracker.innerText = `${priceCounter}$`
})
minus.addEventListener('click',()=>{
        if( countNumber> 5 ){
            countNumber =countNumber - 1;
        count.innerHTML = countNumber;
        priceCounter = priceCounter - peicePrice;
        tracker.innerText = `${priceCounter}$`
        }
        
})
    
  document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("canvas");
    const imageInput = document.getElementById("imageInput");
    const textInput = document.getElementById("textInput");
    const addTextButton = document.getElementById("addTextButton");
    const deleteButton = document.getElementById("deleteButton");
    const canvas = new fabric.Canvas(canvasElement);

    // Add image to canvas
    imageInput.addEventListener("change", (e) => {
      const imgObj = e.target.files[0];
      if (imgObj) {
        const reader = new FileReader();
        priceCounter += 2;
        tracker.innerText = `${priceCounter }$`
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;

          imageElement.onload = function () {
            const image = new fabric.Image(imageElement);
            image.set({
              left: 0,
              top: 0,
              scaleY: 0.1,
              scaleX: 0.1,
            });
            canvas.add(image);
            canvas.centerObject(image);
            canvas.setActiveObject(image);
          };

          // Reset the file input to allow uploading the same file again
          imageInput.value = "";
        };

        reader.readAsDataURL(imgObj);
      }
    });

   // Add styled text from the contenteditable div
   
   const editor = document.querySelector('.editor');

   addTextButton.addEventListener('click', () => {
    const styledHTML = editor.innerHTML.trim();
    if (styledHTML) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = styledHTML;
      priceCounter += 2;
      tracker.innerText = `${priceCounter }$`
      let topPosition = 50; // Starting vertical position for text

      Array.from(tempDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Add plain text
          const textObject = new fabric.Text(node.textContent, {
            left: 50,
            top: topPosition,
            fontSize: 16,
            fill: 'black',
            fontFamily: 'Arial',
          });
          canvas.add(textObject);
          topPosition += 30; // Adjust top for next text
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Add styled text
          const styles = window.getComputedStyle(node);
          const textObject = new fabric.Text(node.textContent, {
            left: 50,
            top: topPosition,
            fontSize: parseInt(styles.fontSize),
            fill: styles.color,
            fontFamily: styles.fontFamily,
            fontStyle: styles.fontStyle,
            fontWeight: styles.fontWeight,
            textDecoration: styles.textDecorationLine,
          });
          canvas.add(textObject);
          topPosition += 30; // Adjust top for next text
        }
      });

      canvas.renderAll();
    } else {
      alert('Please enter some text in the editor.');
    }
  });

   // Optional: Add placeholder functionality
   /* editor.addEventListener('focus', () => {
     if (editor.dataset.placeholder && editor.innerText.trim() === '') {
       editor.innerText = '';
     }
   });

   editor.addEventListener('blur', () => {
     if (editor.innerText.trim() === '') {
       editor.innerText = editor.dataset.placeholder;
     }
   }); */
    // Delete selected item from canvas
    deleteButton.addEventListener("click", () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        priceCounter -=2;
        tracker.innerText = `${priceCounter }$`
      } else {
        alert("No item selected to delete!");
      }
    });
  });

  function downloadImage() {
    const node = document.getElementById('tshirt-div'); // Div containing both the image and the canvas
    
    // Use dom-to-image to capture the div as a PNG image
    domtoimage.toPng(node).then(function (dataUrl) {
        // Create an image element to display the generated PNG
        const img = new Image();
        img.src = dataUrl;
        /* document.body.appendChild(img); */ // This will display the PNG on the page

        // Trigger the download of the PNG file
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'custom-tshirt.png'; // Name for the downloaded image
        link.click();
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
};

function saveToLocalStorage() {
    const node = document.getElementById('tshirt-div'); // Div containing both the image and the canvas

    domtoimage.toPng(node).then(function (dataUrl) {
        // Retrieve existing images from local storage if available
        let images = JSON.parse(localStorage.getItem('tshirtImages')) || [];
        let prices =  JSON.parse(localStorage.getItem('fruits')) || [];
        
        // Add the new image to the array
        images.push(dataUrl);
        prices.push(priceCounter);
        console.log(prices);
        localStorage.setItem('fruits', JSON.stringify(prices));
        // Save the updated array back to local storage
        localStorage.setItem('tshirtImages', JSON.stringify(images));
        
        
        alert('تم حفظ طلبك تحقق من سلة التسوق');
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
    

}

// Get the button and the file input
const triggerButton = document.getElementById('triggerButton');
const imageInput = document.getElementById('imageInput');

// Add click event listener to the button
triggerButton.addEventListener('click', () => {
    imageInput.click(); // Trigger the file input
});





window.addEventListener('DOMContentLoaded', (event) => {
  const loginLink = document.getElementById('loginLink');
  
  const userName = localStorage.getItem('userName');
  
  if (userName) {
      // If userName exists in localStorage, update the link to show the user's name
      loginLink.innerHTML = `<i class="fa-solid fa-user"></i> مرحبًا, ${userName}`;
      loginLink.setAttribute('href', '../Profile/Profile.html'); // Prevent navigation to login page
      

  }
});


