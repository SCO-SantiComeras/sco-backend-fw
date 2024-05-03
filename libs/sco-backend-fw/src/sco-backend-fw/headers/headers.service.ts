import { Injectable } from "@nestjs/common";
import { HEADERS } from "./headers.constants";

@Injectable()
export class HeadersService {

  constructor() {}

  public validateHeader(header: string, headers: any): string {
    const headerValue: any = headers[header];
    if (headerValue == undefined || headerValue == null || headerValue == '') {
      return header;
    }

    return undefined;
  }

  public validateInterceptorHeaders(headers: any): string {
    const excludeHeaders: string[] = [
      HEADERS.AUTHORIZATION,
    ];

    const headerValues: string[] = Object.values(HEADERS);
    if (headerValues && headerValues.length > 0) {
      for (const header of headerValues) {
        const exclude: string = excludeHeaders.find(h => h.toUpperCase() == header.toUpperCase());
        if (exclude) {
          continue;
        }

        if (this.validateHeader(header, headers) && this.validateHeader(header, headers).length > 0) {
          return header;
        }
      }
    }

    return undefined;
  }
}