import axios from "axios"
const chat_id = 1367188448 //process.env.TELEGRAM_CHAT_ID

// eslint-disable-next-line import/no-anonymous-default-export
export default async function orderSend(text: string) {
    const url: string = `https://api.telegram.org/bot5165116240:AAFAI03uGZhb2C7Wg6TGkdhQ6Jg4DMJauSo/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`
    return axios.post(url).catch(error => console.log(error))
}