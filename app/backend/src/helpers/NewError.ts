export default class NewError extends Error {
  statusCode: number | undefined;

  constructor(message:string, statusCode:number) {
    super(message);
    this.statusCode = statusCode;
  }
}
