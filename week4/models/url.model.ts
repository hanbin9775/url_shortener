import FirebaseAdmin from './commons/firebase_admin.model';

const COLLECTION_NAME = 'urls';

class UrlType {
    private urls: Map<string, string>;
    private UrlStore;

    constructor() {
        this.urls = new Map();
        this.UrlStore = FirebaseAdmin.getInstance().Firestore.collection(COLLECTION_NAME);
    }

    UrlDoc(urlId: string) {
        return this.UrlStore.doc(urlId);
    }

    UrlCollection(urlId: string) {
        return this.UrlStore.doc(urlId).collection('urls');
    }

    shortenUrl(originUrl: string) {
        // 일단은 그대로 반환하자.
        return originUrl;
    }

    async add(args: {
        originalUrl: string;
    }) {
        const addData = {
            url: this.shortenUrl(args.originalUrl)
        }

        try {
            const result = await this.UrlStore.add(addData);
            return {
                id: result.id,
                ...addData
            };
        } catch (err) {
            throw err;
        }
    }
}

export const Urls = new UrlType();