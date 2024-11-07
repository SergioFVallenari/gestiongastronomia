import { masajeo, spGeneral } from "../helpers"

export default class Autorizacion{
    async login (body:any) {
        const formateo = masajeo(body)
        const result = await spGeneral("donfaustino_login(:xusername)", formateo)
        return result
    }
}