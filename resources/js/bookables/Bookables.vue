<template>
    <div>
        <div v-if="loading">
            <p>Data is loading...</p>
        </div>
        <div v-else class="row mb-4" v-for="row in rows" :key="'row' + row">
            <div
                class="col d-flex align-items-stretch"
                v-for="(bookable, column) in bookablesInRow(row)"
                :key="'row' + row + column"
            >
                <bookable-list-item v-bind="bookable"></bookable-list-item>
            </div>
            <div
                class="col"
                v-for="p in placeholdersInRow(row)"
                :key="'placeholder' + row + p"
            ></div>
        </div>
    </div>
</template>

<script>
    import BookableListItem from './BookableListItem';

    export default {
        name: 'Bookables',
        components: {
            BookableListItem
        },
        data() {
            return {
                bookables: null,
                loading: true,
                columns: 3
            }
        },
        created() {
            const request = axios
                .get('/api/bookables')
                .then(response => {
                    this.bookables = response.data;
                    this.loading = false;
                })
        },
        computed: {
            rows() {
                return this.bookables
                    ? Math.ceil(this.bookables.length / this.columns)
                    : 0
            }
        },
        methods: {
            bookablesInRow(row) {
                return this.bookables.slice((row - 1) * this.columns, row * this.columns)
            },
            placeholdersInRow(row) {
                return this.columns - this.bookablesInRow(row).length
            }
        }
    }
</script>
