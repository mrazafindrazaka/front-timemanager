<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <!--button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button-->
        <span class="navbar-brand">GothamProject</span>
        <!--div class="collapse navbar-collapse" id="navbarNav"-->
        <ul class="navbar-nav ml-auto" v-if="logged">
            <li class="nav-item" v-if="user.roles[0].role === 'GeneraManager'">
                <router-link to="/userlist" class="btn nav-link">List user</router-link>
            </li>
            <li class="nav-item">
                <button v-on:click="disconnect" class="btn nav-link">Log out</button>
            </li>
        </ul>
        <!--/div-->
    </nav>
</template>

<script>
    import {ClockService} from "../services/ClockService";

    const url = "https://gotham.casamonk.top:9090";
    const clock = new ClockService(url);

    export default {
        name: "Header",
        methods: {
            disconnect: function () {
                this.$swal({
                    title: "Are you sure, you want to disconnect ?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result.value === true) {
                        let user = JSON.parse(localStorage.getItem('user'));

                        clock.clockOut(user.id).then(() => {
                            // eslint-disable-next-line no-console
                            console.log('clock out success');
                        }).catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error.message);
                        });
                        localStorage.removeItem('user');
                       // window.location.href = "/login";
                    }
                });
            }
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user')),
                logged: localStorage.getItem('user') !== null
            }
        }
    }
</script>

<style scoped>

</style>
