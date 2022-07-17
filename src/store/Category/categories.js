import axiosConfig from "boot/axios";
import {p, n} from 'src/utils/mynotify'
import {Loading} from "quasar";

export function getCategories(showLoading = true) {
  if (showLoading)
    Loading.show()
  return new Promise((resolve, reject) => {
    axiosConfig.get('categories')
      .then(response => {
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n('Las categorías no están disponible en estos momentos')
        reject(err)
      })
  })
}

export function postCategories(object) {
  Loading.show()
  return new Promise((resolve, reject) => {
    axiosConfig.post('categories', object)
      .then(response => {
        p(`Categoría ${object.name} agregada correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`La Categoría ${object.name} no pudo ser agregada en estos momentos`)
        reject(err)
      })
  })
}
