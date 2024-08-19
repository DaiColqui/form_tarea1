document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Flatpickr en el campo de fecha
    flatpickr("#birthDate", {
        dateFormat: "d-m-Y",
        locale: "es" // Establecer el idioma a español

    });

    // Agregar países al select
    const countrySelect = document.getElementById('country');
    const countries = ["Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "México", "Perú", "Uruguay", "Venezuela"];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Validar el formulario
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const birthDateElement = document.getElementById('birthDate');
        let birthDate;
        if (birthDateElement.fp && birthDateElement.fp.selectedDates[0]) {
            birthDate = birthDateElement.fp.selectedDates[0].toISOString().split('T')[0];
        }

        if (!validateEmail(email)) {
            alert('El correo electrónico no es válido. Ingrese un correo válido, por ejemplo: "email@ejemplo.com"');
            return;
        }

        if (!validateInput(name)) {
            alert('Nombre no válido. Ingrese un nombre válido, por ejemplo: "Daiana"');
            return;
        }

        if (!validateInput(lastName)) {
            alert('Apellido no válido. Ingrese un apellido válido, por ejemplo: "Colquicocha"');
            return;
        }

        if (validateBirthDate(birthDate)) {
            alert('No podemos registrarte. Para poder registrarte tenes que ser mayor de 18 años.');
            return;
        }
        
        alert('Registro exitoso!');
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateInput(name) {
        const regex = /^[A-Za-z]+(?:[ ]+[A-Za-z]+)*$/;
        return regex.test(name);
    }

    function validateBirthDate(birthDate) {
        const today = new Date();
        const ageLimit = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        ageLimit.setFullYear(ageLimit.getFullYear() - 18);
    
        const birthDateObj = new Date(birthDate);
    
        if (birthDateObj >= ageLimit) {
            return true; 
        } else {
            return false; 
        }
    }

    // Alternar el estilo de la página
    const toggleStyleIcon = document.getElementById('toggleStyle');

    toggleStyleIcon.addEventListener('click', () => {
        document.body.classList.toggle('alternate-style');
    });
});