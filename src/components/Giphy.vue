<template>
  <v-container>
    <v-row>      
      <v-col cols="12">
        <!-- V-bind is used to replace the mustache tag on HTML attributes, : is short for v-bind -->
        <v-text-field v-model="message" :label="message" append-icon="search" Buscar></v-text-field>
      </v-col>
      <p>Mensagem ao contrário: "{{ reversedMessage }}"</p>
    </v-row>

    <v-layout row wrap>
      <!-- v-for interates in Gifs, defined inside data -->
      <v-flex xs4 class="pa-1"       
      v-for="(next, i) in Gifs"
      :key="i">
        <img
          style="width: 100%"          
          :src="next.src"                    
          alt
        />
        <button v-bind:disabled="isButtonDisabled">Botão</button>
      </v-flex>     
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios');
export default {  
  name: "Giphy",
  data: () => ({
    message : "Hey you",
    isButtonDisabled: true,
    gifsGiphy : [],
    
    Gifs: [
      {
        src: "giphy.webp"
      },
      {
        src: "giphy.webp"
      },
      {
        src: "giphy.webp"
      },
      {
        src: "giphy.webp"
      },
      {
        src: "giphy.webp"
      }
    ]
  }),
  computed: {
    // uma função "getter" computada (computed getter)
    reversedMessage: function () {
      // `this` aponta para a instância Vue da variável `vm`
      return this.message.split('').reverse().join('')
    }
  }
  ,
  mounted :{
    axios: axios.get("http://api.giphy.com/v1/gifs/trending?api_key=NUyEXSEp3eCathE3E7ZLDyFbWE0Uf1nL").then(response => {
            this.gifs = response.data.data;
        }),
    updated(){
        console.log("updated");
  }
}
}
</script>

