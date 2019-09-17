<template>
    <div id="userlist">
        <h2>Edit User</h2>
        <button @click="$router.go(-1)" class="btn btn-primary">BACK TO USER LIST</button>
        <form v-if="user" @submit.prevent="edit_user(user.id)">
            <div class="form-group">
                <label for="first_name"></label>
                <input id="first_name" class="form-control" type="text" name="first_name" :placeholder=user.first_name
                       v-model="first_name" required/>
            </div>
            <div class="form-group">
                <label for="last_name"></label>
                <input id="last_name" class="form-control" type="text" name="last_name" :placeholder=user.last_name
                       v-model="last_name"
                       required/>
            </div>
            <div class="form-group">
                <label for="id_team"></label>
                <select id="id_team" class="form-control" v-model="team_selected" name="id_team" required>
                    <option v-for="(team, id_team) in teams" v-bind:value="team.id" :key="id_team">
                        {{ team.team_name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="id_role"></label>
                <select id="id_role" class="form-control" v-model="role_selected" name="id_role" required>
                    <option v-for="(role, id_role) in roles" v-bind:value="role.id" :key="id_role">
                        {{ role.role }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="email"></label>
                <input id="email" class="form-control" type="email" name="email" :placeholder=user.email v-model="email"
                       required/>
            </div>
            <div>
                <input class="btn btn-primary" type="submit" value="SAVE"/>
            </div>
        </form>
    </div>
</template>

<script>
    import {UserService} from "../services/UserService";
    import {TeamService} from "../services/TeamService";
    import {RoleService} from "../services/RoleService";

    const host = "http://localhost:3000";
    const user_service = new UserService(host);
    const teams_service = new TeamService(host);
    const roles_service = new RoleService(host);


    export default {
        name: "UserList",
        methods: {
            get_user: function (id) {
                user_service.getUser(id).then(response => {
                    if (response.status === 200) {
                        this.user = response.data;
                        if (this.user) {
                            this.first_name = this.user.first_name;
                            this.last_name = this.user.last_name;
                            this.team_selected = this.user.id_team;
                            this.role_selected = this.user.id_role;
                            this.email = this.user.email;
                        }
                    }
                })
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
            edit_user: function (id) {
                let data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    id_team: this.team_selected,
                    id_role: this.role_selected,
                    email: this.email
                };
                user_service.editUser(id, data).then(response => {
                    if (response.status === 200) {
                        this.$swal("User modified with success");
                        this.get_user(this.$route.params.id);
                    }
                });
            }
        },
        data() {
            return {
                user: this.user,
                teams: this.teams,
                roles: this.roles,
                first_name: this.first_name,
                last_name: this.last_name,
                team_selected: this.team_selected,
                role_selected: this.role_selected,
                email: this.email
            }
        },
        mounted() {
            this.get_user(this.$route.params.id);
            this.get_teams();
            this.get_roles();
        }
    }
</script>

<style scoped>

</style>
