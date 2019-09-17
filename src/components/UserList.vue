<template>
    <div id="userlist">
        <h2>List User</h2>
        <div class="row-center-border-div">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Team</th>
                            <th>Email</th>
                            <th colspan="2">Actions</th>
                        </tr>
                        </thead>
                        <tbody v-if="users">
                        <tr v-for="(user, id_user) in users" :key="id_user">
                            <td>{{ user.first_name }}</td>
                            <td>{{ user.last_name }}</td>
                            <td>{{ get_role_name(user.id_role) }}</td>
                            <td>{{ get_team_name(user.id_team) }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <router-link class="btn btn-primary" :to="{ name: 'useredit', params: { id: user.id }}">
                                    EDIT
                                </router-link>
                            </td>
                            <td>
                                <button class="btn btn-danger" v-on:click="delete_user(user.id)">DELETE</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
            delete_user: function (id) {
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
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

</style>
