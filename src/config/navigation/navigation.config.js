export const navigationConfig = [
  {
    id: "home",
    labelKey: "menu.home",
    path: "/",
    type: "link",
    visible: {
      header: true,
      footer: true,
      mobile: true,
    },
  },
  {
    id: "apple",
    labelKey: "menu.apple_products",
    path: "/apple-products",
    type: "mega",
    visible: {
      header: true,
      footer: true,
      mobile: true,
    },
    children: [
      {
        id: "iphone",
        labelKey: "menu.apple.iphone",
        path: "/apple-products/iphone",
      },
      {
        id: "ipad",
        labelKey: "menu.apple.ipad",
        path: "/apple-products/ipad",
      },
      {
        id: "macbook",
        labelKey: "menu.apple.macbook",
        path: "/apple-products/macbook",
      },
      {
        id: "watch",
        labelKey: "menu.apple.watch",
        path: "/apple-products/watch",
      },
      {
        id: "airpods",
        labelKey: "menu.apple.airpods",
        path: "/apple-products/airpods",
      },
    ],
  },
  {
    id: "samsung",
    labelKey: "menu.samsung_products",
    path: "/samsung-products",
    type: "mega",
    visible: {
      header: true,
      footer: true,
      mobile: true,
    },
    children: [
      {
        id: "a-series",
        labelKey: "menu.samsung.a_series",
        path: "/samsung-products/a-series",
      },
      {
        id: "s-series",
        labelKey: "menu.samsung.s_series",
        path: "/samsung-products/s-series",
      },
      {
        id: "z-series",
        labelKey: "menu.samsung.z_series",
        path: "/samsung-products/z-series",
      },
      {
        id: "m-series",
        labelKey: "menu.samsung.m_series",
        path: "/samsung-products/m-series",
      },
      {
        id: "note-series",
        labelKey: "menu.samsung.note_series",
        path: "/samsung-products/note-series",
      },
      {
        id: "tablets",
        labelKey: "menu.samsung.tablets",
        path: "/samsung-products/tablets",
      },
      {
        id: "laptops",
        labelKey: "menu.samsung.laptops",
        path: "/samsung-products/laptops",
      },
    ],
  },
  {
    id: "accessories",
    labelKey: "menu.accessories",
    path: "/accessories",
    type: "mega",
    visible: {
      header: true,
      footer: true,
      mobile: true,
    },
    children: [
      {
        id: "cases",
        labelKey: "menu.acc.cases",
        path: "/accessories/cases",
      },
      {
        id: "chargers",
        labelKey: "menu.acc.chargers",
        path: "/accessories/chargers",
      },
      {
        id: "protection",
        labelKey: "menu.acc.protection",
        path: "/accessories/protection",
      },
      {
        id: "cables",
        labelKey: "menu.acc.cables",
        path: "/accessories/cables",
      },
      {
        id: "audio",
        labelKey: "menu.acc.audio",
        path: "/accessories/audio",
      },
    ],
  },
{
  id: "articles",
  labelKey: "menu.articles",
  path: "/blog",
  type: "link",
  visible: {
    header: true,
    footer: true,
    mobile: true,
  },
  },
  {
    id: "about",
    labelKey: "menu.about",
    path: "/about",
    type: "link",
    visible: {
      header: true,
      footer: true,
      mobile: true,
    },
  },
];
