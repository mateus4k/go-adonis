'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskMail-job'
  }

  async handle ({ email, username, title, file }) {
    await Mail.send(
      ['emails.new_task'],
      {
        username,
        title,
        hasAttachment: Boolean(file)
      },
      message => {
        message
          .to(email)
          .from('mateus4k@protonmail.ch', 'Mateus')
          .subject('New Task for you!')

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
