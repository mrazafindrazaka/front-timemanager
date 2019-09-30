<template>
    <div id="userlist">
        <h2 class="mb-4">List User</h2>
        <router-link class="btn btn-primary mb-3" :to="{ name: 'usercreate' }">NEW USER</router-link>
        <div v-if="users" class="row">
            <div v-for="(user, id_user) in users" :key="id_user" class="col-lg-4 mb-5 text-center">
                <div class="card" v-if="user.hidden === false">
                    <div class="card-body" v-on:click="go_dashboard(user.id)">
                        <h5 class="card-title">{{ user.firstName + " " + user.lastName }}</h5>
                    </div>
                    <ul class="list-group list-group-flush" v-on:click="go_dashboard(user.id)">
                        <li class="list-group-item">{{ user.email }}</li>
                        <li class="list-group-item">{{ user.roles[0].role }}</li>
                    </ul>
                    <div class="card-body d-flex justify-content-between" v-on:click.self="go_dashboard(user.id)">
                        <router-link class="btn btn-primary" :to="{ name: 'useredit', params: { id: user.id }}">
                            EDIT
                        </router-link>
                        <button class="btn btn-danger"
                                v-on:click="delete_user(user.id, user.firstName, user.lastName)">
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {UserService} from "../services/UserService";

    const host = "http://gotham.casamonk.top:9090";
    const users_service = new UserService(host);

    export default {
        name: "UserList",
        methods: {
            go_dashboard: function (id) {
                this.$router.push({name: 'userdashboard', params: {id: id}});
            },
            get_users: function () {
                users_service.getAllUsers().then(response => {
                    this.users = response.data;
                }).catch((error) => {
                    this.$swal(error.message);
                });
            },
            delete_user: function (id, first_name, last_name) {
                this.$swal({
                    title: "Are you sure to delete " + first_name + " " + last_name,
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes, please !",
                    cancelButtonText: "No!"
                }).then((result) => {
                    if (result.value === true) {
                        // eslint-disable-next-line no-unused-vars
                        users_service.deleteUser(id).then(response => {
                            this.$swal("User deleted with success");
                            this.get_users();
                        }).catch((error) => {
                            this.$swal(error.message);
                        })
                    }
                });
            }
        },
        data() {
            return {
                users: this.users
            }
        },
        mounted() {
            this.get_users();
        }
    }
</script>

<style scoped>
    .card:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
        cursor: pointer;
    }
</style>
