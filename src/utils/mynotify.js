import {Notify} from 'quasar'

export function p(message) {
  Notify.create({
    message: `${message}`,
    type: 'positive',
  })
}

export function n(message) {
  Notify.create({
    message: `${message} `,
    type: 'negative',
  })
}

