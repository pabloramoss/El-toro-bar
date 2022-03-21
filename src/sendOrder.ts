import axios from "axios"

const chat_id = process.env.CHAT_ID
const bot_token = process.env.BOT_TOKEN

export default async function orderSend(text: string) {
    const url: string = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`
    axios.post(url).catch(error => console.log(error))
}