import { requester } from '../services/requester';

export default class UrlClientModel {
    static async findOriginalUrlByShortenUrl(shortenPath: string, host:string = '') {
        try {
            const resp = await requester<any>({
                option: {
                  url: `${host}/api/url`,
                  method: 'get',
                  data: {
                    shortenPath
                }
                },
              });
            return resp;
        } catch(err) {
            return {
                status: 500,
            }
        }
    }
}