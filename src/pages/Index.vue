<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "PageIndex",

  data() {
    let inicioSesion = ref(true);
    let noExiste = ref(false);
    let usuario = ref(null);
    let contrasena = ref(null);
    let usuariosData = ref(null);

    const ip = process.env.BASE_URL;

    return {
      inicioSesion,
      ip,
      usuario,
      contrasena,
      noExiste,
      isPwd: ref(true),
      id: 0,
      usuariosData,
    };
  },

  methods: {
    async onSubmit() {
      let usuario = {
        usuario_username: this.usuario,
        usuario_password: this.contrasena,
      };

      let datos = await axios.post(this.ip + "login", usuario);
      console.log(datos.data);

      if (datos.data == 0) {
        this.noExiste = true;
      } else {
        localStorage.name = datos.data.usuario_username;
        localStorage.id = datos.data.id_usuario;
        localStorage.rol = datos.data.id_rol;
        localStorage.token = datos.data.token;
        this.id = localStorage.id;

        console.log(localStorage);
        this.inicioSesion = false;
      }
    },

  },

});
</script>
