'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import { PDFJS } from 'pdfjs-dist';
import { LOAD, JUMP, INCREMENT, DECREMENT } from './mutation-types.js';

Vue.use(Vuex);

const state = {
    page: 1,
    lastPage: 1,
    pdf: null,
};

const getters = {};

const actions = {
    [LOAD] (context, params) {
        PDFJS.cMapUrl = params.cmaps;
        PDFJS.cMapPacked = true;
        PDFJS.workerSrc = params.worker;
        PDFJS.getDocument(params.uri)
            .then((pdf) => {
                context.commit(LOAD, pdf);
            });
    },
    [JUMP] (context, page) {
        context.commit(JUMP, page);
    },
    [INCREMENT] (context, amount=1) {
        context.commit(INCREMENT, amount);
    },
    [DECREMENT] (context, amount=1) {
        context.commit(DECREMENT, amount);
    },
};

const mutations = {
    [LOAD] (state, pdf) {
        if (pdf && pdf.pdfInfo) {
            state.pdf = pdf;
            state.lastPage = pdf.pdfInfo.numPages;
        }
    },
    [JUMP] (state, page) {
        page = parseInt(page)
        if (1 <= page && page <= state.lastPage) {
            state.page = page;
        }
    },
    [INCREMENT] (state, amount) {
        if (state.page + amount <= state.lastPage) {
            state.page += amount;
        } else {
            state.page = state.lastPage;
        }
    },
    [DECREMENT] (state, amount) {
        if (state.page - amount >= 1) {
            state.page -= amount;
        } else {
            state.page = 1;
        }
    },
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
export default store;
