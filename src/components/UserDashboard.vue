<template>
    <div id="useredit">
        <button v-if="connected.id_role === 1" v-on:click="back_list" class="btn btn-primary mb-3">USER LIST</button>
        <div class="row">
            <div class="col-lg-6 mb-4">
                <h2 v-if="user">{{ user.first_name + " " + user.last_name }}</h2>
                <form v-if="user" @submit.prevent="edit_user(user.id)">
                    <div class="form-group">
                        <label for="first_name"></label>
                        <input id="first_name" class="form-control" type="text" name="first_name"
                               :placeholder=user.first_name
                               v-model="first_name" required/>
                    </div>
                    <div class="form-group">
                        <label for="last_name"></label>
                        <input id="last_name" class="form-control" type="text" name="last_name"
                               :placeholder=user.last_name
                               v-model="last_name"
                               required/>
                    </div>
                    <div class="form-group">
                        <label for="id_team"></label>
                        <select v-if="connected.id_role !== 1" id="id_team" class="form-control" v-model="team_selected" name="id_team" required
                                disabled>
                            <option v-for="(team, id_team) in teams" v-bind:value="team.id" :key="id_team">
                                {{ team.team_name }}
                            </option>
                        </select>
                        <select v-else id="id_team" class="form-control" v-model="team_selected" name="id_team" required>
                            <option v-for="(team, id_team) in teams" v-bind:value="team.id" :key="id_team">
                                {{ team.team_name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="id_role"></label>
                        <select v-if="connected.id_role !== 1" id="id_role" class="form-control" v-model="role_selected" name="id_role" required
                                disabled>
                            <option v-for="(role, id_role) in roles" v-bind:value="role.id" :key="id_role">
                                {{ role.role }}
                            </option>
                        </select>
                        <select v-else id="id_role" class="form-control" v-model="role_selected" name="id_role" required>
                            <option v-for="(role, id_role) in roles" v-bind:value="role.id" :key="id_role">
                                {{ role.role }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="email"></label>
                        <input id="email" class="form-control" type="email" name="email" :placeholder=user.email
                               v-model="email"
                               required/>
                    </div>
                    <div>
                        <input class="btn btn-primary" type="submit" value="SAVE"/>
                    </div>
                </form>
            </div>
            <div class="col-lg-6">
                <apexchart type=pie :options="chartOptionsCircle" :series="seriesCircle" />
            </div>
            <div class="col-lg-12">
                <apexchart type=bar height=350 :options="chartOptions" :series="series" />
            </div>
        </div>
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
        name: "UserEdit",
        methods: {
            back_list: function() {
                this.$router.push({name: 'userlist'});
            },
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
            get_connected_user: function (id) {
                user_service.getUser(id).then(response => {
                    if (response.status === 200) {
                        this.connected = response.data;
                    }
                })
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
                connected: this.connected,
                user: this.user,
                teams: this.teams,
                roles: this.roles,
                first_name: this.first_name,
                last_name: this.last_name,
                team_selected: this.team_selected,
                role_selected: this.role_selected,
                email: this.email,
                seriesCircle: [40, 60],
                chartOptionsCircle: {
                    colors:['#008000','#DCDCDC'],
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
                series: [ {
                    name: 'Time',
                    data: [8, 8, 4, 2, 2, 2, 2]
                }],
                chartOptions: {
                    colors:['#008000'],
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
            const user = JSON.parse(localStorage.getItem('user'));

            if (this.$route.params.id)
                this.get_user(this.$route.params.id);
            else {
                this.get_user(user.id);
            }
            this.get_connected_user(user.id);
            this.get_teams();
            this.get_roles();
        }
    }
</script>

<style scoped>

</style>
