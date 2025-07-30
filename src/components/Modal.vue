<template>
   <v-dialog v-model="props.dialog" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="!flex !justify-between items-center">
                <slot name="title">
                  <div class="text-3xl text-medium-emphasis ps-2">
                    Settings
                  </div>
                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="close"
                ></v-btn>
                </slot>
              </v-card-title>

              <!-- <v-card-text class="!pt-0"> -->
                 <slot>
                  Default content.
                 </slot>
              <!-- </v-card-text> -->

              <!-- <v-divider class="mt-2"></v-divider> -->
              <!-- Default actions slot -->
              <!-- <v-card-actions class="mr-[24px] font mb-[12px] !p-0 d-flex justify-end">
                <v-btn
                class="text-none !text-[1.8rem]"
                color="#008000"
                size="x-large"
                text="Apply"
                variant="flat"
                @click="close"
                ></v-btn>

              </v-card-actions> -->
            </v-card>
          </template>
        </v-dialog>
</template>

<style>
.v-input__details{
    display: none;
}
</style>

<script setup lang="ts">
    const props = defineProps<{
        dialog: boolean,
        close?: () => void
    }>()
</script>