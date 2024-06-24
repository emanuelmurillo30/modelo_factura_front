const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", name: "Index", component: () => import("pages/Facturacion-particular.vue") },
      {
        path: "/facturas",
        name: "Facturas",
        component: () => import("pages/Facturas.vue"),
      },
      {
        path: "/facturasDet/:id?",
        name: "FacturasDetalle",
        component: () => import("pages/Facturas-detalle.vue"),
        props: true,
      },
      {
        path: "/facturacionPart",
        name: "FacturacionParticular",
        component: () => import("pages/Facturacion-particular.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
