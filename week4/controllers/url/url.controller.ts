import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import validateParamWithData from '../../models/commons/req_validator';
import { IAddUrlReq } from './interface/IAddUrlReq';
import { JSCAddUrl } from './jsc/JSCAddUrl';
import { Urls } from '../../models/url.model';

export default class UrlController {
  static async registerUrl(req: Request, res: Response) {
    const validateReq = validateParamWithData<IAddUrlReq>(
      {
        body: req.body,
      },        
			JSCAddUrl,
    );
		if (validateReq.result === false) {
      return res.status(400).json({
        text: validateReq.errorMessage,
      });
    }

		// url 등록
    try {
      const reqParams = {
        ...validateReq.data.body,
      };
      const result = await Urls.add(reqParams);
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500);
    }
  }

  static async findOriginalUrl(req: Request, res: Response) {
    const result = await Urls.findOriginalUrlByShortenUrl(req.body.shortenPath);
    return res.status(200).json(result);
  }
}