<template>
    <div class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr/>
                        <article>{{ bookable.description }}</article>
                    </div>
                    <div v-else>Loading...</div>
                </div>
            </div>
            <review-list :bookable-id="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-4 pb-4">
            <availability
                :bookable-id="this.$route.params.id"
                @availability="checkPrice($event)"
                class="mb-4"
            ></availability>

            <transition name="fade">
                <price-breakdown v-if="price" :price="price" class="mb-4"></price-breakdown>
            </transition>
            <transition name="fade">
                <button class="btn btn-outline-secondary btn-block" v-if="price">Book now</button>
            </transition>
        </div>
    </div>
</template>

<script>
    import Availability from './Availability';
    import ReviewList from './ReviewList';
    import PriceBreakdown from './PriceBreakdown';
    import {mapState} from 'vuex';

    export default {
        name: 'Bookable',
        components: {
            Availability,
            ReviewList,
            PriceBreakdown
        },
        data() {
            return {
                bookable: null,
                loading: false,
                price: null
            }
        },
        created() {
            this.loading = true;
            const bookableId = this.$route.params.id;
            axios.get(`/api/bookables/${bookableId}`)
                .then(response => {
                    this.bookable = response.data.data; // .data if don't use JsonResource::withoutWrapping();
                    this.loading = false;
                });
        },
        methods: {
            async checkPrice(hasAvailability) {
                if (!hasAvailability) {
                    this.price = null;
                    return;
                }

                const checkPriceUrl =
                    `/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`;

                try {
                    this.price = (await axios.get(checkPriceUrl)).data.data;
                } catch (error) {
                    this.price = null;
                }
            }
        },
        computed: mapState({
            lastSearch: 'lastSearch'
        })
    }
</script>
