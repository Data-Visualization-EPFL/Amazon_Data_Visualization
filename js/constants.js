export const TILES_URL = {
  'root': 'data_private/maps/tiles2',
}

export const LAYER_MAP_NAME = {
  'airport': 'Airports',
  'corrientes' : 'Corrientes',
  'AOI-percountry': 'AOI per country',
  'land-use-contour': 'Land use contour',
  'agricultura': 'Agriculture',
  'agua': 'Agua',
  'aguajales': 'Aguajales',
  'arbustos': 'Arbustos',
  'bosque-inundable': 'Inundable bosque',
  'bosque-no-inundable': 'No inundable bosque',
  'herbazal': 'Herbazal',
  'humedales': 'Humedales',
  'mineria': 'Mineria',
  'other': 'Other',
  'pasto': 'data/land-use/pasto.geojson',
  'pasto-agricultura': 'data/land-use/pasto_agricultura.geojson',
  'pasto-herbazal': 'data/land-use/pasto_herbazal.geojson',
  'sabana': 'data/land-use/sabana.geojson',
  'sabana-humedales': 'data/land-use/sabana_humedales.geojson',
  'suela-desnudo': 'data/land-use/suela_desnudo.geojson',
  'thb-df': 'data/land-use/thb_df.geojson',
  'urbano': 'data/land-use/urbano.geojson',
  'vegetacion': 'data/land-use/vegetacion.geojson'
};

export const LAYER_MAP = {
  'airport': {
    'url': 'data/airport.geojson',
    'style': null
  },
  'corrientes': {
    'url': 'data/corrientes.geojson',
    'style': null
  },
  'AOI-percountry': {
    'url': 'data/AOI_percountry.geojson',
    'style': null
  },
  'agricultura': {
    'url': 'data/land-use/agricultura.geojson',
    'style': {
        color: 'rgba(180, 180, 30, 1)'
      }
  },
  'agua': {
    'url': 'data/land-use/agua.geojson',
    'style': {
        color: 'rgba(20, 20, 240, 1)'
      }
  },
  'aguajales': {
    'url': 'data/land-use/aguajales.geojson',
    'style': {
        color: 'rgba(5, 5, 120, 1)'
      }
  },
  'bosque-inundable': {
    'url': 'data/land-use/bosque_inundable.geojson',
    'style': {
        color: 'rgba(40, 130, 190, 1)'
      }
  },
  'bosque-no-inundable': {
    'url': 'data/land-use/bosque_no_inundable.geojson',
    'style': {
        color: 'rgba(80, 130, 80, 1)'
      }
  },
  'herbazal': {
    'url': 'data/land-use/herbazal.geojson',
    'style': {
        color: 'rgba(8, 230, 3, 1)'
      }
  },
  'mineria': {
    'url': 'data/land-use/mineria.geojson',
    'style': {
        color: 'rgba(0, 0, 0, 1)'
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
        color: 'rgba(150, 200, 50, 1)'
      }
  },
  'pasto-herbazal': {
    'url': 'data/land-use/pasto_herbazal.geojson',
    'style': {
        color: 'rgba(80, 130, 130, 1)'
      }
  },
  'suela-desnudo': {
    'url': 'data/land-use/suela_desnudo.geojson',
    'style': {
        color: 'rgba(180, 130, 30, 1)'
      }
  },
  'urbano': {
    'url': 'data/land-use/urbano.geojson',
    'style': {
        color: 'rgba(120, 120, 130, 1)'
      }
  },
  'vegetacion': {
    'url': 'data/land-use/vegetacion.geojson',
    'style': {
        color: 'rgba(5, 90, 5, 1)'
      }
  },
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

// module.exports = {
//   BASE_ID,
//   TILES_URL,
//   LAYER_MAP,
//   LAYER_MAP_NAME
// };
