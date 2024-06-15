<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Sistema Laboratorio</q-toolbar-title>
        <q-space />
        <h6 class="q-my-none q-mr-sm">Bienvenido {{ getNombre }}</h6>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :show-if-above="false"
      bordered
      overlay
      class="bg-grey-1"
    >
      <q-list>
        <q-expansion-item
          v-for="link in essentialLinks"
          :key="link.title"
          expand-separator
          :icon="link.icon"
          :label="link.title"
        >
          <q-list>
            <EssentialLink
              v-for="item in link.children"
              :key="item.title"
              v-bind="item"
            />
          </q-list>
        </q-expansion-item>
        <q-separator class="q-mt-lg" />

        <q-item clickable @click="cerrarSesion()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cerrar sesion</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Administracion",
    icon: "work",
    children: [
      {
        title: "Facturas",
        icon: "description",
        link: "/Facturas",
      },
      {
        title: "Ordenes de trabajo",
        icon: "receipt_long",
        link: "/ordenesDeTrabajo",
      },
    ],
  },
  {
    title: "Secretaria",
    icon: "point_of_sale",
    children: [
      {
        title: "Facturacion",
        icon: "person",
        link: "/facturacionPart",
      },
    ],
  },
];

import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const ip = process.env.BASE_URL;
    let name = localStorage.name;

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      ip,
      name,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  computed: {
    getNombre() {
      return this.name;
    },
  },
});
</script>
