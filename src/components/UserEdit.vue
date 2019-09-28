<template>
    <div id="useredit">
        <h2>Edit User</h2>
        <form v-if="user" @submit.prevent="edit_user(user.id)">
            <div class="form-group">
                <label for="first_name"></label>
                <input id="first_name" class="form-control" type="text" name="first_name" :placeholder=user.firstName
                       v-model="first_name" required/>
            </div>
            <div class="form-group">
                <label for="last_name"></label>
                <input id="last_name" class="form-control" type="text" name="last_name" :placeholder=user.lastName
                       v-model="last_name"
                       required/>
            </div>
            <div class="form-group">
                <label for="email"></label>
                <input id="email" class="form-control" type="email" name="email" :placeholder=user.email v-model="email"
                       required/>
            </div>
            <div class="form-group">
                <label for="password"></label>
                <input id="password" class="form-control" type="password" name="password" :placeholder=user.password v-model="password"
                       required/>
            </div>
            <div class="form-group">
                <label for="role"></label>
                <select id="role" class="form-control" v-model="role_selected" name="role" required>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="GeneraManager">General Manager</option>
                </select>
            </div>
            <div>
                <input class="btn btn-primary" type="submit" value="SAVE"/>
            </div>
        </form>
    </div>
</template>

<script>
    import {UserService} from "../services/UserService";

    const host = "http://localhost:9090";
    const user_service = new UserService(host);


    export default {
        name: "UserEdit",
        methods: {
            get_user: function (id) {
                user_service.getUser(id).then(response => {
                    this.user = response.data;
                    if (this.user) {
                        this.first_name = this.user.firstName;
                        this.last_name = this.user.lastName;
                        this.role_selected = this.user.roles[0].role;
                        this.email = this.user.email;
                        this.password = this.user.password;
                    }
                })
            },
            edit_user: function (id) {
                let data = new FormData();

                data.set('last_name', this.last_name);
                data.set('first_name', this.first_name);
                data.set('role', this.role_selected);
                data.set('email', this.email);
                data.set('password', this.password);
                // eslint-disable-next-line no-unused-vars
                user_service.editUser(id, data).then(response => {
                        this.$swal("User modified with success");
                        this.get_user(this.$route.params.id);
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
                role_selected: this.role_selected,
                email: this.email,
                password: this.password
            }
        },
        mounted() {
            if (this.$route.params.id)
                this.get_user(this.$route.params.id);
            else {
                const user = localStorage.getItem('user');
                this.get_user(user.id);
            }
        }
    }
</script>

<style scoped>

</style>
