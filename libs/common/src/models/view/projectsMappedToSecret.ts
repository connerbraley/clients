import { BaseResponse } from "../response/baseResponse";

export class ProjectsMappedToSecret extends BaseResponse {
  id: string;
  name: string;

  constructor(response: any) {
    super(response);
    this.name = this.getResponseProperty("Name");
    this.id = this.getResponseProperty("Id");
  }
}
