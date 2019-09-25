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
        </div>
    </div>
</template>

<script>
    import {AuthService} from "../services/AuthService";

    const url = "http://localhost:3000";
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
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('jwt', response.data.token);
                    if (localStorage.getItem('jwt') !== null) {
                         window.location.href = '/dashboard';
                    }
                }).catch((error) => {
                    this.$swal(error.response.data);
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
