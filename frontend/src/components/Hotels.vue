<template>
  <el-container>
    <el-main>
      <el-form ref="form" :inline="true" :model="filters">
        <el-form-item label="Name">
          <el-input v-model="state.filters.name"></el-input>
        </el-form-item>
        <el-form-item label="Bedrooms">
          <el-input-number v-model="state.filters.bedrooms" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="Bathrooms">
          <el-input-number v-model="state.filters.bathrooms" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="Storeys">
          <el-input-number v-model="state.filters.storeys" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="Garages">
          <el-input-number v-model="state.filters.garages" :min="1"></el-input-number>
        </el-form-item>
        <div class="block">
          <label class="el-form-item__label">Price range</label>
          <el-input-number v-model="state.filters.price[0]" :min="1"></el-input-number> -
          <el-input-number v-model="state.filters.price[1]" :min="1"></el-input-number>
        </div>
        <el-form-item>
          <el-button @click.prevent="cancelFilters">Cancel</el-button>
        </el-form-item>
      </el-form>
      <el-table
          :lazy="state.loading"
          :data="state.hotels"
          height="500"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="Id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Name"
            width="180">
        </el-table-column>
        <el-table-column
            prop="bedrooms"
            label="Bedrooms"
            width="180">
        </el-table-column>
        <el-table-column
            prop="bathrooms"
            label="Bathrooms">
        </el-table-column>
        <el-table-column
            prop="storeys"
            label="Storeys">
        </el-table-column>
        <el-table-column
            prop="garages"
            label="Garages">
        </el-table-column>
        <el-table-column
            prop="price"
            label="Price">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup>
import {reactive, watch, ref, onMounted} from 'vue'
import {useStore} from 'vuex'

const store = useStore();

let filtersModel = {
  name: '',
  bedrooms: null,
  bathrooms: null,
  storeys: null,
  garages: null,
  price: [1, 1000000],
}

const state = reactive({
  loading: true,
  hotels: [],
  filtersData: {
    price: {
      min: 1,
      max: 1000000
    }
  },
  filters: {
    name: '',
    bedrooms: null,
    bathrooms: null,
    storeys: null,
    garages: null,
    price: [1, 1000000],
  }
})

onMounted(() => {
  watch(state.filters, (val) => {
    console.log(val)
    state.loading = true;
    store.dispatch('hotel/index', val).then(r => {
      state.hotels = r.data;
      state.filtersData.price = r.price;
      state.loading = false;
    })
  }, {
    immediate: true,
    deep: true
  })
})

function cancelFilters() {
  state.filters.value = {...filtersModel}
}
</script>

<style scoped>
</style>
