export const CreateFreshmanMessageInput = message => ({
  'content': message.content,
  'title': message.title,
  'writer': message.writer,
  'specific_class': message.klass
})
