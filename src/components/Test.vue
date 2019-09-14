<template>
    <div id="test">
        <div class="separate">
            <form @submit.prevent="add_test">
                <label>
                    <input type="text" name="firstname" placeholder="firstname" v-model="newfirstname" required/>
                </label>
                <label>
                    <input type="text" name="lastname" placeholder="lastname" v-model="newlastname" required/>
                </label>
                <input type="submit" value="add"/>
            </form>
        </div>
        <div class="separate" v-if="api_data">
            <div v-for="(data, id_data) in api_data" :key="id_data">
                <div>
                    {{ data.firstname }} - {{ data.lastname }}
                    <button v-on:click="delete_test(data.id)">delete</button>
                </div>
                <div>
                    <form @submit.prevent="edit_test(data.id)">
                        <label>
                            <input type="text" name="firstname" :placeholder=data.firstname v-model="firstname[data.id]" required/>
                        </label>
                        <label>
                            <input type="text" name="lastname" :placeholder=data.lastname v-model="lastname[data.id]" required/>
                        </label>
                        <input type="submit" value="edit"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {TestService} from "../services/TestService";

    const host = "http://localhost:3000";
    const service = new TestService(host);

    export default {
        name: "Test",
        methods: {
            add_test: function () {
                let data = {
                    firstname: this.newfirstname,
                    lastname: this.newlastname
                };
                service.addTest(data).then(response => {
                    if (response.status === 201) {
                        this.get_test();
                    }
                });
            },
            edit_test: function (id) {
                let data = {
                    firstname: this.firstname[id],
                    lastname: this.lastname[id]
                };
                service.editTest(id, data).then(response => {
                    if (response.status === 200) {
                        this.get_test();
                    }
                });
            },
            get_test: function () {
                service.getAllTests().then(response => {
                    if (response.status === 200) {
                        this.api_data = response.data;
                    } else {
                        this.api_data = null;
                    }
                });
            },
            delete_test: function (id) {
                service.deleteTest(id).then(response => {
                    if (response.status === 200) {
                        this.get_test();
                    }
                });
            }
        },
        data() {
            return {
                api_data: this.api_data,
                newfirstname: null,
                newlastname: null,
                firstname: [],
                lastname: []
            }
        },
        mounted() {
            this.get_test();
        }
    }
</script>

<style scoped>
    .separate {
        margin-bottom: 100px;
    }
</style>
