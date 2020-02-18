<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- V-bind is used to replace the mustache tag on HTML attributes, : is short for v-bind -->
        <v-text-field v-model="message" :label="message" append-icon="search" Buscar></v-text-field>
      </v-col>
      <!-- <p>Mensagem ao contrário: "{{ gifsGiphy[1].images }}"</p> -->
    </v-row>

    
      <v-layout row wrap class="pa-2">
        <!-- v-for interates in Gifs, defined inside data -->
        <v-flex xs4 v-for="(next, i) in gifsGiphy" :key="i">
          <img :height="250" :src="next.images.fixed_height_small.webp" alt />
          <!-- <button v-bind:disabled="isButtonDisabled">Botão</button> -->
        </v-flex>
      </v-layout>
    <scroll-loader :loader-method="getGifsFromGiphy" :loader-enable="loadMore">
    </scroll-loader>
  </v-container>
</template>

<script>
const axios = require("axios");


export default {
  name: "Giphy",
  data: () => ({
    message: "Hey you ",
    isButtonDisabled: true,
    gifsGiphy: [],
    loadMore: true,
    indexGifsGiphy:0
  }),
  watch:{
    loadMore(val){
      console.log(val);
    }
  },
  computed: {
    // uma função "getter" computada (computed getter)
    reversedMessage: function() {
      // `this` aponta para a instância Vue da variável `vm`
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  },
  mounted() {
    // let self = this; used to acess variable from global scope localy
  },

  methods: {
    getGifsFromGiphy() {
      console.log("CHEGUEI AQUI");
      axios
        .get(
          "http://api.giphy.com/v1/gifs/trending?api_key=NUyEXSEp3eCathE3E7ZLDyFbWE0Uf1nL&offset="+this.indexGifsGiphy
        )
        .then(response => {
          
          //this.gifsGiphy=response.data.data;
           this.gifsGiphy = [...this.gifsGiphy, ...response.data.data]
           this.indexGifsGiphy+=25;
          console.log("coe",this.gifsGiphy);
          
          
          
          response.data.length < this.pageSize && (this.loadMore = false)
 
        });
    }
  }
};


</script>

