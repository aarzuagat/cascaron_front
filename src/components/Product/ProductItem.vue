<template>
  <div class="row">
    <div class="col-12">
      <q-card flat bordered class="my-card bg-dark-blue" square>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col text-center">
              <q-avatar size="5rem">
                <img src="/img/image.jpg"/>
              </q-avatar>
            </div>
            <div class="col">
              <span class="text-white">Sprite Zero</span>
              <br><span class="text-white">Bebida sabor limon</span>
              <br><span class="text-red text-bold q-mt-md">{{ formatterCurrency(Math.random() * 100) }}</span>
            </div>
            <div class="col-auto">
              <q-btn color="white" round flat class="absolute-top-right" icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section>Remove Card</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Send Feedback</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Share</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {formatCurrency} from "src/utils/utils";

export default {
  // name: 'ComponentName',
  data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  },
  methods: {
    formatterCurrency(amount) {
      return formatCurrency(amount)
    }
  }
}
</script>
