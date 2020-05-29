<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ content }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BookableListItem',
        props: {
            'title': String,
            'content': String,
            'price': Number
        }
    }
</script>
