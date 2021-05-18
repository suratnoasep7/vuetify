<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tab href="#monthly">
        Monthly
      </v-tab>
      <v-tab href="#yearly">
        Yearly
      </v-tab>
    </v-tabs>
    <v-tabs-items :value="tab">
      <v-tab-item value="monthly">
        <v-card-text>
          <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col
                  v-for="(docs,index) in docs"
                  :key="index"
                  cols="12"
                  sm="4"
              >
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                  {{ docs.name }}
                  <br>
                  $ {{ docs.cost.MONTHLY }} / Month

                  <br>

                  <v-list dense>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                    >
                      <v-list-item
                          v-for="(item, i) in docs.featureList"
                          :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ isTrue(item.value) }} {{item.feature.name}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <v-btn block>
                    Register
                  </v-btn>

                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="yearly">
        <v-card-text>
          <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col
                  v-for="(docs,index) in docs"
                  :key="index"
                  cols="12"
                  sm="4"
              >
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                  {{ docs.name }}
                  <br>
                  $ {{ docs.cost.ANNUALLY }} / Year

                  <br>

                  <v-list dense>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                    >
                      <v-list-item
                          v-for="(item, i) in docs.featureList"
                          :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ isTrue(item.value) }} {{item.feature.name}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <v-btn block>
                    Register
                  </v-btn>

                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import api from '../services/index'
export default {
  data () {
    return {
      docs: '',
    }
  },
  mounted () {
    api.fetchData().then(response => {
      console.log(response.data);
      this.docs = response.data.docs.sort((a,b) => 0 - (a.sortOrder > b.sortOrder ? 1 : -1)).splice(0, 3);
    })
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    isTrue(item) {
      if(item === parseInt(item, 10)) {
        return item;
      } else {
        return "";
      }
    }
  },
  computed: {
    tab: {
      set (tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get () {
        return this.$route.query.tab
      }
    }
  }
}
</script>
