import { JSONSchema6 } from 'json-schema';

export const JSCAddUrl: JSONSchema6 = {
  "$ref": "#/definitions/IAddUrlReq",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "IAddUrlReq": {
      "additionalProperties": false,
      "properties": {
        "body": {
          "additionalProperties": false,
          "properties": {
            "originalUrl": {
              "type": "string"
            }
          },
          "required": [
            "originalUrl"
          ],
          "type": "object"
        }
      },
      "required": [
        "body"
      ],
      "type": "object"
    }
  }
}