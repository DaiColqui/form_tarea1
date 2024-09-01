document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Flatpickr en el campo de fecha
    flatpickr("#birthDate", {
        dateFormat: "m-d-Y",
        locale: "es" // Establecer el idioma a español

    });

    // Agregar países al select
    const countrySelect = document.getElementById('country');
    const countries = ["Argentina", "Brasil", "Bolivia", "Chile", "Colombia", "Ecuador", "México", "Paraguay", "Perú", "Uruguay", "Venezuela"];

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
        const birthDateElement = document.getElementById('birthDate').value;

        if (!validateEmail(email)) {
            alert('El correo electrónico no es válido. Ingrese un correo válido, por ejemplo: "email@ejemplo.com".');
            return;
        }

        if (!validateInput(name)) {
            alert('Nombre no válido. Ingrese un nombre válido, por ejemplo: "Daiana".');
            return;
        }

        if (!validateInput(lastName)) {
            alert('Apellido no válido. Ingrese un apellido válido, por ejemplo: "Colquicocha".');
            return;
        }

        if (birthDateElement.trim() === '') {
            alert('La fecha de nacimiento no puede estar vacía. Por favor ingrese una fecha válida.');
            return;
        }

        if (validateBirthDate(birthDateElement) == 1) {
            alert('No podemos registrarte. Para poder registrarte tenes que ser mayor de 18 años.');
            return;
        } else if (validateBirthDate(birthDateElement) == 2) {
            alert('Según esta fecha todavía no has nacido. Por favor ingresa una fecha válida');
            return;
        }


        alert('¡Registro exitoso!');
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateInput(name) {
        if (!name.trim()) {
            return false;
        }
        const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ' ]+$/;
        return regex.test(name);
    }

    function validateBirthDate(birthDate) {
        const today = new Date();
        const ageLimit = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        ageLimit.setFullYear(ageLimit.getFullYear() - 18);

        const bD = new Date(birthDate);

        if (bD <= ageLimit) {
            return 0;
        } else if (bD > today) {
            return 2;
        } else {
            return 1;
        }
    }

    // Alternar el estilo de la página
    const toggleStyleIcon = document.getElementById('toggleStyle');

    toggleStyleIcon.addEventListener('click', () => {
        document.body.classList.toggle('alternate-style');
    });
});