<template>
  <q-page>
    <div class="fit row justify-center">
      <div class="col-12">
        <div class="q-pa-md">
          <!-- TABLA DISPLAY DE FACTURAS -->
          <q-table
            title="Facturas"
            :rows="rows_habilitados"
            :columns="columns"
            :loading="loading"
            :pagination="initialPagination"
            row-key="numero_factura"
            :filter="filter"
            no-data-label="No hay data disponible"
          >
            <template v-slot:top-right>
              <!-- BARRA DE BUSQUEDA -->
              <q-input
                dense
                outlined
                debounce="300"
                v-model="filter"
                placeholder="Buscar"
                class="q-mr-xl"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <!-- SECCION BOTONES OPCIONES -->
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <!-- BOTON DETALLE FACTURA -->
                <router-link
                  :to="{
                    name: 'FacturasDetalle',
                    params: { id: props.row.id_factura },
                  }"
                >
                  <q-btn
                    dense
                    round
                    flat
                    padding="md"
                    color="grey"
                    icon="visibility"
                  >
                  </q-btn>
                </router-link>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const loading = ref(true);
    let motivo = ref(null);
    let inhabilitarFacturaModal = ref(false);
    let habilitarFacturaModal = ref(false);
    let tablaInhabilitados = ref(false);
    let rows_habilitados = ref([]);
    let rows_inhabilitados = ref([]);
    let id_factura = ref(null);
    let acceso = ref(null);

    const ip = process.env.BASE_URL;

    //  COLUMNAS DE LA TABLA //
    const columns = [
      {
        name: "fecha_creacion_factura",
        align: "left",
        label: "Fecha",
        field: "fecha_creacion_factura",
        sortable: true,
      },
      {
        name: "numero_factura",
        required: true,
        label: "Numero de factura",
        align: "left",
        field: (row) => row.numero_factura,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "cedula_RIF",
        align: "left",
        label: "Cédula/RIF del cliente",
        field: "cedula_RIF",
        sortable: true,
      },
      {
        name: "nombre_cliente",
        align: "left",
        label: "Nombre del cliente",
        field: (row) => {
          if (row.cliente_apellido == null || row.cliente_apellido == "null") {
            return row.cliente_nombre;
          } else {
            return row.cliente_nombre + " " + row.cliente_apellido;
          }
        },
        sortable: true,
      },
      {
        name: "nombre_usuario",
        align: "left",
        label: "Usuario",
        field: (row) => {
          if (row.usuario_apellido == null || row.usuario_apellido == "null") {
            return row.usuario_nombre;
          } else {
            return row.usuario_nombre + " " + row.usuario_apellido;
          }
        },
        sortable: true,
      },
      { name: "actions", label: "Opciones", field: "", align: "center" },
    ];

    // LLAMADO A LAS FACTURAS ACTIVAS //
    axios
      .get(ip + "facturas")
      .then((response) => {
        rows_habilitados.value = response.data;
        console.log(response.data);
      })
      .finally(() => {
        loading.value = false;
      });


    return {
      initialPagination: {
        sortBy: "numero_factura",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      noti: () => {},
      ip,
      columns,
      loading,
      $q,
      filter: ref(""),
      motivo,
      rows_habilitados,
      rows_inhabilitados,
      habilitarFacturaModal,
      inhabilitarFacturaModal,
      tablaInhabilitados,
      id_factura,
      acceso,
    };
  },

};
</script>
