import { GetServerSideProps, NextPage } from 'next';
import getStringValueFromQuery from '@/utils/get_value_from_query';
import UrlClientModel from '@/models/url.client.model';
import { useEffect } from 'react';

interface Props {
    originalUrl: string
    domainHost?: string
}

const RedirectPage: NextPage<Props> = ({originalUrl, domainHost}) => {
    useEffect(()=> {
        console.log('originalUrl', originalUrl)
        console.log('domainHost', domainHost)
        if(originalUrl){
            if(!originalUrl.includes('https://')) {
                originalUrl = `https://${originalUrl}`
            }
            location.replace(originalUrl)
        }
    }, [originalUrl])

    return <>Redirecting</>
}

export const getServerSideProps: GetServerSideProps<Props> = async ({query}) => {
    const shortenPath = getStringValueFromQuery({ query, field: 'shorten_path' }) ?? '';
    // favicon request가 계속 로직을 타서 제외해줌
    // if(shortenPath === 'favicon.ico') {
    //     return {
    //         props: {}
    //     };
    // }

    try {
        const originalUrl = await UrlClientModel.findOriginalUrlByShortenUrl(shortenPath, process.env.DOMAIN_HOST);

        return {
            props: {
                originalUrl: originalUrl.payload,
                domainHost: process.env.DOMAIN_HOST
            }
        }
    } catch (err) {
        console.log(err);
        return {
            props: {
                originalUrl: ''
            }
        }
    }
    
}

export default RedirectPage;
