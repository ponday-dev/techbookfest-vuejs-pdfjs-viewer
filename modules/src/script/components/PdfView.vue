<template>
    <div class="pdf-view">
        <div class="pdf-container" ref="container">
            <canvas class="pdf" ref="view" :data-loaded=loaded :data-page=page></canvas>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
   props: ['pdf', 'page'],
    computed: {
        loaded () {
            return this.pdf !== null;
        }
    },
    mounted () {
        let container = this.$refs.container;
        this.height = container.clientHeight;
        this.width = container.clientWidth;
    },
    updated () {
        if (this.pdf) {
            this.pdf.getPage(this.page)
                .then((page) => {
                    let pageHeight = page.view[3] - page.view[1];
                    let pageWidth = page.view[2] - page.view[0];
                    let scaleX = this.height / pageHeight;
                    let scaleY = this.width / pageWidth;
                    let scale = scaleX <= scaleY ? scaleX : scaleY;

                    let viewport = page.getViewport(scale);
                    let canvas = this.$refs.view;
                    let context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    page.render({
                        canvasContext: context,
                        viewport: viewport
                    });
                });
        }
    },
    data () {
        return {
            height: 0,
            width: 0,
        };
    }
};
</script>
