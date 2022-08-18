export default class NewError extends Error {
  name: string;
  statusCode: number | undefined;

  constructor(message:string, name:string, statusCode:number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
