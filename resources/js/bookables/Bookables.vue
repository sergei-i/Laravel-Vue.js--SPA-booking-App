<template>
    <div>
        <div class="row mb-4" v-for="row in rows" :key="'row' + row">
            <div
                class="col"
                v-for="(bookable, column) in bookablesInRow(row)"
                :key="'row' + row + column"
            >
                <bookable-list-item
                    :key="bookable.index"
                    :title="bookable.title"
                    :content="bookable.content"
                ></bookable-list-item>
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
                bookables: [
                    {title: 'Cheap villa', content: 'A very cheap villa'},
                    {title: 'Cheap villa 2', content: 'A very cheap villa 2'},
                    {title: 'Cheap villa 3', content: 'A very cheap villa 3'},
                    {title: 'Cheap villa 4', content: 'A very cheap villa 4'},
                    {title: 'Cheap villa 5', content: 'A very cheap villa 5'},
                    {title: 'Cheap villa 6', content: 'A very cheap villa 6'},
                    {title: 'Cheap villa 7', content: 'A very cheap villa 7'},
                ],
                columns: 3
            }
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
