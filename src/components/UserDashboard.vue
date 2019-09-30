<template>
    <div id="useredit">
        <div class="row">
            <div class="col-lg-6 mb-4">
                <h2 v-if="user">{{ user.firstName + " " + user.lastName }}</h2>
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
                        <input id="password" class="form-control" type="password" name="password" placeholder="password" v-model="password"
                               required/>
                    </div>
                    <div class="form-group">
                        <label for="role"></label>
                        <select id="role" class="form-control" v-model="role_selected" name="role" disabled required>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="GeneralManager">General Manager</option>
                        </select>
                    </div>
                    <div>
                        <input class="btn btn-primary" type="submit" value="SAVE"/>
                    </div>
                </form>
            </div>
            <div class="col-lg-6">
                <apexchart type=pie :options="chartOptionsCircle" :series="seriesCircle"/>
            </div>
            <div class="col-lg-12">
                <apexchart type=bar height=350 :options="chartOptions" :series="series"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {UserService} from "../services/UserService";

    const host = "http://gotham.casamonk.top:9090";
    const user_service = new UserService(host);

    export default {
        name: "UserEdit",
        methods: {
            back_list: function () {
                this.$router.push({name: 'userlist'});
            },
            // eslint-disable-next-line no-unused-vars
            time_manager: function (id) {

            },
            get_user: function (id) {
                user_service.getUser(id).then(response => {
                    this.user = response.data;
                    if (this.user) {
                        this.first_name = this.user.firstName;
                        this.last_name = this.user.lastName;
                        this.email = this.user.email;
                        this.role_selected = this.user.roles[0].role;
                        this.password = this.user.password;
                    }
                }).catch((error) => {
                    this.$swal(error.message);
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
                    this.get_user(id);
                });
            }
        },
        data() {
            return {
                connected: null,
                user: null,
                first_name: null,
                last_name: null,
                email: null,
                role_selected: null,
                password: null,
                seriesCircle: [40, 60],
                chartOptionsCircle: {
                    colors: ['#008000', '#DCDCDC'],
                    labels: ['Time active', 'Time off'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
                series: [{
                    name: 'Time',
                    data: [8, 8, 4, 2, 2, 2, 2]
                }],
                chartOptions: {
                    colors: ['#008000'],
                    chart: {
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '20%',
                            endingShape: 'rounded',
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
                    },
                    yaxis: {
                        title: {
                            text: 'Time active (in Hours)'
                        }
                    },
                    fill: {
                        opacity: 1

                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + " Hours"
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.connected = JSON.parse(localStorage.getItem('user'));

            if (this.$route.params.id)
                this.get_user(this.$route.params.id);
            else {
                this.user = this.connected;
                if (this.user) {
                    this.first_name = this.user.firstName;
                    this.last_name = this.user.lastName;
                    this.email = this.user.email;
                    this.role_selected = this.user.roles[0].role;
                    this.password = this.user.password;
                }
            }
        }
    }
</script>

<style scoped>

</style>
