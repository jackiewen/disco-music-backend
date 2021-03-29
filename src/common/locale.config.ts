import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

class Locale {
    private static instance: Locale;
    private loc: any;
    static getInstance() {
        if (!Locale.instance) {
            Locale.instance = new Locale();
        }
        return Locale.instance;
    }

    async init() {
        const _this = this;
        await i18next.use(Backend).init({
            lng: 'en',
            fallbackLng: 'en',
            preload: ['en', 'vi'],
            ns: ['validate'],
            defaultNS: 'validate',
            backend: {
                loadPath: './src/locales/{{lng}}/{{ns}}.json'
            }
        }, function (err, t) {
            if (err) return console.error(err);
            _this.loc = i18next;
            console.log('i18next is ready...');
        });
    }

    getLoc() {
        return this.loc;
    }
}

export function getLang(lang: string) { return Locale.getInstance().getLoc().t(lang) }
export default Locale.getInstance();
