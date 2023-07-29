import { useCookies } from "react-cookie"
import { useTranslation } from "react-i18next"

export default function useHeaders() {
    let { i18n } = useTranslation()
    const [cookie] = useCookies(['token'])
    return {
        'Accept': 'application/json',
        'x-localization': i18n.language,
        'Authorization': `Bearer ${cookie.token}`,
        'Accept-Encoding':i18n.language
    }
}