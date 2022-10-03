import FirebaseAdmin from './commons/firebase_admin.model';

const COLLECTION_NAME = 'urls';

class UrlType {
    private UrlStore;
    private tailIndex;

    constructor() {
        this.UrlStore = FirebaseAdmin.getInstance().Firestore.collection(COLLECTION_NAME);
        this.tailIndex = 0;
    }

    async init() {
       const curTailIndex = await this.getTailIndex();
       console.log(curTailIndex)
       this.tailIndex = curTailIndex;
    }

    async shortenPath() {
        this.init();
        // const result = await this.UrlStore.where('originalUrl', '==', originalUrl).get();
        // console.log(result)
        //기존 url 반환
        // if(result) {
        //     return result.data()?.shortenUrl;
        // }
        
        
        return String.fromCharCode((this.tailIndex % 62) + 65);
    }

    async findOriginalUrlByShortenUrl(shortenPath: string) {
        try {
            const result = await this.UrlStore.doc(shortenPath).get();
            const originalUrl = result.data()?.originalUrl;
            return originalUrl;
        } catch (err) {
            throw err;
        }
    }

    async add(args: {
        originalUrl: string;
    }) {
        const shortenPath = await this.shortenPath()
        const addData = {
            originalUrl: args.originalUrl,
            shortenUrl: `https://shrt-hanbin9775.vercel.app/${shortenPath}`
        }
      
        try {
            await this.UrlStore.doc(shortenPath).set(addData);
            return addData;
        } catch (err) {
            throw err;
        }
    }

    setTailIndex(newIndex: number) {
        this.tailIndex = newIndex;
    }

    async getTailIndex() {
        const urlLists = await this.UrlStore.listDocuments();
        return urlLists.length;
    }
}

export const Urls = new UrlType();