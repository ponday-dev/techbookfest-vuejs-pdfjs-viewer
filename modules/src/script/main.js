'use strict';
import Vue from 'vue';
import store from './store/store.js';
import PdfViewer from './components/PdfViewer.vue';

window.addEventListener('DOMContentLoaded', () => {
    const app = new Vue({
        el: '#app',
        store,
        components: {
            'pdf-viewer': PdfViewer
        },
    });
});
