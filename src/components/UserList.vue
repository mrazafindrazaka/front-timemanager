<template>
    <div id="userlist">
        <h2 class="mb-4">List User</h2>
        <router-link class="btn btn-primary mb-3" :to="{ name: 'usercreate' }">NEW USER</router-link>
        <div v-if="users" class="row">
            <div v-for="(user, id_user) in users" :key="id_user" class="col-lg-4 mb-5 text-center">
                <div class="card">
                    <div class="card-body" v-on:click="go_dashboard(user.id)">
                        <h5 class="card-title">{{ user.first_name + " " + user.last_name }}</h5>
                    </div>
                    <ul class="list-group list-group-flush" v-on:click="go_dashboard(user.id)">
                        <li class="list-group-item">{{ user.email }}</li>
                        <li class="list-group-item">{{ get_role_name(user.id_role) }}</li>
                        <li class="list-group-item">{{ get_team_name(user.id_team) }}</li>
                    </ul>
                    <div class="card-body d-flex justify-content-between" v-on:click.self="go_dashboard(user.id)">
                        <router-link class="btn btn-primary" :to="{ name: 'useredit', params: { id: user.id }}">
                            EDIT
                        </router-link>
                        <button class="btn btn-danger" v-on:click="delete_user(user.id, user.first_name, user.last_name)">
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
    import {TeamService} from "../services/TeamService";
    import {RoleService} from "../services/RoleService";

    const host = "http://localhost:3000";
    const users_service = new UserService(host);
    const teams_service = new TeamService(host);
    const roles_service = new RoleService(host);

    export default {
        name: "UserList",
        methods: {
            go_dashboard: function (id) {
                this.$router.push({name: 'userdashboard', params: {id: id}});
            },
            get_team_name: function (id_team) {
                let team = null;

                if (this.teams) {
                    this.teams.forEach(e => {
                        if (e.id === id_team)
                            team = e.team_name;
                    })
                }
                return team;
            },
            get_role_name: function (id_role) {
                let role = null;

                if (this.roles) {
                    this.roles.forEach(e => {
                        if (e.id === id_role)
                            role = e.role;
                    })
                }
                return role;
            },
            get_teams: function () {
                teams_service.getAllTeams().then(response => {
                    if (response.status === 200) {
                        this.teams = response.data;
                    } else {
                        this.teams = null;
                    }
                });
            },
            get_roles: function () {
                roles_service.getAllRoles().then(response => {
                    if (response.status === 200) {
                        this.roles = response.data;
                    } else {
                        this.roles = null;
                    }
                });
            },
            get_users: function () {
                users_service.getAllUsers().then(response => {
                    if (response.status === 200) {
                        this.users = response.data;
                    } else {
                        this.users = null;
                    }
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
                        users_service.deleteUser(id).then(response => {
                            if (response.status === 200) {
                                this.$swal("User deleted with success");
                                this.get_users();
                            }
                        })
                    }
                });
            }
        },
        data() {
            return {
                users: this.users,
                teams: this.teams,
                roles: this.roles
            }
        },
        mounted() {
            this.get_users();
            this.get_teams();
            this.get_roles();
        }
    }
</script>

<style scoped>
    .card:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
        cursor: pointer;
    }
</style>
