const VueBlock = {
    template: '' +
    '<div class="block-wrapper">' +
    '   <div class="block" v-bind:class="blockClass"></div>' +
    '</div>',
    props: {
        blockClass: {
            type: String,
            default: ''
        }
    }
};

var VueRoot = new Vue({
    el: '#vue-components',
    components: {
        vueblock: VueBlock
    },
    data: function () {
        return {}
    },
    methods: {}
});
