<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-white border-bottom navbar-light">

            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Home</router-link>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'basket'}">
                        Basket
                        <span v-if="itemsInBasket" class="badge badge-secondary">{{ itemsInBasket }}</span>
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link class="nav-link" :to="{name: 'register'}">
                        Register
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link class="nav-link" :to="{name: 'login'}">
                        Sign-in
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                </li>
            </ul>

        </nav>
        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: 'Index',
        computed: {
            ...mapState({
                isLoggedIn: 'isLoggedIn'
            }),
            ...mapGetters({
                itemsInBasket: 'itemsInBasket'
            })
        },
        methods: {
            async logout() {
                try {
                    axios.post('logout');
                    await this.$store.dispatch('logout')
                } catch (error) {
                    await this.$store.dispatch('logout')
                }
            }
        }
    }
</script>
