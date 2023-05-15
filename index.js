import chatBotService from "./chatBotService.js"
const chatBody = document.querySelector('.chat-body')
const txtInput = document.querySelector('#txtinput')
const send = document.querySelector('.send')
const chatHeader = document.querySelector('.chat-header')
const container = document.querySelector('.container')
const loadingElement = document.querySelector('.loading')

send.addEventListener("click", () => renderUserMessage())
txtInput.addEventListener('keyup', () => {
  if (event.keyCode === 13) {
    renderUserMessage()
  }
})

chatHeader.addEventListener('click', () => {
  container.classList.toggle('collapse')
})
chatHeader.addEventListener('dblclick', () => {
  container.classList.toggle('container')
})

const renderUserMessage = () => {
  const userInput = txtInput.value
  renderMessageEle(userInput, 'user')
  txtInput.value = ''
  toggleLoading(false)
  renderChatBotResponse(userInput)
}

const renderMessageEle = (txt, type) => {
  let className = "user-message"
  const messageEle = document.createElement('div')
  const txtNode = document.createTextNode(txt)
  messageEle.append(txtNode)
  if (type !== 'user') {
    className = "chatBot-message"
    messageEle.classList.add(className)
    const botResponseContainer = document.createElement('div')
    botResponseContainer.classList.add("bot-response-container")
    const botImage = document.createElement('img')
    botImage.setAttribute('alt', '')
    botResponseContainer.append(botImage)
    botResponseContainer.append(messageEle)
    chatBody.append(botResponseContainer)
  } else {
    messageEle.classList.add(className)
    chatBody.append(messageEle)
  }
}

const renderChatBotResponse = (userInput) => {
  const res = getChatBotResponse(userInput)
}

const getChatBotResponse = (userInput) => {
  chatBotService
    .getBotResponse(userInput)
    .then((response) => {
      renderMessageEle(response)
      setScrollPosition()
      toggleLoading(true)
    })
    .catch(error => {
      toggleLoading(true)
    })
}

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight
  }
}

const toggleLoading = (show) => {
  loadingElement.classList.toggle('hide', show)
}

