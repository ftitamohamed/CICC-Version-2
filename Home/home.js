/* import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'; */

/* 
let currentIndex = 0;
            const totalSlides = 2;

            function moveToSlide(index) {
                currentIndex = index;
                const radioToCheck = document.getElementById(`radio${index + 1}`);
                if (radioToCheck) radioToCheck.checked = true;
            }

            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                moveToSlide(currentIndex);
            }, 5000); 

let panelsElement = document.querySelectorAll('.panel'); */


/* let removeActiveClasses = () => {
    panelsElement.forEach(panel => {
        panel.classList.remove('active');
    });
};

panelsElement.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
}); */

document.getElementById("three-canvas").addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
      window.location.href = "customize.html"; // Replace with your desired URL
  }
});
document.getElementById("home-logo").addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
      window.location.href = "index.html"; // Replace with your desired URL
  }
});
window.addEventListener('DOMContentLoaded', (event) => {
  const loginLink = document.getElementById('loginLink');
  
  const userName = localStorage.getItem('userName');
  
  if (userName) {
      // If userName exists in localStorage, update the link to show the user's name
      loginLink.innerHTML = `<i class="fa-solid fa-user"></i> مرحبًا, ${userName}`;
      loginLink.setAttribute('href', 'Profile.html'); // Prevent navigation to login page
      

  }
});




