// auth.js - Módulo de Autenticación de Usuarios Corregido y Sincronizado
const auth = {
    users: JSON.parse(localStorage.getItem('users')) || {},
    currentUser: null,

    init() {
        this.loadCurrentUser();
        document.getElementById('login-form').addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('register-form').addEventListener('submit', this.handleRegister.bind(this));
        this.updateNavigation();
    },

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    },

    loadCurrentUser() {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId && this.users[currentUserId]) {
            this.currentUser = this.users[currentUserId];
        }
    },

    setCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUserId', user.id);
        this.updateNavigation();
    },

    clearCurrentUser() {
        this.currentUser = null;
        localStorage.removeItem('currentUserId');
        this.updateNavigation();
    },

    handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorMessage = document.getElementById('login-error');
        errorMessage.textContent = '';

        const user = Object.values(this.users).find(u => u.username === username && u.password === password);

        if (user) {
            this.setCurrentUser(user);
            errorMessage.textContent = '';
            alert('¡Inicio de sesión exitoso!');
            this.redirectAfterAuth();
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos.';
        }
    },

    handleRegister(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const errorMessage = document.getElementById('register-error');
        errorMessage.textContent = '';

        if (Object.values(this.users).some(u => u.username === username)) {
            errorMessage.textContent = 'El nombre de usuario ya existe.';
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        const newUser = {
            id: Date.now().toString(),
            username: username,
            password: password,
            progress: {},
            nutrition: {
                calorieGoal: 2000
            }
        };
        
        newUser.nutrition[today] = { consumedFoods: [], totalCalories: 0 };

        this.users[newUser.id] = newUser;
        this.saveUsers();
        this.setCurrentUser(newUser);
        alert('¡Registro exitoso e inicio de sesión automático!');
        this.redirectAfterAuth();
    },

    updateNavigation() {
        const isLoggedIn = this.currentUser !== null;
        
        // Elementos base existentes en index_2.html
        if (document.getElementById('nav-auth')) document.getElementById('nav-auth').style.display = isLoggedIn ? 'none' : 'block';
        if (document.getElementById('nav-training')) document.getElementById('nav-training').style.display = isLoggedIn ? 'block' : 'none';
        if (document.getElementById('nav-perfil')) document.getElementById('nav-perfil').style.display = isLoggedIn ? 'block' : 'none';
        if (document.getElementById('nav-logout')) document.getElementById('nav-logout').style.display = isLoggedIn ? 'block' : 'none';
        
        // Sincronización con el nuevo botón unificado del Plan Nutricional
        const navPlan = document.getElementById('nav-planificador');
        if (navPlan) {
            navPlan.style.display = isLoggedIn ? 'block' : 'none';
        }

        // Mostrar el nombre de usuario de forma segura si existe el contenedor en pantalla
        if (isLoggedIn) {
            const displayTrain = document.getElementById('username-display');
            if (displayTrain) displayTrain.textContent = this.currentUser.username;
            
            const displayNut = document.getElementById('nutrition-username-display');
            if (displayNut) displayNut.textContent = this.currentUser.username;
        }
    },

    redirectAfterAuth() {
        // Dejamos que app.js maneje la redirección centralizada
    }
};

document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});