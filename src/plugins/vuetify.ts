import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);



export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#79526C",
        test: "#333333"
      },
    },
    dark: true,
  },
  icons: {
    iconfont: 'md',
  }
});
