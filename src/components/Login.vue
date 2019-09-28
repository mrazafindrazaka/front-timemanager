<template>
    <div id="login">
        <div class="center">
            <h2>Log in</h2>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="email"></label>
                    <input id="email" class="form-control" type="email" name="email" placeholder="email"
                           v-model="email" required/>
                </div>
                <div class="form-group">
                    <label for="password"></label>
                    <input id="password" class="form-control" type="password" name="password" placeholder="password"
                           v-model="password"
                           required/>
                </div>
                <div>
                    <input class="btn btn-primary" type="submit" value="LOG IN"/>
                </div>
            </form>
            <router-link class="btn btn-primary mb-3 mt-3" :to="{ name: 'register' }">REGISTER</router-link>
        </div>
    </div>
</template>

<script>
    import {AuthService} from "../services/AuthService";

    const url = "http://localhost:9090";
    const service = new AuthService(url);

    export default {
        name: "Login",
        methods: {
            login: function () {
                let data = {
                    "email": this.email,
                    "password": this.password
                };
                service.authLogin(data).then(response => {
/*                    localStorage.setItem('user', response.data.user);
                    localStorage.setItem('jwt', response.data.token); */
                    localStorage.setItem('user', JSON.stringify(response.data));
                    if (localStorage.getItem('user') !== null) {
                         window.location.href = '/dashboard';
                    }
                }).catch((error) => {
                    this.$swal(error.message);
                });
            }
        },
        data() {
            return {
                email: "",
                password: ""
            };
        }
    }
</script>

<style scoped>
    #login {
        position: relative;
    }
    .center {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
    }
</style>
