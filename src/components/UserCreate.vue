<template>
    <div id="usercreate">
        <h2>Create User</h2>
        <button @click="$router.go(-1)" class="btn btn-primary">BACK TO USER LIST</button>
        <form @submit.prevent="create_user">
            <div class="form-group">
                <label for="first_name"></label>
                <input id="first_name" class="form-control" type="text" name="first_name" placeholder="first_name"
                       v-model="first_name" required/>
            </div>
            <div class="form-group">
                <label for="last_name"></label>
                <input id="last_name" class="form-control" type="text" name="last_name" placeholder="last_name"
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
                <input id="email" class="form-control" type="email" name="email" placeholder="email" v-model="email"
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
        name: "UserCreate",
        methods: {
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
            create_user: function () {
                let data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    id_team: this.team_selected,
                    id_role: this.role_selected,
                    email: this.email
                };
                user_service.createUser(data).then(response => {
                    if (response.status === 201) {
                        this.$swal("User created with success");
                        this.first_name = null;
                        this.last_name = null;
                        this.team_selected = 1;
                        this.role_selected = 3;
                        this.email = null;
                    }
                });
            }
        },
        data() {
            return {
                teams: this.teams,
                roles: this.roles,
                first_name: null,
                last_name: null,
                team_selected: 1,
                role_selected: 3,
                email: null
            }
        },
        mounted() {
            this.get_teams();
            this.get_roles();
        }
    }
</script>

<style scoped>

</style>
