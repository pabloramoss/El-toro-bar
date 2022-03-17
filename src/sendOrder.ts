import axios from "axios"
const chat_id = process.env.TELEGRAM_CHAT_ID
const bot_token = process.env.TELEGRAM_BOT_TOKEN

// eslint-disable-next-line import/no-anonymous-default-export
export default async function orderSend(text: string) {
    const url: string = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`
    return axios.post(url).catch(error => console.log(error))
}