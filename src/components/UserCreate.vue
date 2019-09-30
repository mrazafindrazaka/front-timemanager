<template>
    <div id="usercreate">
        <h2>Create User</h2>
        <form @submit.prevent="create_user">
            <div class="form-group">
                <label for="last_name"></label>
                <input id="last_name" class="form-control" type="text" name="last_name" placeholder="last_name"
                       v-model="last_name"
                       required/>
            </div>
            <div class="form-group">
                <label for="first_name"></label>
                <input id="first_name" class="form-control" type="text" name="first_name" placeholder="first_name"
                       v-model="first_name" required/>
            </div>
            <div class="form-group">
                <label for="email"></label>
                <input id="email" class="form-control" type="email" name="email" placeholder="email" v-model="email"
                       required/>
            </div>
            <div class="form-group">
                <label for="id_role"></label>
                <select id="id_role" class="form-control" v-model="role_selected" name="id_role" required>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="GeneraManager">General Manager</option>
                </select>
            </div>
            <div class="form-group">
                <label for="password"></label>
                <input id="password" class="form-control" type="password" name="password" placeholder="password"
                       v-model="password"
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

    const host = "http://gotham.casamonk.top:9090";
    const user_service = new UserService(host);

    export default {
        name: "UserCreate",
        methods: {
            create_user: function () {
                let data = new FormData();

                data.set('last_name', this.last_name);
                data.set('first_name', this.first_name);
                data.set('role', this.role_selected);
                data.set('email', this.email);
                data.set('password', this.password);
                // eslint-disable-next-line no-unused-vars
                user_service.createUser(data).then(response => {
                    this.$swal("User created with success");
                    this.first_name = null;
                    this.last_name = null;
                    this.role_selected = "Employee";
                    this.email = null;
                    this.password = null;
                }).catch((error) => {
                    this.$swal(error.message);
                });
            }
        },
        data() {
            return {
                first_name: null,
                last_name: null,
                role_selected: "Employee",
                password: null,
                email: null
            }
        }
    }
</script>

<style scoped>

</style>
