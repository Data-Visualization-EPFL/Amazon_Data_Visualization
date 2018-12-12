export const TILES_URL = {
  'root': 'data_private/maps/tiles2',
}

// The ID of the categories has to correspond to a referenced layer in LAYER_MAP, with the same id
export const CATEGORIES = {
  'agricultura': {
    'agricultura': {
      'url': 'data/land-use/agricultura.geojson',
      'style': {
          color: 'rgba(80, 30, 30, 1)' //'rgba(180, 180, 30, 1)'
        }
    },
    'pasto': {
      'url': 'data/land-use/pasto.geojson',
      'style': {
          color: 'rgba(80, 30, 30, 1)'
        }
    },
    'pasto-agricultura': {
      'url': 'data/land-use/pasto_agricultura.geojson',
      'style': {
          color: 'rgba(80, 30, 30, 1)' //'rgba(150, 200, 50, 1)'
        }
    },
    'pasto-herbazal': {
      'url': 'data/land-use/pasto_herbazal.geojson',
      'style': {
          color: 'rgba(80, 30, 30, 1)' //'rgba(80, 130, 130, 1)'
        }
    },
    'vegetacion': {
      'url': 'data/land-use/vegetacion.geojson',
      'style': {
          color: 'rgba(80, 30, 30, 1)' //'rgba(5, 90, 5, 1)'
        }
    },
  },
  'agua': {
    'agua': {
      'url': 'data/land-use/agua.geojson',
      'style': {
        color: 'rgba(5, 5, 120, 1)'//'rgba(20, 20, 240, 1)'
      },
      'text': 'Agua',
    },
    'aguajales': {
      'url': 'data/land-use/aguajales.geojson',
      'style': {
        color: 'rgba(5, 5, 120, 1)'
      },
      'text': 'Aguajales',
    },
  }
}

export const LAYER_MAP = {
  'AOI-percountry': {
    'url': 'data/AOI_percountry.geojson',
    'style': {
      color: 'rgba(80, 130, 80, 1)'
    },
    'text': 'AOI per country',
    'check': false,
  },
  'carbon-stock': {
    'url': 'data/modeled_carbon_stocks_4326_tiles/{z}/{x}/{y}.png',
    'style': {
      color: 'rgba(80, 130, 80, 1)'
    },
    'text': 'Carbon Stocks',
    'check': false,
  },
  'agricultura': {
    'text': 'Agricultura',
    'style': null,
  },
  'corrientes': {
    'url': 'data/corrientes.geojson',
    'style': null,
    'text': 'Corrientes',
  },
  'agua': {
    'text': 'Agua',
  },
  'bosque-inundable': {
    'url': 'data/land-use/bosque_inundable.geojson',
    'style': {
      color: 'rgba(40, 130, 190, 1)'
    },
    'text': 'Bosque inundable',
  },
  'urbano': {
    'url': 'data/land-use/urbano.geojson',
    'style': {
      color: 'rgba(120, 120, 130, 1)'
    },
    'text': 'Urbano',
  },
  'mineria': {
    'url': 'data/land-use/mineria.geojson',
    'style': {
      color: 'rgba(0, 0, 0, 1)'
    },
    'text': 'Mineria',
  },
  // 'airport': {
    //   'url': 'data/airport.geojson',
    //   'style': null
    // },
  // 'bosque-no-inundable': {
  //   'url': 'data/land-use/bosque_no_inundable.geojson',
  //   'style': {
  //       color: 'rgba(80, 130, 80, 1)'
  //     }
  // },
  // 'herbazal': {
  //   'url': 'data/land-use/herbazal.geojson',
  //   'style': {
  //       color: 'rgba(8, 230, 3, 1)'
  //     }
  // },
  // 'suela-desnudo': {
  //   'url': 'data/land-use/suela_desnudo.geojson',
  //   'style': {
  //       color: 'rgba(180, 130, 30, 1)'
  //     }
  // },
  // 'arbustos': {
  //   'url': 'data/land-use/arbustos.geojson',
  //   'style': {
  //       color: 'rgba(5, 90, 5, 1)'
  //     }
  // },
  // 'land-use-contour': 'data/land-use-contour.geojson',
  // 'humedales': 'data/land-use/humedales.geojson',
  // 'sabana': 'data/land-use/sabana.geojson',
  // 'sabana-humedales': 'data/land-use/sabana_humedales.geojson',
  // 'thb-df': 'data/land-use/thb_df.geojson',
  // 'other': 'data/land-use/other.geojson',
};

export const BASE_ID = "base";
