<template>
    <div class="pdf-toolbar">
        <ul class="pdf-toolbar__contents">
            <li @click="prevPage" class="pdf-toolbar__item pdf-toolbar__icon fa fa-fw fa-2x fa-arrow-left"></li>
            <li class="pdf-toolbar__item">
                <p class="pager">
                    <input type="text" ref="pager" @keyup.enter="jump" class="pager__textbox" :value=page> / {{lastPage}}
                </p>
            </li>
            <li @click="nextPage" class="pdf-toolbar__item  pdf-toolbar__icon fa fa-fw fa-2x fa-arrow-right"></li>
        </ul>
    </div>
</template>

<script>
import {INCREMENT, DECREMENT, JUMP} from '../store/mutation-types.js';

export default {
    props: ['page', 'lastPage'],
    methods: {
        nextPage () {
            this.$store.dispatch(INCREMENT);
        },
        prevPage () {
            this.$store.dispatch(DECREMENT);
        },
        jump () {
            this.$store.dispatch(JUMP, this.$refs.pager.value);
        },
    },
};
</script>
