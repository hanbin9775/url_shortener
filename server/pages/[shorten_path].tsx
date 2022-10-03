import { GetServerSideProps, NextPage } from 'next';
import getStringValueFromQuery from '@/utils/get_value_from_query';
import UrlClientModel from '@/models/url.client.model';
import { useEffect, useState } from 'react';

interface Props {
    originalUrl: string
    domainHost?: string
}

const RedirectPage: NextPage<Props> = ({originalUrl}) => {
    const [message, setMessage] = useState('Redirecting');

    useEffect(()=> {
        if(originalUrl){
            if(!originalUrl.includes('https://')) {
                originalUrl = `https://${originalUrl}`
            }
            location.replace(originalUrl)
        }  else {
            setMessage("Sorry shortened url expired");
        }
    }, [originalUrl])

    return <>{message}</>
}

export const getServerSideProps: GetServerSideProps<Props> = async ({query}) => {
    const shortenPath = getStringValueFromQuery({ query, field: 'shorten_path' }) ?? '';

    try {
        const originalUrl = await UrlClientModel.findOriginalUrlByShortenUrl(shortenPath, process.env.DOMAIN_HOST);

        return {
            props: {
                originalUrl: originalUrl.payload,
                domainHost: process.env.DOMAIN_HOST
            }
        }
    } catch (err) {
        return {
            props: {
                originalUrl: ''
            }
        }
    }
    
}

export default RedirectPage;
