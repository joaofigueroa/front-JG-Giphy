<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- V-bind is used to replace the mustache tag on HTML attributes, : is short for v-bind -->
        <v-text-field
          v-model="search"
          :label="search"
          @keydown="getGifsFromGiphy"
          append-icon="search"
          Buscar
        ></v-text-field>
      <v-btn @click.stop="clearSearch()" >
        <v-icon>mdi-close</v-icon>
        Clear Search 
      </v-btn>  
      </v-col>
    </v-row>

    <v-container fluid>
      <v-row dense>

        <!-- v-for interates in Gifs, defined inside data
        :cols="Math.ceil((next.images.fixed_height_small.width/100)+2)"-->

        <v-col v-for="(next,i) in gifsGiphy" :key="i" :cols="4">
          <v-card :elevation="15">
            <v-img
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :height="270"
              v-cloak
              :src="next.images.fixed_height_small.webp "
              alt
            />
            <v-card-actions>
              <v-btn @click.stop="showGifLink(i)" icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Taí o link babyShark</v-card-title>

          <v-card-text id="gifLink">{{gifLink}}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false " v-clipboard:copy="gifLink">Copiar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>

    <scroll-loader :loader-method="getGifsFromGiphy" :loader-disable="disableLoad"></scroll-loader>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "Giphy",
  data: () => ({
    search: "",
    gifsGiphy: [],
    disableLoad: false,
    indexGifsGiphy: 0,
    dialog: false,
    gifLink: "",
    timeout: null
    
  }),

  computed: {},

  mounted() {
    // let self = this; used to acess variable from global scope localy
  },

  methods: {

    showGifLink(i){
        this.dialog = true;
        this.gifLink = this.gifsGiphy[i].url;
        console.log("show after update",this.gifLink);
    },

    clearSearch(){
      this.gifsGiphy = [];
      this.indexGifsGiphy = 0;
      this.search = "";
      this.getGifsFromGiphy();
    },

    getGifsFromGiphy() {
      if(this.search == ""){
      axios
        .get(
          "http://api.giphy.com/v1/gifs/trending?api_key=NUyEXSEp3eCathE3E7ZLDyFbWE0Uf1nL&offset=" +
            this.indexGifsGiphy
        )
        .then(response => {
          //this.gifsGiphy=response.data.data;
          this.gifsGiphy = [...this.gifsGiphy, ...response.data.data];
          this.indexGifsGiphy += 25;
          console.log("coe", this.gifsGiphy);
        });
      }      
      else{
        this.getSearchedGifs();
      }
    },

    getSearchedGifs() {   
       clearTimeout(this.timeout);
        this.timeout = setTimeout(() =>{
        axios
          .get(
            "http://api.giphy.com/v1/gifs/search?api_key=NUyEXSEp3eCathE3E7ZLDyFbWE0Uf1nL&q=" +
              this.search
          )
          .then(response => {
            this.gifsGiphy = [];
            this.gifsGiphy = [...this.gifsGiphy, ...response.data.data];
          });
          console.log("search", this.search); 
        },1000);
     
    },   
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
[v-cloak] {
  display: none;
}
[v-cloak]::before {
  content: "loading...";
}
body {
  background: #f2f2f2;
  font-family: "Open Sans", sans-serif;
}
</style>

