import axios from "axios"

export default async function orderSend(text: string) {
    const url: string = `https://api.telegram.org/bot${process.env.TELEGRAM_CHAT_ID}/sendMessage?chat_id=${process.env.TELEGRAM_BOT_TOKEN}&text=${encodeURIComponent(text)}`
    axios.post(url).catch(error => console.log(error))
}