<template>
    <div class="pdf-viewer">
        <pdf-toolbar :page=page :lastPage=lastPage></pdf-toolbar>
        <pdf-view :pdf=pdf :page=page></pdf-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PdfViewToolbar from './PdfViewToolbar.vue';
import PdfView from './PdfView.vue';
import { LOAD } from '../store/mutation-types.js';

export default {
    props: ['uri', 'worker', 'cmaps'],
    components: {
        'pdf-toolbar': PdfViewToolbar,
        'pdf-view': PdfView,
    },
    computed: mapState([
        'pdf',
        'page',
        'lastPage',
    ]),
    mounted () {
        this.$store.dispatch(LOAD, {
            uri: this.uri,
            worker: this.worker,
            cmaps: this.cmaps
        });
    }
};
</script>
